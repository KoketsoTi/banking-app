import { API, BEARER } from "../Environment/constant";
import { getToken } from "../Helpers/helpers";
import axios from 'axios';

const getAllUsers = () => {
    const token = getToken();
    return axios.get(`${API}clients?populate=*`, {headers: {Authorization: `${BEARER} ${token}`}}) 
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
    return axios.get(`${API}clients/${id}?populate=*`, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const ApplicationForm = async(data) => {
    await axios.post(`${API}newapplications`, data)
}

// const LoanApplicationForm = async(data) => {
//     await axios.post(`${API}`, data)
// }

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
    // LoanApplicationForm,
    getNewUsers,
    deleteAUser,
    getShortLoans,
    getLongLoans,
    updateLoanStatus,
    register,
    getUser
}

export default functions;