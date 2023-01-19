import { API, BEARER } from "../Environment/constant";
import axios from 'axios';

const getActive = (token) => {
    return axios.get(`${API}accounts?populate=*&filters[account_status][$eq]=Active`, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const getDeactive = (token) => {
    return axios.get(`${API}accounts?populate=*&filters[account_status][$eq]=Inactive`, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const ApplicationForm = async(token) => {
    await axios.post(`${API}clients`, data, {headers: {Authorization: `${BEARER} ${token}`}})

    await axios.post(`${API}accounts`, {headers: {Authorization: `${BEARER} ${token}`}})

    await axios.post(`${API}cards`, {headers: {Authorization: `${BEARER} ${token}`}})
}

const functions = {
    getActive,
    getDeactive
}

export default functions;