import React from 'react'
import ChangePassword from '../components/user/changePassword'
import PageWrapper from '../components/Layout/UnAuthorizedLayout'
const reset =()=>{

    return(
       <PageWrapper >
           <ChangePassword />
           
       </PageWrapper>
    )
 
}
export default reset;