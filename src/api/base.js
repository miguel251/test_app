import axios from "axios";
import config from "../config";

let store;

function getHeader() {
    let state = store.getState();
    const { token } = state.auth;

    return {
        headers: {
            'Content-type' : 'application/json',
            'Authorization' : `Bearer ${token}` 
        }
    }
}

export async function getApi(url){
    try {
        let result = await axios.get(`${config.api_url}/${url}`, getHeader());
        result = result && result.data

        return result;

    } catch (error) {
        if(error.response){
            return error.response.data;
        }

        console.log(error);
        throw error;
    }
}