import { getSwapApi } from "../../api/swap";
import { GET_SWAP, GET_SWAP_FAILED, GET_SWAP_SUCCESS } from "../type";
import { put, takeLatest } from '@redux-saga/core/effects';
import { normalize, schema } from 'normalizr';
import _ from 'lodash';

function* getSwap(){
    try {
        const result = yield getSwapApi();
        if(result && result.data){
            if(result.data.swaps){
                const data = _.orderBy(result.data.swaps, ['updated_at'], ['desc']);

                const swapSchema = new schema.Entity('swap');

                const swapListSchema = [swapSchema];
                
                const normalizedData = normalize([...data], swapListSchema);

                yield put({type: GET_SWAP_SUCCESS, data: normalizedData })
            } else {
                yield put({ type: GET_SWAP_FAILED, errors:[] });
            }
        }else {
            if(result && result.errors){
                yield put({ type: GET_SWAP_FAILED, errors: result.errors });
            }else{
                yield put({ type: GET_SWAP_FAILED, errors:[] });
            }
        }
    } catch (error) {
        yield put({ type: GET_SWAP_FAILED, errors:[error] });
    }
}

export function* watchSwap(){
    yield takeLatest(GET_SWAP, getSwap);
}