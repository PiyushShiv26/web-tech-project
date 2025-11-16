import axios from 'axios';

// axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // backend's URL
});


// interceptor runs on EVERY request.

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;