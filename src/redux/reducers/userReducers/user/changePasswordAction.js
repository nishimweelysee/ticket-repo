import { CHANGE_PASSWORD_REQUEST_ERROR,CHANGE_PASSWORD_REQUEST_SUCCESS, CHANGE_PASSWORD_REQUEST_PENDING } from "../../types/userTypes";
import cogoToast from 'cogo-toast'
import { httpRequest } from "../../../helpers/httpRequest";


export const changePasswordAction = (token,values) => async dispatch =>{
    dispatch({
        type: CHANGE_PASSWORD_REQUEST_PENDING
    })
  const resp = await httpRequest("PUT",`/users/reset-password/${token}`, values)
    
  if(resp.error){
    dispatch({
        type: CHANGE_PASSWORD_REQUEST_ERROR,
        error: resp.error
    })
    cogoToast.error(resp.response.error.message)
  }else{
    
    dispatch({
        type: CHANGE_PASSWORD_REQUEST_SUCCESS,
        payload: resp.response.data
    })
    cogoToast.success(resp.response.data.message)
  }
   
}