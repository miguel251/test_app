import { AUTH_LOGIN } from "../type"


export const authLogin = (loginData) => {
    return {
        type: AUTH_LOGIN,
        data:loginData,
    }
};