import axios from 'axios';
export default function axiosConfig() {
  axios.defaults.baseURL = process.env.BACKEND_URL;
}