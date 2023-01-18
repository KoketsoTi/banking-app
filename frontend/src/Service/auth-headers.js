import {BEARER} from '../Environment/constant';
import {getToken}from '../helpers/helpers';

export default function authHeaders(){
    const authToken = getToken();

    let config = {
        headers :{
            Authorization: `${BEARER} ${authToken}`
        }
    }
    return config
}