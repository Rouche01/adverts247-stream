import axios from 'axios';

const instance = axios.create({
    baseURL: `https://frozen-escarpment-07199.herokuapp.com/`
})


export default instance;