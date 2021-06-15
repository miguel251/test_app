import { GET_WITHDRAW, GET_WITHDRAW_FAILED, GET_WITHDRAW_SUCCESS } from "../type";

const INITIALSTATE = {
    loading: false,
    withdraws: null,
    resultWithdraws: null,
    message: null,
}

export default (state = INITIALSTATE, action) => {
    switch (action.type) {
        case GET_WITHDRAW:
            return { ...state, loading: true, message:'' };
        case GET_WITHDRAW_SUCCESS:
            const { entities, result } = action.data;
            return { ...state, loading: false, withdraws: entities.withdraw, resultWithdraws: result, message: '' };

        case GET_WITHDRAW_FAILED:
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