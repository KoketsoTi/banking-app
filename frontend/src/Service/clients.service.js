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
    return axios.get(`${API}loans?populate=*&filters[loan_type][$eq]=Short-term&filters[loan_status][$ne]=Pending`, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const getPending = () => {
    const token = getToken();
    return axios.get(`${API}loans?populate=*&&filters[loan_status][$eq]=Pending`, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const getLongLoans = (token) => {
    return axios.get(`${API}loans?populate=*&filters[loan_type][$eq]=Long-term&filters[loan_status][$ne]=Pending`, {headers: {Authorization: `${BEARER} ${token}`}}) 
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

const getNewUsers = () => {
    const token = getToken();
    return axios.get(`${API}newapplications`, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const getLoanApplication = () => {
    const token = getToken();
    return axios.get(`${API}loan-applications`, {headers: {Authorization: `${BEARER} ${token}`}}) 
}


const createUser = (token, data) => {
    return axios.post(`${API}clients`, data, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const RejectLoan = (token, id, value) => {
    return axios.delete(`${API}loans/${id}`, value, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const TransactionHistory = (token, value) => {
    return axios.post(`${API}transactions`, value, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const getTransaction = (id) => {
    const token = getToken();
    return axios.get(`${API}accounts/${id}?populate=*`, {headers: {Authorization: `${BEARER} ${token}`}})
}


const Nortification = (value) => {
    const token = getToken();
    return axios.post(`${API}nortifications`, value, {headers: {Authorization: `${BEARER} ${token}`}})
}

const payBeneficiary = (account) => {
    const token = getToken();
    return axios.get(`${API}clients?populate=*&filters[acc_id][accountno][$eq]=${account}`,{headers: {Authorization: `${BEARER} ${token}`}})
}

const UpdateBeneficiary = (id, balance) => {
    const token = getToken();
    return axios.put(`${API}beneficiaries/${id}`, balance, {headers: {Authorization: `${BEARER} ${token}`}})
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
    getUser,
    createUser,
    getPending,
    RejectLoan,
    getLoanApplication,
    TransactionHistory,
    getTransaction,
    Nortification,
    payBeneficiary,
    UpdateBeneficiary,
}

export default functions;