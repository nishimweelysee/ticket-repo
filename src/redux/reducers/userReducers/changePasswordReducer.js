import { CHANGE_PASSWORD_REQUEST_ERROR,CHANGE_PASSWORD_REQUEST_SUCCESS, CHANGE_PASSWORD_REQUEST_PENDING  } from "../../types/userTypes";

const initialState = {
    loading: false,
    message: '',
    success: false
}

export const changePasswordReducer = (state = initialState, action)=>{

     switch(action.type){
        case CHANGE_PASSWORD_REQUEST_PENDING:
            return {
                ...state,
                loading: true
            }
        case CHANGE_PASSWORD_REQUEST_SUCCESS:
             return {
                    ...state,
                    loading: false,
                    success: true,
                    message: action.payload.message,
                    }
        case CHANGE_PASSWORD_REQUEST_ERROR:
                        return {
                            ...state,
                            loading: false,
                            success: false,
                            message: action.error
                        }
        default:
            return state
     }

}