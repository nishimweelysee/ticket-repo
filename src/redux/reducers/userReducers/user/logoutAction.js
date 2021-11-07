
import {
    LOGOUT_USER_FAILED, LOGOUT_USER_SUCCESS
} from '../../types/userTypes'
import cogoToast from 'cogo-toast'
import { httpRequest } from '../../../helpers/httpRequest'



export const logoutAction = (token) => async dispatch => {
    const resp = await httpRequest("POST","/users/logout",null,{authorization:token})
    if (resp.error) {
        dispatch({
            type: LOGOUT_USER_FAILED,
            error: resp.error
        })
    }
    else {
        dispatch({
            type: LOGOUT_USER_SUCCESS,
            payload: {
                loading: false,
                success: false,
                message: null,
                error: false,
                token: null,
                data: {},
                isLoggedIn: false
            }
        })
        localStorage.removeItem("userData")
        cogoToast.success("Loggedout Success")
        window.location.href = "/"
    }

}