import axios from 'axios';

const backendUrl = process.env['BACKEND_URL'] || 'http://localhost:3000';
console.log('Backend URL:', backendUrl);
const Axios = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Axios;
