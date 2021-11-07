import React, { useEffect, useState } from 'react';
import AuthPageWrapper from '../components/Layout/AuthorizedLayout'
import TextField from '@material-ui/core/TextField';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle } from '@fortawesome/free-regular-svg-icons';
import { IconButton, Menu } from '@material-ui/core';
import { InputText } from 'primereact/inputtext';
import _ from 'lodash';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Divider } from 'primereact/divider';
import { Badge } from 'primereact/badge';
import moment from 'moment';
import { searchUserdata } from '../redux/actions/search/searchAction';
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";



const buyerViewTickets = (props) => {

    const [tickets, setTickets] = useState()
    const [anchorEls, setAnchorEls] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    useEffect(() => {
        try {

            let data = {};
            let userData = []
            let other = {}
            let otherData = [];
            const initializeTickets = () => {
                _.map(_.groupBy(props.searchUser.data.Tickets, (d => d.eventId)), (a, i) => {
                    data.eventName = a[0].Event.title;
                    data.place = a[0].Event.place
                    data.dateAndTimme = a[0].Event.dateAndTimme;
                    data.host = a[0].Event.host;
                    data.totalNumber = a.length;
                    data.totalAmount = _.sumBy(a, "price");
                    data.eventId = a[0].Event.id
                    _.map(a, (o, j) => {
                        other.fullName = o.fullName;
                        other.email = o.email;
                        other.nationalId = o.nationalId;
                        other.phoneNumber = o.phoneNumber;
                        other.price = o.price;
                        other.sittingPlace = o.sittingPlace;
                        let fd = _.filter(o.Event.EventPayments, (s => s.id === o.type));
                        other.type = fd.length > 0 ? fd[0].name : "";
                        other.status = o.status
                        otherData.push(other);
                        other = {};
                    })
                    data.otherData = otherData;
                    otherData = []
                    userData.push(data)
                    data = {}
                })

            }
            initializeTickets();
            setTickets(userData)
        } catch (error) {

        }
    }, [props.searchUser.events])

    useEffect(() => {
        const fetchData = async () => {
            await props.searchUserdata(props.login.token);
        };
        fetchData();
    }, [])

    const [open, setOpen] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        setOpen(false);
    };

    const handleActionClick = (id, evt) => {
        anchorEls[id] = evt.target;
        setAnchorEls({ ...anchorEls, ...anchorEls });
        setShowModal(true);
    }
    const handleActionClose = (id, evt) => {
        anchorEls[id] = null;
        setAnchorEls({ anchorEls });
        setOpen(false);
    }


    const titleBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Event Name</span>
                {rowData.eventName}
            </React.Fragment>
        );
    }

    const placeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Place</span>
                {rowData.place}
            </React.Fragment>
        );
    }

    const getDateTime = (date1) => {
        return <div className="flex flex-col">
            <p>{moment(date1).format('MMMM Do YYYY, h:mm:ss a')}</p>
        </div>
    }

    const dateBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Date and Time</span>
                {getDateTime(rowData.dateAndTimme)}
            </React.Fragment>
        );
    }

    const totalticketsBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Tickets No</span>
                {rowData.totalNumber}
            </React.Fragment>
        );
    }

    const hostBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Host</span>
                {rowData.host}
            </React.Fragment>
        );
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
                    <div className="flex justify-center bg-none">
                        <FontAwesomeIcon size="sm" className="text-maincolor" icon={faDotCircle} />
                        <FontAwesomeIcon size="sm" className="text-maincolor" icon={faDotCircle} />
                        <FontAwesomeIcon size="sm" className="text-maincolor" icon={faDotCircle} />
                    </div>
                </IconButton>
                <Menu
                    id={rowData.userId}
                    anchorEl={anchorEls[rowData.userId]}
                    keepMounted
                    open={Boolean(anchorEls[rowData.userId])}
                    onClose={e => handleActionClose(rowData.userId, e)}
                    className="w-full"
                >
                    <div className="w-full">
                        <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>
                            <ModalHeader toggler={() => setShowModal(false)}>
                                {rowData.eventName}
                            </ModalHeader>
                            <ModalBody>
                                <div style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }} className="flex flex-col w-full md:w-96 gap-1 p-3 hover:bg-gray-200">
                                    <Divider type="dashed" />
                                    {
                                        rowData.otherData.map((p, index) => {
                                            return <div key={index}>
                                                <div className="m-2 p-2" style={{ border: "1px solid black" }}>Ticket Type : {p.type}</div>
                                                <div className="flex line-height-2 flex-col gap-4 p-2" style={{ borderBottom: "solid 1px black" }}>
                                                    <p>Name: {p.fullName}</p>
                                                    <p>Email: {p.email}</p>
                                                    <p>National Id: {p.nationalId}</p>
                                                    <p>Phone Number: {p.phoneNumber}</p>
                                                    <p>Price: {p.price}</p>
                                                    <p>Sitting Postiton: {p.sittingPlace}</p>
                                                    <div>Status : {p.status === 'not Attended' ? <Badge value={p.status} severity="warning" className="p-mr-2"></Badge> : <Badge value={p.status} severity="success" className="p-mr-2"></Badge>}</div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                                <div className="text-right m-2 p-2" style={{
                                    background: '#FFFFFF',
                                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                                }}>
                                    <p>Total cost paid : {rowData.totalAmount} Rwf</p>
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

        <div className="p-4 mt-1">

            <div className="datatable-responsive-demo">
                <div className="card">
                    <DataTable value={tickets} header={header} className="p-datatable-responsive-demo p-datatable-sm" paginator sortMode="multiple" globalFilter={globalFilter} rows={props.number}>
                        <Column field="eventName" header="Event Name" body={titleBodyTemplate} />
                        <Column field="place" header="place" body={placeBodyTemplate} sortable />
                        <Column field="dateAndTime" header="Date and Time" body={dateBodyTemplate} sortable />
                        <Column field="host" header="Host" body={hostBodyTemplate} sortable />
                        <Column field="totalNumber" header="Tickets No" body={totalticketsBodyTemplate} sortable />
                        <Column field="moreInfo" header="moreInfo" body={BodyTemplate} />
                    </DataTable>
                </div>
            </div>
        </div>

    )
}
const mapStateToProps = (state) => {
    return {
        login: state.login,
        searchUser: state.searchUser
    };
}

export default connect(mapStateToProps, { searchUserdata })(buyerViewTickets);