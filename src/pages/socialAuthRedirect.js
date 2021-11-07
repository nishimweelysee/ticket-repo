import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { googleLoginAction } from '../redux/actions/user/loginAction';
import { connect } from 'react-redux';
import cogoToast from 'cogo-toast';
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';


const socialAuth = (props) => {
    let history = useHistory()
  const params = useParams();
  const { action } = params;
  if(action === 'error'){
      cogoToast.error("sign up failed!!");
      history.push("/")
  }
  if(action === 'manually'){
    cogoToast.error("Login using your email and password");
    history.push("/login")
}
  useEffect(async () => {
    if (params.token) {
     props.googleLoginAction(params.token); 
    }
  },[]);
  return (
    
      <div className="w-screen overflow-hidden">
        
        <div className="p-4 main py-36">
          <div className="w-full mx-auto text-center">
           {props.login.loading ? (<CircularProgress/>):(<CircularProgress title="Loading..."/>)}
          </div>
        </div>
     
      </div>
   
  );
};
socialAuth.protoTypes = {
    googleLoginAction:PropTypes.func.isRequired,
}
const mapStateToProps = (state) => {
  return {
      login: state.login,
  };
}
export default connect(mapStateToProps, {googleLoginAction})(socialAuth);