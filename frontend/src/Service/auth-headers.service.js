import { BEARER } from "../Environment/constant";
import { getToken } from "../helpers/helpers";

export const authHeaders = () =>{
    const token = getToken();
    let config = {headers: {Authorization: `${BEARER} ${token}`}}
    return config;
}