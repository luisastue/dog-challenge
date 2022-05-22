import axios from 'axios';

const DOG_API = 'https://dog.ceo/api/'

const dogApi = () => {
    return axios.create({
        baseURL: DOG_API,
        responseType: 'json',
    });
};

export default dogApi;
