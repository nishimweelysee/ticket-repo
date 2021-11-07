import cogoToast from 'cogo-toast';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import AuthPageWrapper from '../components/Layout/AuthorizedLayout'
import { searchUserdata } from '../redux/actions/search/searchAction'
import PropTypes from 'prop-types';
import svgImage from '../../public/img/figasvgs.jpg';
import EventSlide from '../components/dashboard/eventSlide';
import DataTable from '../components/common/dataTable';

function dashboard(props) {

    useEffect(() => {
        const fetchData = async () => {
            await props.searchUserdata(props.login.token);
        };
        fetchData();
    },[])

    return (
        <>{
            props.login.isLoggedIn?
                <AuthPageWrapper>
                    <div style={{ borderLeft: '2px solid rgb(119, 119, 243)' }}>
                        <div className="block md:grid h-auto rounded-sm md:grid-cols-2 m-2 md:m-5 bg-maincolor">
                            <div>
                                <img src={svgImage} alt="image" className="object-cover"/>
                            </div>
                            <div className="p-5">
                                <div className="text-white">
                                    <p>Welcome back</p>
                                    <h1 className="font-bold mt-3 mb-3">{props.login.data.firstName + " " + props.login.data.lastName}</h1>
                                    <p>Welcome to Ticket Rwanda If you are a new promoter and want to host event or sell tickets to your ticket online then you're in the right place.   
There is no cost to you as a promoter to sell tickets via Ticket Rwanda everything is self-explanatory from there, but we are always available to answer your questions if you need us.
                                    </p>
                                </div>
                                <div className="md:my-4 my-2 animate-bounce hover:animate-none">
                                    <Link to="/user-dashboard/event/new" className="p-2 rounded-2xl text-center text-white bg-buttonColor text-2xl">Create Event Here</Link>
                                </div>
                            </div>
                        </div>
                        <EventSlide />
                        <div style={{ border: '2px solid rgb(119, 119, 243)' }} className="rounded-3xl m-2 md:m-5 p-3">
                            <div className="flex justify-between">
                                <div className="bg-buttonColor rounded p-2 text-white">
                                    <p>Featured Event</p>
                                </div>
                                <div className="bg-buttonColor rounded p-2 text-white">
                                    <Link to="/user-dashboard/event">View All</Link>
                                </div>
                            </div>
                            <DataTable number={5}/>
                        </div>
                        
                    </div>

                </AuthPageWrapper> :
                <Redirect to="/" />
        }
        </>
    );
}

dashboard.protoTypes = {
    searchUserdata: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        searchUser: state.searchUser
    };
}

export default connect(mapStateToProps, { searchUserdata })(dashboard);