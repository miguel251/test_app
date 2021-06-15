import { GET_SWAP, GET_SWAP_FAILED, GET_SWAP_SUCCESS } from "../type";

const INITIALSTATE = {
    loading: false,
    swaps: null,
    resultSwaps: null,
    message: null,
}

export default (state = INITIALSTATE, action) => {
    switch (action.type) {
        case GET_SWAP:
            return { ...state, loading: true, message:'' };
        case GET_SWAP_SUCCESS:
            const { entities, result } = action.data;
            return { ...state, loading: false, swaps: entities.swap, resultSwaps: result, message: '' };

        case GET_SWAP_FAILED:
            const { errors } = action;
            let message = [];
            for (let index = 0; index < errors.length; index++) {
                message.push(errors[index]);
            }

            if(message.length === 0 ){
                message.push('Uknow Error');
            }

            return { ...state, loading: false, message };
    
        default:
            return state;
    }
}