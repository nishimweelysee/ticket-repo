import axios from 'axios';

const API = axios.create({
    baseURL: process.env.BACKEND_LINK,
})

export { API }
