import { API, BEARER } from '../Environment/constant';
import axios from 'axios';

const login = (username, password) => {
    return axios.post(`${ API}auth/local`, {identifier: username, password: password})    
}

const confirmPassword = (data) => {
    const token = '8d0e3fe8854c968c1b0d88887e505e2827cef2a93fbe9bf7c8f54cc4b7a6f360a7098dd363732fec03c67da4192b76d3b4bcec5c15dee6ffa49dde11f26e373e934517e3328bd8162cb4f77da6f4b90dc8b7670b5d0e5ba91b358af9521f02f1d4d977968053e9604c723c34c09b8265c2c8167265750bf33f7a6d5bf3c1ba13'
    return axios.post(`${API}auth/reset-password`, data,{headers: {Authorization: `${BEARER} ${token}`}})
}

const loggedInUser = (token) => {
    return axios.get(`${ API}users`, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const UpdateUser = (data, token) => {
    return axios.put(`${API}users/${1}`, data, {headers: {Authorization: `${BEARER} ${token}`}})
}

const logger = {
    login,
    confirmPassword,
    loggedInUser,
    UpdateUser
}

export default logger;