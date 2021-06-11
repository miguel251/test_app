import { fork, all } from "@redux-saga/core/effects";
import { watchSignin } from "./auth";

export default function* rootSaga(){
    yield all([
        //AUTH
        fork(watchSignin),
    ]);
}