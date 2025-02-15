import axios from 'axios';

// const BASE_URL = 'http://localhost:5000';
const BASE_URL = 'https://learning-management-system-7cdd.onrender.com';

export default axios.create({
  baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
  withCredentials: true
});
