import { QuizActionsTypes } from "./quiz.types";

export const actionSetQuizActive = (data) => ({
  type: QuizActionsTypes.REDUCER_SET_ACTIVE,
  payload: data,
});
export const actionSetQuizCategory = (data) => ({
  type: QuizActionsTypes.REDUCER_SET_CATEGORY,
  payload: data,
});
export const actionSetQuizQuestionNumber = (data) => ({
  type: QuizActionsTypes.REDUCER_SET_QUESTION_NUMBER,
  payload: data,
});
export const actionSetQuizDifficulty = (data) => ({
  type: QuizActionsTypes.REDUCER_SET_DIFFICULTY,
  payload: data,
});
export const actionSetQuizPromotion = (data) => ({
  type: QuizActionsTypes.REDUCER_SET_PROMOTION,
  payload: data,
});
export const actionSetQuizQuestionDatas = (data) => ({
  type: QuizActionsTypes.REDUCER_SET_QUESTION_DATAS,
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

export const actionResetQuiz = () => ({
  type: QuizActionsTypes.REDUCER_RESET_QUIZ,
});
export const actionSetQuizError = (data) => ({
  type: QuizActionsTypes.REDUCER_SET_QUIZ_ERROR,
  payload: data,
});

export const actionFetchNewQuestion = (data) => ({
  type: QuizActionsTypes.SAGA_FETCH_NEW_QUESTION,
  payload: data,
});
export const actionCheckAnswer = (data) => ({
  type: QuizActionsTypes.SAGA_CHECK_ANSWER,
  payload: data,
});
export const actionRightAnswerActions = () => ({
  type: QuizActionsTypes.SAGA_RIGHT_ANSWERS_ACTIONS,
});
export const actionWrongAnswerActions = () => ({
  type: QuizActionsTypes.SAGA_WRONG_ANSWERS_ACTIONS,
});

export const actionGetCurrentOptions = (data) => ({
  type: QuizActionsTypes.SAGA_GET_CURRENT_OPTIONS,
  payload: data,
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
