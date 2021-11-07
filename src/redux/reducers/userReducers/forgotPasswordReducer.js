import { RESET_PASSWORD_REQUEST_ERROR,RESET_PASSWORD_REQUEST_SUCCESS, RESET_PASSWORD_REQUEST_PENDING } from "../../types/userTypes";

const initialState = {
    loading: false,
    message: '',
    success: false,
    error: false,
    token: ''
}

export const resetPasswordReducer = (state = initialState, action)=>{

     switch(action.type){
        case RESET_PASSWORD_REQUEST_PENDING:
            return {
                ...state,
                loading: true
            }
        case RESET_PASSWORD_REQUEST_SUCCESS:
           
             return {
                    ...state,
                    loading: false,
                    success: true,
                    message: action.payload.message,
                    token: action.payload.data.token
                    }
                    
        case RESET_PASSWORD_REQUEST_ERROR:
                        return {
                            ...state,
                            loading: false,
                            success: false,
                            error:true,
                            message: action.error
                        }
        default:
            return state
     }

}