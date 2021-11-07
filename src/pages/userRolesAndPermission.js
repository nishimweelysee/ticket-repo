import React from 'react';
import UserRoles from '../components/dashboard/admin-dashboard/userRoles';
import AuthPageWrapper from '../components/Layout/AuthorizedLayout'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const userRolesAndPermissionPage = (props) => {
  return (
    <>{
        props.login.isLoggedIn?
            <AuthPageWrapper>
              <div style={{ borderLeft: '2px solid rgb(119, 119, 243)' }}>
              <UserRoles/>
              </div>
            </AuthPageWrapper> :
            <Redirect to="/" />
    }
    </>
  );
}
userRolesAndPermissionPage.protoTypes = {
    login: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    };
}

export default connect(mapStateToProps) (userRolesAndPermissionPage);