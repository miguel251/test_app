import { getApi } from "./base";

export async function getDepositApi(){
    return await getApi('deposit');
}