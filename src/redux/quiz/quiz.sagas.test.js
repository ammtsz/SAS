import { call, takeLatest, put, select } from "redux-saga/effects";
import { rsf } from "../../firebase/firebase.utils";
import {
  actionSetQuizDifficulty,
  actionSetQuizPromotion,
  actionSetQuizCurrentQuestion,
  actionResetQuiz,
  actionSetQuizActive,
  actionSetQuizCategory,
  actionSetQuizLoading,
  actionSetQuizQuestionNumber,
} from "./quiz.actions";
import { QuizActionsTypes } from "./quiz.types";
import {
  selectQuizCurrentQuestion,
  selectQuizDifficulty,
  selectQuizPromotion,
  selectQuizQuestionNumber,
  selectQuizCategory,
  selectQuizQuestionsAnswered,
} from "./quiz.selectors";
import { selectCategoriesReports } from "../categories/categories.selectors";
import { selectUserDatas } from "../user/user.selectors";

import {
  getQuestion,
  saveCurrentQuestion,
  getCurrentOptions,
  rightAnswerActions,
  increaseDifficulty,
  wrongAnswerActions,
  decreaseDifficulty,
  getReportDatas,
  updateReportOnDB,
  getUserDatasFromFirebase,
  startQuiz,
  getNewQuestion,
  checkAnswer,
  updateQuizReport,
  updateQuizResumeReport,
  goToNextQuestion,
  finishQuiz,
  resumeQuiz,
  onStartQuiz,
  onCheckAnswer,
  onUpdateQuizReport,
  onUpdateQuizResumeReport,
  onGoToNextQuestion,
  onFinishQuiz,
  onResumeQuiz,
} from "./quiz.sagas";

describe("quiz.sagas", () => {
  describe("calls", () => {
    it("should trigger on SAGA_START_QUIZ 'onStartQuiz'", () => {
      const gen = onStartQuiz();
      expect(gen.next().value).toEqual(
        takeLatest(QuizActionsTypes.SAGA_START_QUIZ, startQuiz)
      );
    });

    it("should trigger on SAGA_CHECK_ANSWER 'onCheckAnswer'", () => {
      const gen = onCheckAnswer();
      expect(gen.next().value).toEqual(
        takeLatest(QuizActionsTypes.SAGA_CHECK_ANSWER, checkAnswer)
      );
    });

    it("should trigger on SAGA_UPDATE_QUIZ_REPORT 'onUpdateQuizReport'", () => {
      const gen = onUpdateQuizReport();
      expect(gen.next().value).toEqual(
        takeLatest(QuizActionsTypes.SAGA_UPDATE_QUIZ_REPORT, updateQuizReport)
      );
    });

    it("should trigger on SAGA_UPDATE_QUIZ_RESUME_REPORT 'onUpdateQuizResumeReport'", () => {
      const gen = onUpdateQuizResumeReport();
      expect(gen.next().value).toEqual(
        takeLatest(
          QuizActionsTypes.SAGA_UPDATE_QUIZ_RESUME_REPORT,
          updateQuizResumeReport
        )
      );
    });

    it("should trigger on SAGA_GO_TO_NEXT_QUESTION 'onGoToNextQuestion'", () => {
      const gen = onGoToNextQuestion();
      expect(gen.next().value).toEqual(
        takeLatest(QuizActionsTypes.SAGA_GO_TO_NEXT_QUESTION, goToNextQuestion)
      );
    });

    it("should trigger on SAGA_FINISH_QUIZ 'onFinishQuiz'", () => {
      const gen = onFinishQuiz();
      expect(gen.next().value).toEqual(
        takeLatest(QuizActionsTypes.SAGA_FINISH_QUIZ, finishQuiz)
      );
    });

    it("should trigger on SAGA_RESUME_QUIZ 'onResumeQuiz'", () => {
      const gen = onResumeQuiz();
      expect(gen.next().value).toEqual(
        takeLatest(QuizActionsTypes.SAGA_RESUME_QUIZ, resumeQuiz)
      );
    });
  });

  // CALLED
  describe("'getNewQuestion", () => {
    const mockDifficulty = "hard";
    const mockCategoryId = 1;

    const gen = getNewQuestion(mockDifficulty, mockCategoryId);

    it("should call 'actionSetQuizLoading' (true)", () => {
      const mockLoading = true;
      expect(gen.next(mockLoading).value).toEqual(
        put(actionSetQuizLoading(mockLoading))
      );
    });

    it("should call 'getQuestion'", () => {
      expect(gen.next(mockDifficulty, mockCategoryId).value).toEqual(
        getQuestion(mockDifficulty, mockCategoryId)
      );
    });

    it("should call 'saveCurrentQuestion'", () => {
      const mockFetchedQuestion = {};
      expect(gen.next(mockFetchedQuestion).value).toEqual(
        saveCurrentQuestion(mockFetchedQuestion)
      );
    });

    it("should call 'getCurrentOptions'", () => {
      const mockFetchedQuestion = {};
      expect(gen.next(mockFetchedQuestion).value).toEqual(
        getCurrentOptions(mockFetchedQuestion)
      );
    });

    it("should call 'actionSetQuizLoading' (false)", () => {
      const mockLoading = false;
      expect(gen.next(mockLoading).value).toEqual(
        put(actionSetQuizLoading(mockLoading))
      );
    });
  });

  describe("'checkAnswer", () => {
    it("should call 'rightAnswerActions' if selectedOption === 0", () => {
      const mockSelectedOption = { payload: "0" };
      const gen = checkAnswer(mockSelectedOption);
      expect(gen.next(mockSelectedOption).value).toEqual(rightAnswerActions());
    });

    it("should call 'wrongAnswerActions' if selectedOption !== 0", () => {
      const mockSelectedOption = { payload: "1" };
      const gen = checkAnswer(mockSelectedOption);
      expect(gen.next(mockSelectedOption).value).toEqual(wrongAnswerActions());
    });
  });

  describe("'updateQuizReport", () => {
    const gen = updateQuizReport();

    it("should get quiz datas", () => {
      expect(gen.next().value).toEqual(select(selectQuizQuestionNumber));
      expect(gen.next().value).toEqual(select(selectQuizDifficulty));
      expect(gen.next().value).toEqual(select(selectQuizCategory));
      expect(gen.next().value).toEqual(select(selectCategoriesReports));
      expect(gen.next().value).toEqual(select(selectQuizQuestionsAnswered));
      expect(gen.next().value).toEqual(select(selectQuizPromotion));
    });

    it("should call 'getReportDatas'", () => {
      expect(gen.next().value).toEqual(getReportDatas());
    });

    // it("should call 'actionSetCategoriesReport'", () => {
    //   const mockNewReport = { 1: { category_name: "Books" } };
    //   expect(gen.next(mockNewReport).value).toEqual(
    //     put(actionSetCategoriesReport(mockNewReport))
    //   );
    //   expect(gen.next().value).toEqual(updateReportOnDB(mockNewReport));
    // });

    // it("should call 'updateReportOnDB'", () => {
    // });

    // it("should call 'actionSetQuizQuestionNumber'", () => {
    //   const mockQuizQuestionNumber = 1;
    //   expect(gen.next(mockQuizQuestionNumber).value).toEqual(
    //     put(actionSetQuizQuestionNumber(mockQuizQuestionNumber + 1))
    //   );
    // });
  });

  describe("'updateQuizResumeReport", () => {
    const gen = updateQuizResumeReport();

    it("should get quiz datas", () => {
      expect(gen.next().value).toEqual(select(selectQuizQuestionNumber));
      expect(gen.next().value).toEqual(select(selectQuizDifficulty));
      expect(gen.next().value).toEqual(select(selectQuizCategory));
      expect(gen.next().value).toEqual(select(selectCategoriesReports));
      expect(gen.next().value).toEqual(select(selectQuizPromotion));
      expect(gen.next().value).toEqual(select(selectQuizCurrentQuestion));
    });
  });

  describe("'goToNextQuestion", () => {
    const gen = goToNextQuestion();
    it("should get 'selectQuizQuestionNumber', 'selectQuizDifficulty' and 'selectQuizCategory'", () => {
      expect(gen.next().value).toEqual(select(selectQuizQuestionNumber));
      expect(gen.next().value).toEqual(select(selectQuizDifficulty));
      expect(gen.next().value).toEqual(select(selectQuizCategory));
    });

    it("should call 'getNewQuestion'", () => {
      const mockDifficulty = "medium";
      const mockCategory = { id: 5, name: "Music" };
      const args = (mockDifficulty, mockCategory.id)

      expect(gen.next(args).value).toEqual(
        getNewQuestion(args)
      );
    });

    it("should call 'actionSetQuizQuestionNumber'", () => {
      gen.next()
      // const mockQuestionNumber = 5;
      // const args = mockQuestionNumber + 1

      // expect(gen.next(args).value).toEqual(
      //   put(actionSetQuizQuestionNumber(args))
      // );
    });

    it("should call 'updateQuizResumeReport'", () => {
      expect(gen.next().value).toEqual(updateQuizResumeReport());
    });
  });

  describe("'finishQuiz", () => {
    it("should call 'actionResetQuiz'", () => {
      const gen = finishQuiz();
      expect(gen.next().value).toEqual(put(actionResetQuiz()));
    });
  });

  describe("'resumeQuiz'", () => {
    const mockCategory = { payload: { id: 1, name: "Books", completed: 2 } };
    const gen = resumeQuiz(mockCategory);

    it("should get 'selectCategoriesReports'", () => {
      expect(gen.next().value).toEqual(select(selectCategoriesReports));
    });

    it("should call 'actionSetQuizActive'", () => {
      const mockActive = true;
      expect(gen.next(mockActive).value).toEqual(
        put(actionSetQuizActive(mockActive))
      );
    });

    it("should call 'actionSetQuizCategory'", () => {
      expect(gen.next(mockCategory).value).toEqual(
        put(actionSetQuizCategory(mockCategory.payload))
      );
    });
  });

  // UTILS
  describe("getQuestion", () => {
    const mockDifficulty = "hard";
    const mockCategory = 20;
    const gen = getQuestion(mockDifficulty, mockCategory);

    it("should get 'selectCategoriesReports'", () => {
      expect(gen.next().value).toEqual(select(selectCategoriesReports));
    });
  });

  describe("saveCurrentQuestion", () => {
    const mockFetchedQuestion = {};
    const gen = saveCurrentQuestion(mockFetchedQuestion);

    it("should call 'actionSetQuizCurrentQuestion'", () => {
      expect(gen.next(mockFetchedQuestion).value).toEqual(
        put(actionSetQuizCurrentQuestion(mockFetchedQuestion))
      );
    });
  });

  describe("getCurrentOptions", () => {
    const gen = getCurrentOptions();

    it("should get 'selectQuizCurrentQuestion'", () => {
      expect(gen.next().value).toEqual(select(selectQuizCurrentQuestion));
    });
  });

  describe("rightAnswerActions", () => {
    const gen = rightAnswerActions();

    it("should get 'selectQuizPromotion'", () => {
      expect(gen.next().value).toEqual(select(selectQuizPromotion));
    });

    it("should call 'increaseDifficulty' when quizPromotion === 2", () => {
      const mockQuizPromotion = "2";
      expect(gen.next(mockQuizPromotion).value).toEqual(increaseDifficulty());
    });

    it("should call 'actionSetQuizPromotion('1') when quizPromotion === 2", () => {
      const mockQuizPromotion = "2";
      expect(gen.next(mockQuizPromotion).value).toEqual(
        put(actionSetQuizPromotion("1"))
      );
    });
  });

  describe("increaseDifficulty", () => {
    const gen = increaseDifficulty();

    it("should get 'selectQuizDifficulty'", () => {
      expect(gen.next().value).toEqual(select(selectQuizDifficulty));
    });

    it("should call actionSetQuizDifficulty with quizDifficulty", () => {
      const mockQuizDifficulty = "medium";
      expect(gen.next(mockQuizDifficulty).value).toEqual(
        put(actionSetQuizDifficulty("hard"))
      );
    });
  });

  describe("wrongAnswerActions", () => {
    const gen = wrongAnswerActions();

    it("should get 'selectQuizPromotion'", () => {
      expect(gen.next().value).toEqual(select(selectQuizPromotion));
    });

    it("should call 'decreaseDifficulty' when quizPromotion === 0", () => {
      const mockQuizPromotion = "0";
      expect(gen.next(mockQuizPromotion).value).toEqual(decreaseDifficulty());
    });

    it("should call 'actionSetQuizPromotion('1') when quizPromotion === 0", () => {
      const mockQuizPromotion = "0";
      expect(gen.next(mockQuizPromotion).value).toEqual(
        put(actionSetQuizPromotion("1"))
      );
    });
  });

  describe("decreaseDifficulty", () => {
    const gen = decreaseDifficulty();

    it("should get 'selectQuizDifficulty'", () => {
      expect(gen.next().value).toEqual(select(selectQuizDifficulty));
    });

    it("should call actionSetQuizDifficulty with quizDifficulty", () => {
      const mockQuizDifficulty = "medium";
      expect(gen.next(mockQuizDifficulty).value).toEqual(
        put(actionSetQuizDifficulty("easy"))
      );
    });
  });

  describe("updateReportOnDB", () => {
    const mockReport = {};
    const gen = updateReportOnDB(mockReport);

    it("should get 'selectUserDatas'", () => {
      expect(gen.next().value).toEqual(select(selectUserDatas));
    });

    it("should get userDatas from firestore when userDatasState !== null", () => {
      const mockuserDatasState = { id: "123" };
      expect(gen.next(mockuserDatasState).value).toEqual(
        getUserDatasFromFirebase(mockuserDatasState.id)
      );
    });
  });

  describe("getUserDatasFromFirebase", () => {
    const mockId = "123";
    const gen = getUserDatasFromFirebase(mockId);

    it("should get userDatas from firebase", () => {
      expect(gen.next(mockId).value).toEqual(
        call(rsf.firestore.getDocument, `users/${mockId}`)
      );
    });
  });
});
