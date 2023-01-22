import { API, BEARER } from "../Environment/constant";
import axios from 'axios';

const getLoan = (token) => {
    return axios.get('http://localhost:1337/api/accounts?populate=*', {headers: {Authorization: `${BEARER} ${token}`}}) 
}



const functions = {
    getLoan
}

export default functions;