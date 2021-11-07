import React, { useEffect, useState } from 'react';
import AuthPageWrapper from '../components/Layout/AuthorizedLayout';
import backImg from '../../public/img/pexels-teddy-yang-2263410.jpg'
import FeaturedEvents from '../components/landingPage/featuredEvents';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { connect } from 'react-redux';
import {searchUserdata} from '../redux/actions/search/searchAction';
import PropTypes from 'prop-types';
import { httpRequest } from '../helpers/httpRequest';

function buyerDashboard(props) {
    useEffect(() => {
        const fetchData = async () => {
            await props.searchUserdata(props.login.token);
        };
        fetchData();
    },[])

    const [events,setEvents] = useState([
       
    ])

    const getEvents = async()=>{
        const {response,error} = await httpRequest("GET","/events/calender");
        setEvents([...events,...response.data.data])
    }
    useEffect(() => {
        getEvents();
      }, []);
    return (
        <AuthPageWrapper>
            <div style={{ borderLeft: '2px solid rgb(119, 119, 243)' }}>
                <div className="p-8 text-white" style={{ backgroundImage: `url(${backImg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                    <div className="text-center m-auto p-5" style={{ background: 'rgba(12, 74, 234, 0.62)', height: 'fit-content', width: 'fit-content', borderRadius: "10px", overflow: 'hidden' }}>
                        <h1 className=" text-xl">Consider our trading events</h1>
                        <p className=" text-sm my-3">Buy Ticket , reserve your place</p>
                    </div>
                </div>
                <div>
                    <label className=" p-3">Treding Events</label>
                    <FeaturedEvents limit={4}  dash={true}/>
                </div>
                <div className="p-3">
                <label className=" p-3">Check on Calender</label>
                    <FullCalendar
                        events={events}
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        height={300}
                    />
                </div>
            </div>
        </AuthPageWrapper>
    );
}

buyerDashboard.protoTypes = {
    searchUserdata: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        searchUser: state.searchUser
    };
}

export default connect(mapStateToProps, { searchUserdata })(buyerDashboard);