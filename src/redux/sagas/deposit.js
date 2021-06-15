import { put, takeLatest } from '@redux-saga/core/effects';
import { normalize, schema } from 'normalizr';
import { getDepositApi } from '../../api/deposit';
import { GET_DEPOSIT, GET_DEPOSIT_FAILED, GET_DEPOSIT_SUCCESS } from '../type';
import _ from 'lodash';

function* getDeposit(){
    try {
        const result = yield getDepositApi();
        if(result && result.data){
            if(result.data.deposits){
                const data = _.orderBy(result.data.deposits, ['updated_at'], ['desc']);

                const userSchema = new schema.Entity('deposit');

                const userListSchema = [userSchema];
                
                const normalizedData = normalize([...data], userListSchema);

                yield put({type: GET_DEPOSIT_SUCCESS, data: normalizedData })
            } else {
                yield put({ type: GET_DEPOSIT_FAILED, errors:[] });
            }
        }else {
            if(result && result.errors){
                yield put({ type: GET_DEPOSIT_FAILED, errors: result.errors });
            }else{
                yield put({ type: GET_DEPOSIT_FAILED, errors:[] });
            }
        }
    } catch (error) {
        yield put({ type: GET_DEPOSIT_FAILED, errors:[error] });
    }
}

export function* watchDepposit(){
    yield takeLatest(GET_DEPOSIT, getDeposit);
}