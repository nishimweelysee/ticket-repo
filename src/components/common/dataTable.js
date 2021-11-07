import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { connect } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle } from '@fortawesome/free-regular-svg-icons';
import { IconButton, Menu } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { faEye, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { httpRequest } from '../../helpers/httpRequest';
import cogoToast from 'cogo-toast';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';


function dataTable(props) {
    const [event, setEvent] = useState(props.searchUser.events)
    const [anchorEls, setAnchorEls] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    useEffect(() => {
        setEvent(props.searchUser.events)
    }, [props.searchUser.events])


    const getDateTime = (date1) => {
        return <div className="flex flex-col">
            <p>{moment(date1).format('MMMM Do YYYY, h:mm:ss a')}</p>
        </div>
    }


    const eventBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Event</span>
                <img className="object-cover" width="40" height="40" src={rowData.image[0]} />
            </React.Fragment>
        );
    }

    const nameBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Name</span>
                {rowData.title}
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

    const dateTimeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">DateTime</span>
                {getDateTime(rowData.dateAndTimme)}
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

    const priceBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">price</span>
                <IconButton
                    size="small"
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={e => handleActionClick(rowData.id, e)}
                >
                    <div className="flex justify-center">
                        <FontAwesomeIcon size="sm" className="text-maincolor" icon={faDotCircle} />
                        <FontAwesomeIcon size="sm" className="text-maincolor" icon={faDotCircle} />
                        <FontAwesomeIcon size="sm" className="text-maincolor" icon={faDotCircle} />
                    </div>
                </IconButton>
                <Menu
                    id={rowData.id}
                    anchorEl={anchorEls[rowData.id]}
                    keepMounted
                    open={Boolean(anchorEls[rowData.id])}
                    onClose={e => handleActionClose(rowData.id, e)}
                >
                    <div>
                        {
                            rowData.EventPayments.map((p, index) => {
                                return <div className="flex w-full gap-1 p-3 hover:bg-gray-200" key={index}>
                                    <div>{p.name}</div>
                                    <div>{p.price}{' '}Rwf</div>
                                </div>
                            })
                        }
                    </div>
                </Menu>
            </React.Fragment>
        );
    }

    const totalTicketsBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">totalTicket</span>
                {rowData.numberofTicket}
            </React.Fragment>
        );
    }

    const ticketleftBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">ticketLeft</span>
                {rowData.ticketLeft}
            </React.Fragment>
        );
    }
    const statusBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">ticketLeft</span>
                {
                    rowData.status == 'Pending' ? <Badge value={rowData.status} severity="warning" className="p-mr-2"></Badge> :
                        rowData.status == 'Done' ? <Badge value={rowData.status} severity="success" className="p-mr-2"></Badge> :
                            rowData.status == 'Done' ? <Badge value={rowData.status} severity="danger" className="p-mr-2"></Badge> :
                                <Badge value={rowData.status} severity="info" className="p-mr-2"></Badge>
                }
            </React.Fragment>
        );
    }

    const deleteEvent = async (rowData) => {
        const { error, response } = await httpRequest("DELETE", `/events/${rowData.id}`, null, { Authorization: props.login.token });
        if (!error) {
            cogoToast.success("Event Deleted");
            let events = event.filter(val => val.id !== rowData.id);
            setEvent(events);
        }
        else {
            
        }
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">action</span>
                <IconButton
                    size="small"
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={e => handleActionClick('a' + rowData.id, e)}
                >
                    <div className="flex justify-center">
                        <FontAwesomeIcon size="sm" className="text-maincolor" icon={faDotCircle} />
                        <FontAwesomeIcon size="sm" className="text-maincolor" icon={faDotCircle} />
                        <FontAwesomeIcon size="sm" className="text-maincolor" icon={faDotCircle} />
                    </div>
                </IconButton>
                <Menu
                    id={'a' + rowData.id}
                    anchorEl={anchorEls['a' + rowData.id]}
                    keepMounted
                    open={Boolean(anchorEls['a' + rowData.id])}
                    onClose={e => handleActionClose('a' + rowData.id, e)}
                >
                    <div className="flex flex-col gap-2">
                        <Link to={{ pathname: "/user-dashboard/event/view", state: { event: rowData } }} className="flex gap-2 text-maincolor justify-center hover:bg-gray-200 p-2"><FontAwesomeIcon icon={faEye} /><em className="m-auto">view</em></Link>
                        <Link to={{ pathname: "/user-dashboard/event/update", state: { event: rowData } }} className="flex gap-2 text-maincolor justify-center hover:bg-gray-200 p-2"><FontAwesomeIcon icon={faPencilAlt} /><em>update</em></Link>
                        <button onClick={e => deleteEvent(rowData)} className="flex gap-2 text-maincolor justify-center hover:bg-gray-200 p-2"><FontAwesomeIcon icon={faTrashAlt} /><em>delete</em></button>
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
        <div className="datatable-responsive-demo">
            <div className="card">
                <DataTable value={event} header={header} className="p-datatable-responsive-demo p-datatable-sm" paginator sortMode="multiple" globalFilter={globalFilter} rows={props.number}>
                    <Column field="event" header="Event" body={eventBodyTemplate} />
                    <Column field="title" header="Name" body={nameBodyTemplate} sortable />
                    <Column field="place" header="Place" body={placeBodyTemplate} sortable />
                    <Column field="dateAndTimme" header="DateTime" body={dateTimeBodyTemplate} sortable />
                    <Column field="price" header="Price" body={priceBodyTemplate} />
                    <Column field="numberofTicket" header="Total Tickets" body={totalTicketsBodyTemplate} sortable />
                    <Column field="ticketLeft" header="Total Left" body={ticketleftBodyTemplate} sortable />
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable />
                    <Column field="action" header="action" body={actionBodyTemplate} />
                </DataTable>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        searchUser: state.searchUser
    };
}

export default connect(mapStateToProps)(dataTable);