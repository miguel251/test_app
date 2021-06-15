import { combineReducers } from "redux";
import auth from './auth';
import deposit from './deposit';
import swap from './swap';
import withdraw from './withdraw';

export default combineReducers({
    auth,
    deposit,
    swap,
    withdraw,
});