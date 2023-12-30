import axios from "axios";

const client = axios.create({baseURL: "http://localhost:4000"});

export const request = async ({...options}) => {

    client.defaults.headers.common.Authorization  = 'Bearer Token' // here token is the string token that we get from the local storage or from the redux store or from the cookies like this 'Bearer' + token
    // client.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token');

    const onSuccess = (response) => {
        //  option success handling here
        return response;
    };
    const onError = (error) => {
        //  option error handling here
        return error;
    }

    return client(options).then(onSuccess).catch(onError);
}
// this is the axios instance that we will use in our app to make requests
// we can also add interceptors here to handle the request and response