import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import EventBox from '../components/event/eventBox';
import PageWrapper from '../components/Layout/UnAuthorizedLayout';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { httpRequest } from '../helpers/httpRequest';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { searchAction } from '../redux/actions/search/searchAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import cogoToast from 'cogo-toast';
import _ from 'lodash';
import moment from 'moment';
import Button from '@material-tailwind/react/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import maintop from '../../public/img/topmain.jpg';


function TransitionComponent(props) {


    return (
        <Collapse {...props} />
    );
}

TransitionComponent.propTypes = {
    /**
     * Show the component; triggers the enter or exit states
     */
    in: PropTypes.bool,
};




function searchevents(props) {
    const location = useLocation();
    const [events, setEvents] = useState([])
    const [filteredEvents, setFilteredEvents] = useState(events)
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("");
    const [search, setSearch] = useState({
        name: "",
        place: "",
        dateRange: [null, null],
        date: null,
        category: [],
        country: [],
        host: []
    });


    const [paginator,setPaginator] = useState({
        page:0,
        limit:4,
        startIndex:0,
        endIndex:4
    })
    function nextPage() {
        paginator.page = paginator.page+1;
        paginator.startIndex = (paginator.page-1) * paginator.limit;
        paginator.endIndex = (paginator.page * paginator.limit);
        setPaginator({...paginator,...paginator});
    }
    function prevPage() {
        if(paginator.startIndex==0)
            return
        paginator.page = paginator.page-1;
        paginator.startIndex = (paginator.page-1) * paginator.limit;
        paginator.endIndex = (paginator.page * paginator.limit);
        setPaginator({...paginator,...paginator});
    }


    useEffect(() => {
        const filters = () => {
            let result = [];
            result = events.filter((data) => {
                return (
                    data.title.toLowerCase().search(search.name) != -1
                    && data.place.toLowerCase().search(search.place) != -1
                )
            });
            setFilteredEvents(result);
        }
        filters();
    }, [search])

    const handleSort = (e) => {
        setSort(e.target.value);
        let value = e.target.value.toLowerCase();
        if (value == 'date')
            value = 'dateAndTimme';
        let result = [];
        result = _.orderBy(filteredEvents, [e => e[value].toLowerCase()], ['asc']);

        setFilteredEvents(result);
    }




    const getEvents = async () => {
        const { response, error } = await httpRequest("GET", "/events?page=1&limit=100&status=Pending");
        return { result: response.data.data.result }
    }

    useEffect(async () => {
        const hostvalue = new URLSearchParams(location.search).get("host");
        const categoryvalue = new URLSearchParams(location.search).get("category");
        
        if (location.state) {
            setEvents([...events, ...location.state.event]);
            setFilteredEvents([...filteredEvents, ...location.state.event])
            search.name = location.state.search.search;
            search.dateRange = location.state.search.date;
            search.place = location.state.search.place;
            setSearch({ ...search, ...search })
            props.searchAction(location.state.search)

            if(location.search){
                let value = categoryvalue.toLowerCase();
                setCategory(value);
                let result1 = _.filter(location.state.event,ev=>ev.eventType.toLowerCase()==value)
                setFilteredEvents([...filteredEvents, ...result1]);
            }
            if(hostvalue){
                let result1 = _.filter(location.state.event,ev=>ev.host.toLowerCase()==hostvalue.toLowerCase())
                setFilteredEvents([...filteredEvents, ...result1]);
            }
        }
        else {
            const { result } = await getEvents();
            setEvents([...events, ...result])
            setFilteredEvents([...filteredEvents, ...result])
            if(location.search){
                let value = categoryvalue.toLowerCase();
                setCategory(value);
                let result1 = _.filter(result,ev=>ev.eventType.toLowerCase()==value)
                setFilteredEvents([...filteredEvents, ...result1]);
            }
            if(hostvalue){
                let result1 = _.filter(result,ev=>ev.host.toLowerCase()==hostvalue.toLowerCase())
                setFilteredEvents([...filteredEvents, ...result1]);
            }
        }
    }, []);

    const handleChange = (e) => {
        const prop = e.target;
        setSearch({ ...search, [prop.name]: prop.value });
    }
    const handleDateChange = (e) => {
        const prop = e.target;
        if (prop.name == 'startDate') {
            search.dateRange[0] = prop.value
        } else {
            if (search.dateRange[0] == null) {
                cogoToast.error("Please Select Start Date")
            }
            if (search.dateRange[0] > prop.value) {
                cogoToast.error("Start can be greater than End")
            }
            else {
                search.dateRange[1] = prop.value
                let result = [];
                result = events.filter((data) => {
                    return (
                        _.gte(moment(data.dateAndTimme).toDate(), search.dateRange[0]) &&
                        _.lte(moment(data.dateAndTimme).toDate(), search.dateRange[1])
                    )
                });
                setFilteredEvents(result);
            }

        }

    }
    const handleSingleDateChange = (e) => {
        search.date = e.target.value
        let result = [];
        result = events.filter((data) => {
            return (
                _.eq(moment(data.dateAndTimme).toDate(), search.date)
            )
        });
        setFilteredEvents(result);

    }
    const hangleCategory = (e) => {
        setCategory(e.target.value);
        const value = e.target.value.toLowerCase();
        if(value==='all'){
            setFilteredEvents(events);
            return;
        }
        let result = _.filter(events,ev=>ev.eventType.toLowerCase()==value)
        setFilteredEvents(result);
    }
    const handleCountry = (e) => {
        const value = e.target.innerText.toLowerCase();
        let index = search.country.indexOf(value);
        (index < 0) ? search.country.push(value) : search.country.splice(index, 1);
        let result = [];
        result = events.filter((data) => {
            return (
                search.country.includes(data.country.toLowerCase())
            )
        });
        setFilteredEvents(result);
    }

    const handleHost = (e) => {
        const value = e.target.innerText.toLowerCase();
        let index = search.host.indexOf(value);
        (index < 0) ? search.host.push(value) : search.host.splice(index, 1);
        let result = [];
        result = events.filter((data) => {
            return (
                search.host.includes(data.host.toLowerCase())
            )
        });
        setFilteredEvents(result);
    }

    const navData = {
        title:"Browse more Events ",
        text:"Sell and publicise your event here to millions of potential customers today",
        image: maintop
    }


    return (
        <PageWrapper content={navData}>
            <div className="p-4 flex flex-row justify-between">
                <div className="flex  flex-col">
                    <div>Category <FontAwesomeIcon icon={faAngleDoubleRight} /> <span style={{ fontSize: "12px !important" }} className="subcatcolor">{category}</span></div>
                    {/* <H2>{category}</H2> */}
                </div>
                <div>
                    {filteredEvents.length} of over {events.length} results
                </div>
            </div>
            <div className="flex flex-col  md:flex-row justify-between gap-2 p-2">
                <div className="w-full">
                    <div className="p-fluid">
                        <div className="p-field">
                            <Dropdown options={['All','FootBall','VolleyBall','BasketBall','Criket','HandBall','Tennis','Golf', 'Live Entertainment','Fashion', 'Ceremonies','Comedies','Theathre','Others']} value={category} onChange={hangleCategory} placeholder="Select Category" />
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="p-fluid">
                        <div className="p-field">
                            <span className="p-input-icon-left">
                                <i className="pi pi-search" />
                                <InputText value={search.name} className="w-full" name="name" onInput={handleChange} placeholder="events, sports ..." />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="p-fluid">
                        <div className="p-field">
                            <span className="p-input-icon-left">
                                <i className="pi pi-search" />
                                <InputText value={search.place} className="w-full" name="place" onInput={handleChange} placeholder="Search by Place" />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className="p-fluid">
                        <div className="p-field">
                            <Dropdown options={['Date', 'Host', 'Title']} value={sort} onChange={handleSort} placeholder="Sort By :" />
                        </div>
                    </div>
                </div>
            </div>
            <Splitter >
                <SplitterPanel size={100} minSize={90} className="flex flex-col">
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 p-3 m-3">
                        {
                            filteredEvents.slice(paginator.startIndex,paginator.endIndex).map((event, index) =>
                                <Link key={event.id} to={{ pathname: "/event", state: { event } }}> <EventBox event={event} /></Link>
                            )
                        }
                    </div>
                    <div>
                        <div className="flex flex-row justify-center gap-2 p-5"><Button className="buttonoutline" onClick={prevPage}>Prev</Button><Button onClick={nextPage} className="buttonoutline">Next</Button></div>
                    </div>
                </SplitterPanel>
            </Splitter>
        </PageWrapper>
    );
}

const mapStateToProps = (state) => {
    return {
        searchParams: state.searchParams
    }
}
export default connect(mapStateToProps, { searchAction })(searchevents)