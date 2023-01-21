import { API, BEARER } from "../Environment/constant";
import axios from 'axios';
import { getToken } from "../helpers/helpers";

const getAllUsers = () => {
    const token = getToken();
    return axios.get(`${API}accounts?populate=*`, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const updateStatus = (token, id, value) => {
    return axios.put(`${API}accounts/${id}`, value, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const ApplicationForm = async(data) => {
    await axios.post(`${API}newapplications`, data)
}

const getNewUsers = () => {
    const token = getToken();
    return axios.get(`${API}newapplications`, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const functions = {
    getAllUsers,
    updateStatus,
    ApplicationForm,
    getNewUsers
}

export default functions;