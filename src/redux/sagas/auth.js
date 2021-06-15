import { put, takeLatest } from 'redux-saga/effects';
import { longinApi } from '../../api/auth';
import { AUTH_LOGIN, AUTH_LOGIN_FAILED, AUTH_LOGIN_SUCCESS } from '../type';

function* login(payload){
    const { username, password } = payload.data;

    try {
        const result = yield longinApi(username, password);
        if(result && result.data){
            if(result.data.user){
                yield put({ type: AUTH_LOGIN_SUCCESS, data: result.data });
            } else {
                yield put({ type: AUTH_LOGIN_FAILED, errors:[] });
            } 
        } else {
            if(result && result.errors){
                yield put({ type: AUTH_LOGIN_FAILED, errors: result.errors });
            } else {
                yield put({ type: AUTH_LOGIN_FAILED, errors:[] });  
            }
        }
    } catch (error) {
        yield put({ type: AUTH_LOGIN_FAILED, errors: [error] });
    }
}

export function* watchSignin() {
    yield takeLatest(AUTH_LOGIN, login);
}