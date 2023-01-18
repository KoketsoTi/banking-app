import { API, BEARER } from '../Environment/constant';
import axios from 'axios';

const login = (username, password) => {
    return axios.post(`${ API}auth/local`, {identifier: username, password: password})    
}

const confirmPassword = (data) => {
    const token = '793532e1ead6dd7cf8815bbd1b94f7b018e9427738aca258209546f7da1618fc1e48b97578f708c62b60ed5f00ce5656284c57352b74df4fb325d19499c8e52c4fe478435c271b752704f26e6a2470365031a564d49111af82d8de2d195759ac5e9375546b4aca1ad72ff84e98e8e5cf1088c812bb316562256b224239015f4c'
    return axios.post(`${API}auth/reset-password`, data,{headers: {Authorization: `${BEARER} ${token}`}})
}

const logger = {
    login,
    confirmPassword
}

export default logger;