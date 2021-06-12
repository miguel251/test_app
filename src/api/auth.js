import { postApi } from "./base";

export async function longinApi(username, password){
    return await postApi('auth/login', { username, password}); 
}