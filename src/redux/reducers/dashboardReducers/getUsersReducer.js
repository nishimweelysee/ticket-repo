import { GET_USER_INFO_REQUEST_ERROR,GET_USER_INFO_REQUEST_SUCCESS, GET_USER_INFO_REQUEST_PENDING } from "../../types/userTypes";

const initialState = {
  isFetching: false,
  error: null,
  data: [],
  success:false
};

export const getUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO_REQUEST_PENDING:
      return {
        ...state,
        isFetching: true,
        success:false
      };
    case GET_USER_INFO_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
        success:true
      };
    case GET_USER_INFO_REQUEST_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        success:false
      };
    default:
      return state;
  }
}