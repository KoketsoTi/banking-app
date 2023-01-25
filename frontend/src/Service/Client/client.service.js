import { API, BEARER } from "../../Environment/constant";
import { getToken } from "../../Helpers/helpers";
import axios from 'axios';

const getClientUser = () => {
    const token = getToken();
    return axios.get(`${API}users/me?populate=*`, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const getBeneficiaries = (id) => {
    const token = getToken();
    return axios.get(`${API}clients/${id}?populate=*`, {headers: {Authorization: `${BEARER} ${token}`}}) 
}

const updateClientBeneficiaryList = (id, data) => {
    const token = getToken();
    return axios.put(`${API}clients/${id}`, data, {headers: {Authorization: `${BEARER} ${token}`}});
}

const getAccountDetails = () => {
    const id  = localStorage.getItem(id);
    const token = getToken();
    return axios.put(`${API}accounts/${id}`, {headers: {Authorization: `${BEARER} ${token}`}});
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
    getClientUser,
    getBeneficiaries,
    createBeneficiary,
    updateClientBeneficiaryList,
    getAccountDetails,
    createAccout
}

export default functions;