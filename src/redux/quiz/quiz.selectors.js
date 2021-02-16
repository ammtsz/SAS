import { createSelector } from "reselect";

const selectQuiz = (state) => state.quiz;

export const selectQuizActive = createSelector(
  [selectQuiz],
  (quiz) => quiz.active
);
export const selectQuizLoading = createSelector(
  [selectQuiz],
  (quiz) => quiz.loading
);
export const selectQuizCategory = createSelector(
  [selectQuiz],
  (quiz) => quiz.category
);
export const selectQuizDifficulty = createSelector(
  [selectQuiz],
  (quiz) => quiz.difficulty
);
export const selectQuizQuestionNumber = createSelector(
  [selectQuiz],
  (quiz) => quiz.questionNumber
);
export const selectQuizPromotion = createSelector(
  [selectQuiz],
  (quiz) => quiz.promotion
);
export const selectQuizCurrentQuestion = createSelector(
  [selectQuiz],
  (quiz) => quiz.currentQuestion
);
export const selectQuizCurrentOptions = createSelector(
  [selectQuiz],
  (quiz) => quiz.currentOptions
);
export const selectQuizToken = createSelector(
  [selectQuiz],
  (quiz) => quiz.token
);
export const selectQuizQuestionsDatas = createSelector(
  [selectQuiz],
  (quiz) => quiz.questionsDatas
);
