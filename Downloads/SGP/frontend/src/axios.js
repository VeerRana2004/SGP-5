import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend API base URL
});

// You can also set headers or interceptors if needed
// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN';

export default instance;
