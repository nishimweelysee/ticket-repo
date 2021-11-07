import React from 'react'
import ResetPassword from '../components/user/resetPassword'
import PageWrapper from '../components/Layout/UnAuthorizedLayout'
const reset =()=>{

    return(
       <PageWrapper >
           <ResetPassword />
           
       </PageWrapper>
    )
 
}
export default reset;