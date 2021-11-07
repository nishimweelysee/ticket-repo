import {LOGIN_REQUEST_SUCCESS} from '../redux/types/userTypes'
import { authenticatedUser } from '../redux/reducers/userReducers/loadState'

const LoadFromLocalStorage = () => new Promise((resolve, reject) => {
  const userInfo = localStorage.getItem('userData');
  if (userInfo) {
    authenticatedUser(JSON.parse(userInfo),LOGIN_REQUEST_SUCCESS);
    return resolve();
  }
  return resolve();
});
export default LoadFromLocalStorage;