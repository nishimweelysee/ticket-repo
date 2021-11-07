import React, { useEffect } from 'react'
import LoginForm from '../components/user/loginForm'
import PageWrapper from '../components/Layout/UnAuthorizedLayout'
import { useLocation } from 'react-router'
import cogoToast from 'cogo-toast'


const login = () => {
    const location = useLocation();
    useEffect(()=>{
        let statusCode = new URLSearchParams(location.search).get('statusCode');
        if(statusCode==200){
            cogoToast.success("Your account was verified success, Please login ")
        }
        if(statusCode==500){
            cogoToast.error("Your account not verified success please contact Administrator, for help");
        }
    })
    return (
        <PageWrapper className="" >
            <LoginForm />

        </PageWrapper>
    )

}
export default login;