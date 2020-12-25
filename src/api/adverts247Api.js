import axios from 'axios';

let instance = axios.create({
    baseURL: `https://frozen-escarpment-07199.herokuapp.com/`
})


instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

export default instance;