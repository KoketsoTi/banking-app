import { API, BEARER } from "../Environment/constant";
import axios from 'axios';
import { getToken } from "../Helpers/helpers";

const getAllUsers = () => {
    const token = getToken();
    return axios.get(`${API}accounts?populate=*`, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const updateStatus = (token, id, value) => {
    return axios.put(`${API}accounts/${id}`, value, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const deleteAUser = (token, id) => {
    return axios.delete(`${API}newapplications/${id}`, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const getShortLoans = (token) => {
    return axios.get(`${API}clients?populate=*&filters[loans][loan_type][$eq]=Short-term`, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const getLongLoans = (token) => {
    return axios.get(`${API}clients?populate=*&filters[loans][loan_type][$eq]=Long-term`, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const updateLoanStatus = (token, id, value) => {
    return axios.put(`${API}loans/${id}`, value, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const getUser = (id) => {
    const token = getToken();
    return axios.get(`${API}accounts?populate=*&filters[customer_id][id][$eq]=${id}`, {headers: {Authorization: `${BEARER} ${token}`}}) 
}


const ApplicationForm = async(data) => {
    await axios.post(`${API}newapplications`, data)
}

const getNewUsers = () => {
    const token = getToken();
    return axios.get(`${API}newapplications`, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const register = (token, data) => {
    return axios.post(`${API}auth/local/register`, data, {headers: {Authorization: `${BEARER} ${token}`}} )
}

const functions = {
    getAllUsers,
    updateStatus,
    ApplicationForm,
    getNewUsers,
    deleteAUser,
    getShortLoans,
    getLongLoans,
    updateLoanStatus,
    register,
    getUser
}

export default functions;