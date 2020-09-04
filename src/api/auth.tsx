import { API_HOST, TOKEN } from '../utils/constants';
import { IRegistroUsuario } from '../models/registroUsuario';
import { ILoginUsuario } from '../models/loginUsuario';
import jwtDecode from 'jwt-decode';

export async function registrarApi(user: IRegistroUsuario){
    const userTemp = {
        ...user,
        email: user.email.toLowerCase(),
        birthday: new Date()
    };
    delete userTemp.repeatPassword
    const url = `${API_HOST}/user/register`
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userTemp)
    }
    try {
        const response = await fetch(url, params);
        return response.json();
    }
    catch (error) {
        return error;
    }
}

export async function loginApi(user: ILoginUsuario){
    const userTemp = {
        ...user,
        email: user.email.toLowerCase(),
    };
    const url = `${API_HOST}/auth/login`
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userTemp)
    }
    try {
        const response = await fetch(url, params);
        return response.json();
    } catch (error) {
        return error;
    }
}

export function setTokenApi(token: string){
    localStorage.setItem(TOKEN, token);
}

export function getTokenApi(){
    return localStorage.getItem(TOKEN);
}

export function logoutApi(){
    localStorage.removeItem(TOKEN);
}

export function isExpired(token: string){
    const { exp } = jwtDecode(token);
    const expire = exp * 1000;
    const timeOut = expire - Date.now();
    if (timeOut < 0){
        //token expirado
        return true;
    }
    return false;

}

export function isUserLoggedApi(): any{
    const token = getTokenApi();

    //Token existe?
    if (!token) {
        logoutApi();
        return null
    }

    //Token caducado?
    if(isExpired(token)){
        logoutApi();
        return
    }
    return jwtDecode(token);
}