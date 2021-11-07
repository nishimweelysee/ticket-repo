import { httpRequest } from "../../../helpers/httpRequest";
import { GET_USER_INFO_REQUEST_ERROR,GET_USER_INFO_REQUEST_SUCCESS, GET_USER_INFO_REQUEST_PENDING } from "../../types/userTypes";

export const getUserAction = (token) => async dispatch => {
 dispatch({
   type: GET_USER_INFO_REQUEST_PENDING
 });
 const resp = await httpRequest("GET", "/users/manager/viewUsers",null , {
   "Authorization": `${token}`
 });
 
 if (!resp.error) {
   dispatch({
     type: GET_USER_INFO_REQUEST_SUCCESS,
     payload: resp.response.data.data
   });
 }
 else {
   dispatch({
     type: GET_USER_INFO_REQUEST_ERROR,
     error: resp.data
   });
 }

}