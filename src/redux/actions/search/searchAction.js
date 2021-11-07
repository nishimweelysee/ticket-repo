import { httpRequest } from '../../../helpers/httpRequest';
import { SEARCH_TYPE_ALLEVENTS,SEARCH_SPECIFIC_USER_DATA } from '../../types/searchTypes';

export const searchAction = (data) => async dispatch => {
    return dispatch({
        type: SEARCH_TYPE_ALLEVENTS,
        payload: data
    })
}
export const searchUserdata = (token) => async dispatch => {
    const {error,response} = await httpRequest("GET",`users/getAll`,null,{"Authorization":token});
    if(!error){
        return dispatch({
            type: SEARCH_SPECIFIC_USER_DATA,
            payload: response.data
        })
    }
}