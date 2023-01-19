import {authHeaders} from "./auth-headers.service";
import { API } from "../Environment/constant";
import axios from 'axios';

const getActive = () => {
    return axios.get(`${API}auth/clients`, {headers: authHeaders()}) 
}

const getDeactive = () => {
    return axios.get(`${API}auth/clients`, {headers: authHeaders()}) 
}

const functions = {
    getActive,
    getDeactive
}

export default functions;