import { combineReducers } from "redux";
import { registerReducer } from "./userReducers/registerReducer"; 
import { loginReducer } from "./userReducers/loginReducer";
import { resetPasswordReducer } from "./userReducers/forgotPasswordReducer";
import {changePasswordReducer } from "./userReducers/changePasswordReducer";
import {searchParamsReducer} from './searchReducers/searchParamsReducer';
import {searchUserDataReducer} from './searchReducers/searchReducer';
import {getUsersReducer} from './dashboardReducers/getUsersReducer';

const RootReducer = combineReducers({
    register: registerReducer,
    login: loginReducer,
    reset: resetPasswordReducer,
    changePassword: changePasswordReducer,
    searchParams: searchParamsReducer,
    searchUser: searchUserDataReducer,
    getUsers: getUsersReducer
})

export default RootReducer