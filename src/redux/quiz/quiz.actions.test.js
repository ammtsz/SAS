import { QuizActionsTypes } from "./quiz.types";

import {
  actionSetQuizActive,
  actionSetQuizLoading,
  actionSetQuizCategory,
  actionSetQuizDifficulty,
  actionSetQuizQuestionNumber,
  actionSetQuizPromotion,
  actionSetQuizCurrentQuestion,
  actionSetQuizCurrentOptions,
  actionSetQuizToken,
  actionSetQuizQuestionsAnswered,
  actionSetQuizError,
  actionResetQuiz,
  actionGetNewQuestion,
  actionCheckAnswer,
  actionUpdateQuizReport,
  actionUpdateQuizResumeReport,
  actionGoToNextQuestion,
  actionFinishQuiz,
  actionResumeQuiz,
} from "./quiz.actions";

describe("quiz.actions", () => {
  describe("reducers actions", () => {
    it("should create the 'actionSetQuizActive' action", () => {
      const mockActive = true;

      const action = actionSetQuizActive(mockActive);

      expect(action.type).toEqual(QuizActionsTypes.REDUCER_SET_ACTIVE);
      expect(action.payload).toEqual(mockActive);
    });

    it("should create the 'actionSetQuizLoading' action", () => {
      const mockLoading = true;

      const action = actionSetQuizLoading(mockLoading);

      expect(action.type).toEqual(QuizActionsTypes.REDUCER_SET_LOADING);
      expect(action.payload).toEqual(mockLoading);
    });

    it("should create the 'actionSetQuizCategory' action", () => {
      const mockCategory = { id: 1, name: "Mythology" };

      const action = actionSetQuizCategory(mockCategory);

      expect(action.type).toEqual(QuizActionsTypes.REDUCER_SET_CATEGORY);
      expect(action.payload).toEqual(mockCategory);
    });

    it("should create the 'actionSetQuizDifficulty' action", () => {
      const mockQuizDifficulty = "hard";

      const action = actionSetQuizDifficulty(mockQuizDifficulty);

      expect(action.type).toEqual(QuizActionsTypes.REDUCER_SET_DIFFICULTY);
      expect(action.payload).toEqual(mockQuizDifficulty);
    });

    it("should create the 'actionSetQuizQuestionNumber' action", () => {
      const mockQuestionNumber = 4;

      const action = actionSetQuizQuestionNumber(mockQuestionNumber);

      expect(action.type).toEqual(QuizActionsTypes.REDUCER_SET_QUESTION_NUMBER);
      expect(action.payload).toEqual(mockQuestionNumber);
    });

    it("should create the 'actionSetQuizPromotion' action", () => {
      const mockPromotion = 2;

      const action = actionSetQuizPromotion(mockPromotion);

      expect(action.type).toEqual(QuizActionsTypes.REDUCER_SET_PROMOTION);
      expect(action.payload).toEqual(mockPromotion);
    });

    it("should create the 'actionSetQuizCurrentQuestion' action", () => {
      const mockCurrentQuestion = {
        category: "Politics",
        correct_answer: "True Conservative Radio",
        difficulty: "medium",
        incorrect_answers: [
          "True Republican Radio",
          "Texan Capitalist Radio",
          "United Capitalists",
        ],
        question:
          "Before 2011, &quot;True Capitalist Radio&quot; was known by a different name. What was that name?",
        type: "multiple",
      };

      const action = actionSetQuizCurrentQuestion(mockCurrentQuestion);

      expect(action.type).toEqual(
        QuizActionsTypes.REDUCER_SET_CURRENT_QUESTION
      );
      expect(action.payload).toEqual(mockCurrentQuestion);
    });

    it("should create the 'actionSetQuizCurrentOptions' action", () => {
      const mockCurrentOptions = [
        { id: 0, option: "True Conservative Radio" },
        { id: 1, option: "True Republican Radio" },
        { id: 2, option: "Texan Capitalist Radio" },
        { id: 3, option: "United Capitalists" },
      ];

      const action = actionSetQuizCurrentOptions(mockCurrentOptions);

      expect(action.type).toEqual(QuizActionsTypes.REDUCER_SET_CURRENT_OPTIONS);
      expect(action.payload).toEqual(mockCurrentOptions);
    });

    it("should create the 'actionSetQuizQuestionsAnswered' action", () => {
      const mockQuestionsAnswered = [];

      const action = actionSetQuizQuestionsAnswered(mockQuestionsAnswered);

      expect(action.type).toEqual(QuizActionsTypes.REDUCER_SET_QUESTIONS_ANSWERED);
      expect(action.payload).toEqual(mockQuestionsAnswered);
    });

    it("should create the 'actionSetQuizError' action", () => {
      const mockError = "error";

      const action = actionSetQuizError(mockError);

      expect(action.type).toEqual(QuizActionsTypes.REDUCER_SET_QUIZ_ERROR);
      expect(action.payload).toEqual(mockError);
    });

    it("should create the 'actionResetQuiz' action", () => {
      expect(actionResetQuiz().type).toEqual(
        QuizActionsTypes.REDUCER_RESET_QUIZ
      );
    });
  });

  describe("sagas actions", () => {
    it("should create the 'actionGetNewQuestion' action", () => {
      const mockDatas = { difficulty: "medium", category: 27 };

      const action = actionGetNewQuestion(mockDatas);

      expect(action.type).toEqual(QuizActionsTypes.SAGA_GET_NEW_QUESTION);
      expect(action.payload).toEqual(mockDatas);
    });

    it("should create the 'actionCheckAnswer' action", () => {
      const mockSelectedOption = "0";

      const action = actionCheckAnswer(mockSelectedOption);

      expect(action.type).toEqual(QuizActionsTypes.SAGA_CHECK_ANSWER);
      expect(action.payload).toEqual(mockSelectedOption);
    });

    it("should create the 'actionUpdateQuizReport' action", () => {
      expect(actionUpdateQuizReport().type).toEqual(
        QuizActionsTypes.SAGA_UPDATE_QUIZ_REPORT
      );
    });

    it("should create the 'actionUpdateQuizResumeReport' action", () => {
      expect(actionUpdateQuizResumeReport().type).toEqual(
        QuizActionsTypes.SAGA_UPDATE_QUIZ_RESUME_REPORT
      );
    });

    it("should create the 'actionGoToNextQuestion' action", () => {
      expect(actionGoToNextQuestion().type).toEqual(
        QuizActionsTypes.SAGA_GO_TO_NEXT_QUESTION
      );
    });

    it("should create the 'actionFinishQuiz' action", () => {
      expect(actionFinishQuiz().type).toEqual(
        QuizActionsTypes.SAGA_FINISH_QUIZ
      );
    });

    it("should create the 'actionResumeQuiz' action", () => {
      const mockCategory = { id: 1, name: "Mythology", completed: 9 };

      const action = actionResumeQuiz(mockCategory);

      expect(action.type).toEqual(QuizActionsTypes.SAGA_RESUME_QUIZ);
      expect(action.payload).toEqual(mockCategory);
    });
  });
});
