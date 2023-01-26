import { AUTH_TOKEN, ID,FIRSTNAME, EMAIL, LASTNAME, PHONENUMBER } from "../Environment/constant";
import jwt_decode from 'jwt-decode';

export const getToken = () => {
    return localStorage.getItem(AUTH_TOKEN);
};

export const getId = () => {
    return localStorage.getItem(ID);
};

export const getUser = () => {
    const user =[
        localStorage.getItem(EMAIL),
        localStorage.getItem(FIRSTNAME),
        localStorage.getItem(LASTNAME),
        localStorage.getItem(PHONENUMBER),
    ]
    return user;
};
    
export const setToken = (token) => {
    if (token) {
        localStorage.setItem(AUTH_TOKEN, token);
    }
};

export const setData = (data) => {
    localStorage.setItem(EMAIL, data.email);
    localStorage.setItem(FIRSTNAME, data.firstname);
    localStorage.setItem(LASTNAME, data.lastname);
    localStorage.setItem(PHONENUMBER, data.contact);
}
    
export const removeToken = () => {
    localStorage.clear();
};

export const decodedToken = (token) =>{
    const decoded = jwt_decode(token);
    const id = decoded.id;
    return id;
}