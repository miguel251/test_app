import { getApi } from "./base";

export async function getWithdrawApi(){
    return await getApi('withdraw');
}