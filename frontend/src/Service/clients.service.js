
import {API} from '../Environment/constant';
import { Success, Warning } from '../helpers/toasters';
import authHeaders from './auth-headers';
import axios from 'axios';

export const getClients = (setdata) =>{
    const headers = authHeaders();
    
    return axios.get(`${API}clients`, headers).then((response) => {
        setdata(response.data.data);
        Success('data fetched successfully')
    }).catch((error) => {
        Warning('Something wrong with the server');
    })
}

