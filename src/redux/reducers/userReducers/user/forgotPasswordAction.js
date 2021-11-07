import { RESET_PASSWORD_REQUEST_ERROR,RESET_PASSWORD_REQUEST_SUCCESS, RESET_PASSWORD_REQUEST_PENDING } from "../../types/userTypes";

import cogoToast from 'cogo-toast'
import { httpRequest } from "../../../helpers/httpRequest";


export const forgotPasswordAction = (email) => async dispatch =>{
    dispatch({
        type: RESET_PASSWORD_REQUEST_PENDING
    })
 const resp = await httpRequest("POST", '/users/forgot-password', email)
   if(resp.error){
    cogoToast.error(resp.error.message)
    dispatch({
        type: RESET_PASSWORD_REQUEST_ERROR,
        error: resp.error.response.data
    })
   
   }else{
    cogoToast.success(resp.response.data.message, {position: "top-right"})
    dispatch({
        type: RESET_PASSWORD_REQUEST_SUCCESS,
        payload: resp.response.data
    })
 
   }
      
}