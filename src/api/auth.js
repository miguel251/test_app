import { getApi } from "./base";

export async function longinApi(username, password){
    return await getApi('/auth/login', { username, password}); 
}