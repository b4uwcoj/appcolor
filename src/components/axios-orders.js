import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://colorburger.firebaseio.com/'
});

export default instance;