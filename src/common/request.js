import axios from 'axios'
import { getToken } from './jwt'

const client = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 12000
})

client.interceptors.request.use(function(config) {
    const token = getToken()
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
        config.headers['Access-Control-Allow-Headers'] = '*'
    }
    return config
})

client.interceptors.response.use(function(response) {
    // console.log('request: ', response)
    return response.data
})

export default client