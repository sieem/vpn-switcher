import { writable } from "svelte/store";

export const loggedIn = writable(false);

export const saveToken = (token) => {
    localStorage.setItem('token', token);
    loggedIn.set(true);
};

export const removeToken = () => {
    localStorage.removeItem('token');
    loggedIn.set(false);
}

export const getToken = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        loggedIn.set(false);
    }

    return token;
};

export const setLoginState = () => loggedIn.set(!!localStorage.getItem('token'));
