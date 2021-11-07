import cogoToast from 'cogo-toast';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import AuthPageWrapper from '../components/Layout/AuthorizedLayout'
import { searchUserdata } from '../redux/actions/search/searchAction'
import PropTypes from 'prop-types';
import DataTable from '../components/common/dataTable';

function dashboard(props) {

    useEffect(async () => {
        await props.searchUserdata(props.login.token);
    },[])

    return (
        <>{
            props.login.isLoggedIn?
                <AuthPageWrapper>
                    <div style={{ border: '2px solid rgb(119, 119, 243)' }}>
                        <div style={{ border: '2px solid rgb(119, 119, 243)' }} className="rounded-3xl m-2 md:m-5 p-3">
                            <div className="flex justify-between">
                                <div className="bg-buttonColor rounded p-2 text-white">
                                    <p>Featured Event</p>
                                </div>
                                <div className="bg-buttonColor rounded p-2 text-white">
                                    <Link to="/user-dashboard/event/new">New Event</Link>
                                </div>
                            </div>
                            <DataTable number={50}/>
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