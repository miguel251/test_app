import { AUTH_LOGIN, AUTH_LOGIN_FAILED, AUTH_LOGIN_SUCCESS } from "../type";


const INITIALSTATE = {
    loading: false,
    loggedin:false,
    token: null,
    me: null,
    message: null
};

export default (state = INITIALSTATE, action) => {
    switch(action.type) {
        
        case AUTH_LOGIN:
            return { ...state, loading: true, message:null };

        case AUTH_LOGIN_SUCCESS:
            const { user, token } = action.data;
            return { ...state, loading: false, token, me: user, message:null };
        
        case AUTH_LOGIN_FAILED:
            const { errors } = action;
            let messages = [];
            for (var i=0; i<errors.length; i++) {
                messages.push(errors[i].message);
            }
            if (messages.length === 0) {
                messages.push('Unkown error');
            }
            return { ...state, loading: false, messages: messages };

        default:
            return state;
    }
}