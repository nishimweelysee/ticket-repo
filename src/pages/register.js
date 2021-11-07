import React from 'react'
import RegisterForm from '../components/user/registerForm'
import PageWrapper from '../components/Layout/UnAuthorizedLayout'
const register =()=>{

    return(
       <PageWrapper >
           <RegisterForm />
           
       </PageWrapper>
    )
 
}
export default register;