import {
    REGISTER_REQUEST_ERROR,REGISTER_REQUEST_SUCCESS,REGISTER_REQUEST_PENDING
} from '../../types/userTypes'

const initialState = {
    loading:false,
    success: false,
    message: null,
    error: false,
    
}

export const registerReducer = (state = initialState, action)=>{

     switch(action.type){
        case REGISTER_REQUEST_PENDING:
            return {
                ...state,
                loading: true
            }
        case REGISTER_REQUEST_SUCCESS:
             return {
                    ...state,
                    loading: false,
                    success: true,
                    message: action.payload.message
                    }
        case REGISTER_REQUEST_ERROR:
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