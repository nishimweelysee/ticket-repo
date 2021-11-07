
import {
    LOGIN_REQUEST_ERROR, LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_PENDING
} from '../../types/userTypes'
import cogoToast from 'cogo-toast'
import { httpRequest } from '../../../helpers/httpRequest'



export const loginAction = (values) => async dispatch => {
    dispatch({
        type: LOGIN_REQUEST_PENDING
    })

    const resp = await httpRequest("POST", "/users/login", values)
    if (resp.error) {
        dispatch({
            type: LOGIN_REQUEST_ERROR,
            error: resp.error
        })
    }
    else {
        dispatch({
            type: LOGIN_REQUEST_SUCCESS,
            payload: resp.response.data.data
        })
        localStorage.setItem("userData", JSON.stringify(resp.response.data.data))
        cogoToast.success(resp.response.data.message)
        const user = resp.response.data.data.displayData
        if (user.RoleId == 2 || user.RoleId == 3) {
            window.location.href = "/user-dashboard"
        }
        if (user.RoleId == 4 || user.RoleId == 5) {
            window.location.href = "/"
        }
        if (user.RoleId == 1) {
            window.location.href = "/admin-dashboard"
        }
    }

}

export const googleLoginAction = (token) => async dispatch => {

    dispatch({
        type: LOGIN_REQUEST_PENDING
    })
    const resp = await httpRequest('get', `users/me/${atob(token)}`, {});
    if (resp) {
        const userInfo = resp.response.data.data;
        await dispatch({
            type: LOGIN_REQUEST_SUCCESS,
            payload: userInfo
        });
        localStorage.setItem('userData', JSON.stringify(userInfo));
        const user = resp.response.data.data.displayData
        if (user.RoleId == 2 || user.RoleId == 3) {
            window.location.href = "/user-dashboard"
        }
        if (user.RoleId == 4 || user.RoleId == 5) {
            window.location.href = "/"
        }
        if (user.RoleId == 1) {
            window.location.href = "/admin-dashboard"
        }
    }
}