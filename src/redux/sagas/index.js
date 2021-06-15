import { fork, all } from "@redux-saga/core/effects";
import { watchSignin } from "./auth";
import { watchDepposit } from "./deposit";
import { watchSwap } from "./swap";
import { watchWithdraw } from "./withdraw";

export default function* rootSaga(){
    yield all([
        //AUTH
        fork(watchSignin),
        
        //DEPOSIT
        fork(watchDepposit),

        //SWAP
        fork(watchSwap),

        //WITHDRAW
        fork(watchWithdraw),
    ]);
}