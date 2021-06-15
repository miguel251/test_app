import { GET_DEPOSIT, GET_DEPOSIT_FAILED, GET_DEPOSIT_SUCCESS } from "../type";

const INITIALSTATE = {
    loading: false,
    deposits: null,
    result: null,
    message: null,
}

export default (state = INITIALSTATE, action) => {
    switch (action.type) {
        case GET_DEPOSIT:
            return { ...state, loading: true, message:'' };

        case GET_DEPOSIT_SUCCESS:
            const { entities, result } = action.data;
            return { ...state, loading: false, deposits: entities.deposit, result, message:''};

        case GET_DEPOSIT_FAILED:
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