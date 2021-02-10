import { call, all } from "redux-saga/effects";
import { userSagas } from "./user/user.sagas";
// import { quizSagas } from "./quiz/quiz.sagas";

export default function* rootSaga() {
  yield all([
    call(userSagas),
    // call(quizSagas),
  ]);
}
