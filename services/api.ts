import axios from "axios";
import {APP_BASE_URL} from "../config";

export const LOAD_USERS = (payload: {}) =>
    new Promise((resolve, reject) => {
        const params = payload || {}
        // @ts-ignore
        axios.get(`${APP_BASE_URL}/users`, {params})
            .then(response => resolve(response))
            .catch(err => reject(err));
    });
export const LOAD_USER = (id: Number) =>
    new Promise((resolve, reject) => {
        axios.get(`${APP_BASE_URL}/users/${id}`)
            .then(response => resolve(response))
            .catch(err => reject(err));
    });
export const LOAD_POSTS = (payload: {}) =>
    new Promise((resolve, reject) => {
        const params = payload || {}
        // @ts-ignore
        axios.get(`${APP_BASE_URL}/posts`, {params})
            .then(response => resolve(response))
            .catch(err => reject(err));
    });
export const LOAD_POST = (id: Number) =>
    new Promise((resolve, reject) => {
        axios.get(`${APP_BASE_URL}/posts/${id}`)
            .then(response => resolve(response))
            .catch(err => reject(err));
    });