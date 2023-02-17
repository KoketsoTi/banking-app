import { API, BEARER } from '../Environment/constant';
import axios from 'axios';

const login = (username, password) => {
    return axios.post(`${ API}auth/local`, {identifier: username, password: password})    
}

const confirmPassword = (data) => {
    const token = '60ab5b57156b7a1fcfce2ad76e894571d33a78e5eb5c8b9f94ee67f101d171a61c2f3297b335e4896339f21ce1ce0c0eebc22a7ead07c542e56c3c06b903ae7e141edfd689dc7b2112ae3c60b74d1ad240bc8fdc90a5ae2e25409db84f3432ba67504593f949d321e11ba3aec375708d244fd356224ad22233656be6bbb03f54'
    return axios.post(`${API}auth/reset-password`, data, {headers: {Authorization: `${BEARER} ${token}`}})
}

const SetNewPassword = (data) => {
    const token = '60ab5b57156b7a1fcfce2ad76e894571d33a78e5eb5c8b9f94ee67f101d171a61c2f3297b335e4896339f21ce1ce0c0eebc22a7ead07c542e56c3c06b903ae7e141edfd689dc7b2112ae3c60b74d1ad240bc8fdc90a5ae2e25409db84f3432ba67504593f949d321e11ba3aec375708d244fd356224ad22233656be6bbb03f54'
    return axios.post(`${API}auth/reset-password`, data, {headers: {Authorization: `${BEARER} ${token}`}})
}

const forgotPassword = (data) => {
    const token = '60ab5b57156b7a1fcfce2ad76e894571d33a78e5eb5c8b9f94ee67f101d171a61c2f3297b335e4896339f21ce1ce0c0eebc22a7ead07c542e56c3c06b903ae7e141edfd689dc7b2112ae3c60b74d1ad240bc8fdc90a5ae2e25409db84f3432ba67504593f949d321e11ba3aec375708d244fd356224ad22233656be6bbb03f54'
    return axios.post(`${API}auth/forgot-password`, data, {headers: {Authorization: `${BEARER} ${token}`}})
}

const loggedInUser = (token) => {
    return axios.get(`${ API}users/me`, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const register = (data) => {
    return axios.post(`${API}auth/local/register`, data )
}

const UpdateUser = (data, token) => {
    return axios.put(`${API}users/${1}`, data, {headers: {Authorization: `${BEARER} ${token}`}})
}



const logger = {
    login,
    confirmPassword,
    loggedInUser,
    forgotPassword,
    UpdateUser,
    SetNewPassword,
    register
}

export default logger;