import axios from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:8080/api/',
    timeout: 12000,

    // config bearer token in this
    headers: {},

    transformRequest: [function(data, headers) {
        return data
    }],

    transformResponse: [function(data) {
        return data
        return JSON.parse(data)
    }],

    params: {},

    responseEncoding: 'utf8'
})

const request = function(options) {
    const onSuccess = function(res) {
        console.debug('Request Successful!', res)
        return res.data
    }

    const onError = function(error) {
        console.error('Request Failed!', error.config)

        if (error.response) {
            // Request was made but server responded with something
            // other than 2xx
            console.error('Status:',  error.response.status);
            console.error('Data:',    error.response.data);
            console.error('Headers:', error.response.headers);
      
        } else {
        // Something else happened while setting up the request
        // triggered the error
        console.error('Error Message:', error.message);
        }
    
        return Promise.reject(error.response || error.message);
    }

    return client(options)
        .then(onSuccess)
        .catch(onError)
}

export default request