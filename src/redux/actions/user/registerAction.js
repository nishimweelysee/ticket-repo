
import {
    REGISTER_REQUEST_ERROR,REGISTER_REQUEST_SUCCESS,REGISTER_REQUEST_PENDING
} from '../../types/userTypes'
import cogoToast from 'cogo-toast';
import { httpRequest } from '../../../helpers/httpRequest';

export const registerAction = (user) => async dispatch =>{
    dispatch({
        type: REGISTER_REQUEST_PENDING
    })
    const resp = await httpRequest("POST", '/users/signup', user)
    if(resp.error){
        dispatch({
            type: REGISTER_REQUEST_ERROR,
            error: resp.error
        })
         if(resp.response.data.message.error){
            cogoToast.error(resp.response.data.message.error)
         }else if(err.response.data.message){
            cogoToast.error(resp.response.data.message)
         }
    }else{
        dispatch({
            type: REGISTER_REQUEST_SUCCESS,
            payload: resp.response.data
        })
     
    }
    
          
         
}