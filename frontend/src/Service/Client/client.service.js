import { API, BEARER } from "../../Environment/constant";
import { getToken, getId } from "../../Helpers/helpers";
import axios from 'axios';

const getClientUser = () => {
    const token = getToken();
    return axios.get(`${API}users/me?populate=*`, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const getBeneficiaries = (id) => {
    const token = getToken();
    return axios.get(`${API}clients/${id}?populate=*`, {headers: {Authorization: `${BEARER} ${token}`}}) 
}


const applyForLoan = (data) => {
    const token = getToken();
    return axios.post(`${API}loan-applications`,data, {headers: {Authorization: `${BEARER} ${token}`}}) 
}



//Update beneficiaries with new beneficiaries
const updateClientBeneficiaryList = (id, data) => {
    const token = getToken();
    return axios.put(`${API}clients/${id}`, data, {headers: {Authorization: `${BEARER} ${token}`}});
}

//Update user account with newly added savings plan
const updateClientWithNewSavings = (id, data) => {
    const token = getToken();
    return axios.put(`${API}clients/${id}`, data, {headers: {Authorization: `${BEARER} ${token}`}});
}

const getAccountDetails = () => {
    const userId  = getId()
    const token = getToken();
    return axios.get(`${API}accounts/${userId}`, {headers: {Authorization: `${BEARER} ${token}`}});
}

const createBeneficiary = (data) => {
    const token = getToken();
    return axios.post(`${API}beneficiaries`, data, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const createAccout = (data) => {
    const token = getToken();
    return axios.post(`${API}accounts`, data, {headers: {Authorization: `${BEARER} ${token}`}})
}

const functions = {
    applyForLoan,
    getClientUser,
    getBeneficiaries,
    createBeneficiary,
    updateClientBeneficiaryList,
    updateClientWithNewSavings,
    getAccountDetails,
    createAccout
}

export default functions;