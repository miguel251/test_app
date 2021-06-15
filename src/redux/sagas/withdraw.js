import { getWithdrawApi } from "../../api/withdraw";
import { GET_WITHDRAW, GET_WITHDRAW_FAILED, GET_WITHDRAW_SUCCESS } from "../type";
import { put, takeLatest } from '@redux-saga/core/effects';
import { normalize, schema } from 'normalizr';
import _ from 'lodash';

function* getWithdraw(){
    try {
        const result = yield getWithdrawApi();
        if(result && result.data){
            if(result.data.withdraws){
                const data = _.orderBy(result.data.withdraws, ['updated_at'], ['desc']);

                const withdrawSchema = new schema.Entity('withdraw');

                const withdrawListSchema = [withdrawSchema];
                
                const normalizedData = normalize([...data], withdrawListSchema);

                yield put({type: GET_WITHDRAW_SUCCESS, data: normalizedData })
            } else {
                yield put({ type: GET_WITHDRAW_FAILED, errors:[] });
            }
        }else {
            if(result && result.errors){
                yield put({ type: GET_WITHDRAW_FAILED, errors: result.errors });
            }else{
                yield put({ type: GET_WITHDRAW_FAILED, errors:[] });
            }
        }
    } catch (error) {
        yield put({ type: GET_WITHDRAW_FAILED, errors:[error] });
    }
}

export function* watchWithdraw(){
    yield takeLatest(GET_WITHDRAW, getWithdraw);
}