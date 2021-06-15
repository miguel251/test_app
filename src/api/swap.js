import { getApi } from "./base";

export async function getSwapApi(){
    return await getApi('swap');
}