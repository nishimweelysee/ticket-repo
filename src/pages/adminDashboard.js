import React, { useEffect, useState } from 'react';
import PageAuthWrapper from '../components/Layout/AuthorizedLayout';
import svgImage from '../../public/img/figasvgs.jpg';
import { searchUserdata } from '../redux/actions/search/searchAction'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faComments } from '@fortawesome/free-regular-svg-icons';
import { httpRequest } from '../helpers/httpRequest';
import profImg from '../../public/img/profileImg.png';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

function adminDashboard(props) {
    const [users, setUsers] = useState();
    const [events, setEvents] = useState([

    ])
    const [data, setData] = useState({});
    const getUsers = async () => {
        const { error, response } = await httpRequest("GET", '/users/admin/viewUsers', null, { "Authorization": props.login.token });
        if (!error) {
            setUsers(response.data.data);
        }
    }
    const getEvents = async () => {
        const { response, error } = await httpRequest("GET", "/events?page=1&limit=100&status=Pending&share=true");
        let dataa = _.orderBy(response.data.data.result, ['createdAt'], ['desc']).slice(0, 20);
        setEvents([...events, ...dataa])
    }

    const getDatas = async () => {
        const { response, error } = await httpRequest("GET", "/users/calculate", null, { "Authorization": props.login.token });
        if (!error) {
            setData({ ...response.data.data })
        }
    }
    useEffect(() => {
        getUsers();
        getEvents();
        getDatas();

    }, [])

    const useStyles = makeStyles({
        table: {
            minWidth: 500,
        },
    });

    const classes = useStyles();
    return (
        <PageAuthWrapper>
            <div style={{ borderLeft: '2px solid rgb(119, 119, 243)' }}>
                <div>
                    <div className="block md:grid h-auto rounded-sm md:grid-cols-2 m-2 md:m-5 bg-maincolor">
                        <div>
                            <img src={svgImage} alt="image"  className="object-cover"/>
                        </div>
                        <div className="p-5">
                            <div className="text-white">
                                <p>Welcome back</p>
                                <h1 className="font-bold mt-3 mb-3">{props.login.data.firstName + " " + props.login.data.lastName}</h1>
                                <p>Welcome to Ticket Rwanda If you are a new promoter and want to host event or sell tickets to your ticket online then you're in the right place.   
There is no cost to you as a promoter to sell tickets via Ticket Rwanda everything is self-explanatory from there, but we are always available to answer your questions if you need us.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="grid md:grid-cols-4 gap-4 p-4 sm:grid-cols-2 grid-cols-1">
                        <div style={{
                            background: '#FFFFFF',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            borderRadius: '30px', width: 'fit-content'
                        }} className="flex gap-4 p-4 m-auto">
                            <div className="flex flex-col">
                                <p>{data.Users}</p>
                                <p className="text-maincolor">Users</p>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faUsers} size='3x' />
                            </div>

                        </div>
                        <div style={{
                            background: '#FFFFFF',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            borderRadius: '30px', width: 'fit-content'
                        }} className="flex gap-4 p-4 m-auto">
                            <div className="flex flex-col">
                                <p>{data.Events}</p>
                                <p className="text-maincolor">Events</p>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faCalendarAlt} size='3x' />
                            </div>
                        </div>
                        <div style={{
                            background: '#FFFFFF',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            borderRadius: '30px', width: 'fit-content'
                        }} className="flex gap-4 p-4 m-auto">
                            <div className="flex flex-col">
                                <p>{data.Messages}</p>
                                <p className="text-maincolor">Messages</p>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faComments} size='3x' />
                            </div>
                        </div>
                        <div style={{
                            background: '#FFFFFF',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            borderRadius: '30px', width: 'fit-content'
                        }} className="flex gap-4 p-4 m-auto">
                            <div className="flex flex-col">
                                <p>{data.Income} Rwf</p>
                                <p className="text-maincolor">Income</p>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faMoneyBill} size='3x' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 m-6">
                    <div>
                        <div className="p-2 m-2 ml-8"><h2>Upcoming Events</h2></div>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Hoster</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {events.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {row.title}
                                            </TableCell>
                                            <TableCell>{moment(row.dateAndTimme).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                                            <TableCell>{row.host}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div>
                        <div className="p-2 m-2 ml-8"><h2>Managers</h2></div>
                        <div className="flex flex-col">
                            {
                                _.map(users, (u, i) => {
                                    return <div style={{
                                        background: '#FFFFFF',
                                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                                    }} className="flex gap-1 m-2 ml-10 p-2 justify-between" key={i}>
                                        <div>
                                            <img className="object-cover" src={profImg} width="50px" height="50px" style={{ borderRadius: '151.5px' }} />
                                        </div>
                                        <div><p>{'Nishimwe'}  {u.lastName}</p>
                                            <p>From {u.companyName}</p>
                                        </div>
                                        <div className="text-maincolor flex flex-col justify-end"><p>Message</p></div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </PageAuthWrapper >
    );
}

adminDashboard.protoTypes = {
    searchUserdata: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        searchUser: state.searchUser
    };
}

export default connect(mapStateToProps, { searchUserdata })(adminDashboard);