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

// const ApplicationForm = async(token) => {
//     await axios.post(`${API}clients`, data, {headers: {Authorization: `${BEARER} ${token}`}})

//     await axios.post(`${API}accounts`, {headers: {Authorization: `${BEARER} ${token}`}})

//     await axios.post(`${API}cards`, {headers: {Authorization: `${BEARER} ${token}`}})
// }

const functions = {
    getAllUsers,
    updateStatus
}

export default functions;