import React, { useEffect, useState } from 'react';
import AuthPageWrapper from '../components/Layout/AuthorizedLayout'
import TextField from '@material-ui/core/TextField';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle } from '@fortawesome/free-regular-svg-icons';
import { IconButton, Menu } from '@material-ui/core';
import { httpRequest } from '../helpers/httpRequest';
import { InputText } from 'primereact/inputtext';
import _ from 'lodash';
import { Autocomplete } from '@material-ui/lab';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Divider } from 'primereact/divider';
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import { Dropdown } from 'primereact/dropdown';


const viewTickets = (props) => {

    const [tickets, setTickets] = useState([])
    const [eventNames, setEventNames] = useState([]);
    const [anchorEls, setAnchorEls] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [showModal, setShowModal] = React.useState(false);
    const [selectedEvent, setSelectedEvent] = useState({})
    useEffect(() => {
        const getEventNames = () => {
            let eventName = _.map(props.searchUser.events, (ev, index) => {
                return { title: ev.title, id: ev.id, image: ev.image[0] }

            })
            setEventNames(eventName)
        }
        getEventNames();
    }, [props.searchUser.events])


    const handleSelect = async (e) => {
        setSelectedEvent(e.value)
        if (e.value) {
            const id = e.value.id;
            if (id != undefined) {
                let data = {};
                let userData = []
                let other = {}
                let otherData = [];
                const resp = await httpRequest("GET", `/events/tickets/byEvent/${id}?page=1&limit=100`, null, { "Authorization": props.login.token })
                setTickets({ ...resp.response.data.data })
                let datas = { ...resp.response.data.data };
                _.map(_.groupBy(datas, (d => d.userId)), (a, i) => {
                    data.eventName = a[0].Event.title;
                    data.userName = a[0].User.firstName + " " + a[0].User.lastName
                    data.numberofTicket = a.length;
                    data.totalAmount = _.sumBy(a, "price");
                    data.userId = a[0].User.id;
                    data.eventId = a[0].Event.id
                    _.map(a, (o, j) => {
                        other.fullName = o.fullName;
                        other.email = o.email;
                        other.nationalId = o.nationalId;
                        other.phoneNumber = o.phoneNumber;
                        other.price = o.price;
                        other.sittingPlace = o.sittingPlace;
                        other.type = o.type;
                        otherData.push(other);
                        other = {};
                    })
                    data.otherData = otherData;
                    otherData = []
                    userData.push(data)
                    data = {}
                })
                setTickets(userData)
            }
        }

    }


    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const handleClickOpen = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const eventBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Event Name</span>
                {rowData.eventName}
            </React.Fragment>
        );
    }

    const nameBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Buyer Name</span>
                {rowData.userName}
            </React.Fragment>
        );
    }

    const numberOfTicketsBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Number of Tickets</span>
                {rowData.numberofTicket}
            </React.Fragment>
        );
    }

    const totalAmountBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Amount Paid</span>
                {rowData.totalAmount}
            </React.Fragment>
        );
    }
    const handleActionClick = (id, evt) => {
        anchorEls[id] = evt.target;
        setAnchorEls({ ...anchorEls, ...anchorEls });
    }
    const handleActionClose = (id, evt) => {
        anchorEls[id] = null;
        setAnchorEls({ anchorEls });
    }

    const BodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">price</span>
                <IconButton
                    size="small"
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={e => handleActionClick(rowData.userId, e)}
                >
                    <Button className="flex justify-center bg-none" onClick={handleClickOpen}>
                        <FontAwesomeIcon size="sm" className="text-maincolor" icon={faDotCircle} />
                        <FontAwesomeIcon size="sm" className="text-maincolor" icon={faDotCircle} />
                        <FontAwesomeIcon size="sm" className="text-maincolor" icon={faDotCircle} />
                    </Button>
                </IconButton>
                <Menu
                    id={rowData.userId}
                    anchorEl={anchorEls[rowData.userId]}
                    keepMounted
                    open={Boolean(anchorEls[rowData.userId])}
                    onClose={e => handleActionClose(rowData.userId, e)}
                >
                    <div>
                        <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>
                            <ModalHeader toggler={() => setShowModal(false)}>
                                Information of Tickets
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col w-full md:w-96 gap-1 p-3 hover:bg-gray-200">
                                    <div>Tickets Bought by  {rowData.userName}</div>
                                    <Divider type="dashed" />
                                    {
                                        rowData.otherData.map((p, index) => {
                                            return <div key={index}>
                                                <div className="flex line-height-2 flex-col gap-4 p-2" style={{ borderBottom: "solid 1px black" }}>
                                                    <p>Name: {p.fullName}</p>
                                                    <p>Email: {p.email}</p>
                                                    <p>National Id: {p.nationalId}</p>
                                                    <p>Phone Number: {p.phoneNumber}</p>
                                                    <p>Price: {p.price}</p>
                                                    <p>Sitting Postiton: {p.sittingPlace}</p>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="red"
                                    buttonType="link"
                                    onClick={(e) => setShowModal(false)}
                                    ripple="dark"
                                >
                                    Close
                                </Button>

                            </ModalFooter>
                        </Modal>

                    </div>
                </Menu>
            </React.Fragment>
        );
    }

    const selectedEventTemplate = (option, props) => {
        if (option) {
            return (
                <div className="event-item flex gap-2 event-item-value">
                    <img alt={option.title} className="object-cover" height="10" width="10" src={option.image} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
                    <div>{option.title}</div>
                </div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }

    const eventOptionTemplate = (option) => {
        return (
            <div className="event-item flex gap-2">
                <img alt={option.title} className="object-cover" height="10" width="20" src={option.image} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
                <div>{option.title}</div>
            </div>
        );
    }


    const reset = () => {
        setGlobalFilter("");
    }
    const header = (
        <div className="flex justify-between table-header">
            <Button type="button" label="Clear" className="p-button-outlined" icon="pi pi-filter-slash" onClick={reset} />
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" />
            </span>
        </div>
    );

    return (
        <AuthPageWrapper>
            <div className="m-2" style={{ borderLeft: '2px solid rgb(119, 119, 243)' }}>
                <div >
                    <div><h2 className="text-center underline ">List of Tickets</h2></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3">
                        <div className="my-auto">Select Event from the List</div>
                        <div>
                            <Dropdown className="w-full border-0" value={selectedEvent} options={eventNames} onChange={handleSelect} optionLabel="title" filter showClear filterBy="title" placeholder="Select an Event"
                                valueTemplate={selectedEventTemplate} itemTemplate={eventOptionTemplate} />
                        </div>
                    </div>
                </div>
                <div>

                    <div className="datatable-responsive-demo">
                        <div className="card">
                            <DataTable value={tickets} header={header} className="p-datatable-responsive-demo p-datatable-sm" paginator sortMode="multiple" globalFilter={globalFilter} rows={props.number}>
                                <Column field="eventName" header="Event Name" body={eventBodyTemplate} />
                                <Column field="userName" header="Buyer name" body={nameBodyTemplate} sortable />
                                <Column field="numberofTicket" header="Tickets No" body={numberOfTicketsBodyTemplate} sortable />
                                <Column field="totalAmount" header="Amount Paid" body={totalAmountBodyTemplate} sortable />
                                <Column field="action" header="action" body={BodyTemplate} />
                            </DataTable>
                        </div>
                    </div>
                </div>

            </div>
        </AuthPageWrapper>
    )
}
const mapStateToProps = (state) => {
    return {
        login: state.login,
        searchUser: state.searchUser
    };
}

export default connect(mapStateToProps)(viewTickets);