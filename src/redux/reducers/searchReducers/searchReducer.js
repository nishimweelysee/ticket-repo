import {
    SEARCH_SPECIFIC_USER_DATA,SEARCH_TYPE_ALLEVENTS
} from '../../types/searchTypes'

const initialState = {
    loading:false,
    success: false,
    message: null,
    data: {},
    events:[]
}

export const searchUserDataReducer = (state = initialState, action)=>{

     switch(action.type){
        case SEARCH_SPECIFIC_USER_DATA:
             return {
                    ...state,
                    loading: false,
                    success: true,
                    message: action.payload.message,
                    data: action.payload.data.userInfo,
                    events:action.payload.data.userInfo.Events
                }
        default:
            return state
     }

}