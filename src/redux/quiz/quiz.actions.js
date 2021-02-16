import { QuizActionsTypes } from "./quiz.types";

// REDUCERS
export const actionSetQuizActive = (data) => ({
  type: QuizActionsTypes.REDUCER_SET_ACTIVE,
  payload: data,
});
export const actionSetQuizLoading = (data) => ({
  type: QuizActionsTypes.REDUCER_SET_LOADING,
  payload: data,
});
export const actionSetQuizCategory = (data) => ({
  type: QuizActionsTypes.REDUCER_SET_CATEGORY,
  payload: data,
});
export const actionSetQuizDifficulty = (data) => ({
  type: QuizActionsTypes.REDUCER_SET_DIFFICULTY,
  payload: data,
});
export const actionSetQuizQuestionNumber = (data) => ({
  type: QuizActionsTypes.REDUCER_SET_QUESTION_NUMBER,
  payload: data,
});
export const actionSetQuizPromotion = (data) => ({
  type: QuizActionsTypes.REDUCER_SET_PROMOTION,
  payload: data,
});

export const actionSetQuizCurrentQuestion = (data) => ({
  type: QuizActionsTypes.REDUCER_SET_CURRENT_QUESTION,
  payload: data,
});
export const actionSetQuizCurrentOptions = (data) => ({
  type: QuizActionsTypes.REDUCER_SET_CURRENT_OPTIONS,
  payload: data,
});
export const actionSetQuizToken = (data) => ({
  type: QuizActionsTypes.REDUCER_SET_TOKEN,
  payload: data,
});
export const actionSetQuizQuestionsDatas = (data) => ({
  type: QuizActionsTypes.REDUCER_SET_QUESTIONS_DATAS,
  payload: data,
});
export const actionSetQuizError = (data) => ({
  type: QuizActionsTypes.REDUCER_SET_QUIZ_ERROR,
  payload: data,
});

export const actionResetQuiz = () => ({
  type: QuizActionsTypes.REDUCER_RESET_QUIZ,
});


// SAGAS
export const actionGetNewQuestion = (data) => ({
  type: QuizActionsTypes.SAGA_GET_NEW_QUESTION,
  payload: data,
});
export const actionCheckAnswer = (data) => ({
  type: QuizActionsTypes.SAGA_CHECK_ANSWER,
  payload: data,
});
export const actionUpdateQuizReport = () => ({
  type: QuizActionsTypes.SAGA_UPDATE_QUIZ_REPORT,
});
export const actionUpdateQuizResumeReport = () => ({
  type: QuizActionsTypes.SAGA_UPDATE_QUIZ_RESUME_REPORT,
});
export const actionGoToNextQuestion = (data) => ({
  type: QuizActionsTypes.SAGA_GO_TO_NEXT_QUESTION,
  payload: data,
});
export const actionFinishQuiz = (data) => ({
  type: QuizActionsTypes.SAGA_FINISH_QUIZ,
  payload: data,
});
export const actionResumeQuiz = (data) => ({
  type: QuizActionsTypes.SAGA_RESUME_QUIZ,
  payload: data,
});
