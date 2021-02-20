import { all, call, takeLatest, put, select } from "redux-saga/effects";
import { rsf } from "../../firebase/firebase.utils";
import {
  actionSetQuizError,
  actionSetQuizDifficulty,
  actionSetQuizPromotion,
  actionSetQuizCurrentQuestion,
  actionSetQuizCurrentOptions,
  actionSetQuizQuestionNumber,
  actionResetQuiz,
  actionSetQuizActive,
  actionSetQuizCategory,
  actionSetQuizQuestionsAnswered,
  actionSetQuizLoading,
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
import {
  selectAllCategories,
  selectCategoriesReports,
} from "../categories/categories.selectors";
import { actionSetCategoriesReport } from "../categories/categories.actions";
import { selectUserDatas } from "../user/user.selectors";

// UTILS

export function* getQuestion(difficulty, categoryId) {
  try {
    const reports = yield select(selectCategoriesReports);
    return reports[categoryId].questions[difficulty].shift();
  } catch (error) {
    yield put(actionSetQuizError(error));
    return {};
  }
}
export function* saveCurrentQuestion(question) {
  try {
    yield put(actionSetQuizCurrentQuestion(question));
  } catch (error) {
    yield put(actionSetQuizError(error));
  }
}
export function* getCurrentOptions() {
  try {
    const currentQuestion = yield select(selectQuizCurrentQuestion);
    let allOptions = [];

    allOptions.push({ id: 0, option: currentQuestion.correct_answer });
    currentQuestion.incorrect_answers.forEach((option, index) => {
      allOptions.push({ id: index + 1, option });
    });

    yield put(
      actionSetQuizCurrentOptions(
        allOptions.sort((a, b) => (a.option > b.option ? 1 : -1))
      )
    );
  } catch (error) {
    yield put(actionSetQuizError(error));
  }
}

export function* rightAnswerActions() {
  try {
    const quizPromotion = yield select(selectQuizPromotion);
    if (quizPromotion === "2") {
      yield increaseDifficulty();
      yield put(actionSetQuizPromotion("1"));
    } else {
      yield put(actionSetQuizPromotion("2"));
    }
  } catch (error) {
    yield put(actionSetQuizError(error));
  }
}
export function* increaseDifficulty() {
  try {
    const quizDifficulty = yield select(selectQuizDifficulty);
    switch (quizDifficulty) {
      case "easy":
        yield put(actionSetQuizDifficulty("medium"));
        break;
      case "medium":
        yield put(actionSetQuizDifficulty("hard"));
        break;
      default:
        yield put(actionSetQuizDifficulty(quizDifficulty));
        break;
    }
  } catch (error) {
    yield put(actionSetQuizError(error));
  }
}
export function* wrongAnswerActions() {
  try {
    const quizPromotion = yield select(selectQuizPromotion);
    if (quizPromotion === "0") {
      yield decreaseDifficulty();
      yield put(actionSetQuizPromotion("1"));
    } else {
      yield put(actionSetQuizPromotion("0"));
    }
  } catch (error) {
    yield put(actionSetQuizError(error));
  }
}
export function* decreaseDifficulty() {
  const quizDifficulty = yield select(selectQuizDifficulty);
  try {
    switch (quizDifficulty) {
      case "hard":
        yield put(actionSetQuizDifficulty("medium"));
        break;
      case "medium":
        yield put(actionSetQuizDifficulty("easy"));
        break;
      default:
        yield put(actionSetQuizDifficulty(quizDifficulty));
        break;
    }
  } catch (error) {
    yield put(actionSetQuizError(error));
  }
}

export function* getReportDatas() {
  try {
    let easy = { rights: 0, wrongs: 0 };
    let medium = { rights: 0, wrongs: 0 };
    let hard = { rights: 0, wrongs: 0 };
    let rights = 0;
    let wrongs = 0;

    const quizQuestionsAnswered = yield select(selectQuizQuestionsAnswered);

    quizQuestionsAnswered.forEach((question) => {
      if (question.difficulty === "easy") {
        if (question.selected_answer === "0") {
          easy = { ...easy, rights: easy.rights + 1 };
          rights += 1;
        } else {
          easy = { ...easy, wrongs: easy.wrongs + 1 };
          wrongs += 1;
        }
      } else if (question.difficulty === "medium") {
        if (question.selected_answer === "0") {
          medium = { ...medium, rights: medium.rights + 1 };
          rights += 1;
        } else {
          medium = { ...medium, wrongs: medium.wrongs + 1 };
          wrongs += 1;
        }
      } else if (question.difficulty === "hard") {
        if (question.selected_answer === "0") {
          hard = { ...hard, rights: hard.rights + 1 };
          rights += 1;
        } else {
          hard = { ...hard, wrongs: hard.wrongs + 1 };
          wrongs += 1;
        }
      }
    });

    return {
      difficulty: {
        easy: { rights: easy.rights, wrongs: easy.wrongs },
        medium: { rights: medium.rights, wrongs: medium.wrongs },
        hard: { rights: hard.rights, wrongs: hard.wrongs },
      },
      rights,
      wrongs,
    };
  } catch (error) {
    yield put(actionSetQuizError(error));
    return {};
  }
}
export function* updateReportOnDB(report) {
  try {
    const userDatasState = yield select(selectUserDatas);
    if (userDatasState) {
      const userDatas = yield getUserDatasFromFirebase(userDatasState.id);
      yield call(rsf.firestore.updateDocument, `users/${userDatasState.id}`, {
        ...userDatas,
        reports: { ...userDatas.reports, ...report },
      });
    } else {
      localStorage.setItem("trivia", JSON.stringify(report));
    }
  } catch (error) {
    yield put(actionSetQuizError(error));
  }
}
export function* getUserDatasFromFirebase(id) {
  try {
    const userSnapshot = yield call(rsf.firestore.getDocument, `users/${id}`);
    return userSnapshot.data();
  } catch (error) {
    yield put(actionSetQuizError(error));
    return {};
  }
}

export function* saveQuestionsOnReports(category) {
  try {
    const allCategories = yield select(selectAllCategories);
    const categoryQuestions = allCategories.filter(
      (item) => item.id === category.id
    )[0].questions;
    const reports = yield select(selectCategoriesReports);
    yield put(
      actionSetCategoriesReport({
        ...reports,
        [category.id]: { questions: categoryQuestions },
      })
    );
  } catch (error) {
    yield put(actionSetQuizError(error));
  }
}

// CALLED

export function* startQuiz({ payload: { category, history } }) {
  try {
    if (category.completed === 0) {
      yield put(actionSetQuizCategory(category));
      yield put(actionSetQuizActive(true));
      yield saveQuestionsOnReports(category);
      yield getNewQuestion("medium", category.id);
      history.push("/quiz");
    }
  } catch (error) {
    yield put(actionSetQuizError(error));
  }
}
export function* getNewQuestion(difficulty, categoryId) {
  try {
    yield put(actionSetQuizLoading(true));
    const question = yield getQuestion(difficulty, categoryId);
    yield saveCurrentQuestion(question);
    yield getCurrentOptions(question);
    yield put(actionSetQuizLoading(false));
  } catch (error) {
    yield put(actionSetQuizError(error));
  }
}
export function* checkAnswer(selectedOption) {
  try {
    if (selectedOption.payload === "0") {
      yield rightAnswerActions();
    } else {
      yield wrongAnswerActions();
    }
  } catch (error) {
    yield put(actionSetQuizError(error));
  }
}
export function* updateQuizReport() {
  try {
    const quizQuestionNumber = yield select(selectQuizQuestionNumber);
    const difficulty = yield select(selectQuizDifficulty);
    const category = yield select(selectQuizCategory);
    const reports = yield select(selectCategoriesReports);
    const questions_answered = yield select(selectQuizQuestionsAnswered);
    const promotion = yield select(selectQuizPromotion);
    const results = yield getReportDatas();

    const resume =
      quizQuestionNumber < 10
        ? {
            promotion,
            difficulty,
          }
        : null;

    const categoryReport = {
      category_name: category.name,
      questions_answered,
      results,
      resume,
    };
    const newReport = {
      ...reports,
      [category.id]: { ...reports[category.id], ...categoryReport },
    };
    yield put(actionSetCategoriesReport(newReport));
    yield updateReportOnDB(newReport);
  } catch (error) {
    yield put(actionSetQuizError(error));
  }
}
export function* updateQuizResumeReport() {
  try {
    const quizQuestionNumber = yield select(selectQuizQuestionNumber);
    const difficulty = yield select(selectQuizDifficulty);
    const category = yield select(selectQuizCategory);
    const reports = yield select(selectCategoriesReports);
    const promotion = yield select(selectQuizPromotion);
    const lastQuestion = yield select(selectQuizCurrentQuestion);

    const resume =
      quizQuestionNumber < 10
        ? {
            promotion,
            difficulty,
            lastQuestion,
          }
        : null;

    const newReport = {
      ...reports,
      [category.id]: { ...reports[category.id], resume },
    };
    yield put(actionSetCategoriesReport(newReport));
    yield updateReportOnDB(newReport);
  } catch (error) {
    yield put(actionSetQuizError(error));
  }
}
export function* goToNextQuestion() {
  try {
    const quizQuestionNumber = yield select(selectQuizQuestionNumber);
    const difficulty = yield select(selectQuizDifficulty);
    const category = yield select(selectQuizCategory);
    yield getNewQuestion(difficulty, category.id);
    yield put(actionSetQuizQuestionNumber(quizQuestionNumber + 1));
    yield updateQuizResumeReport();
  } catch (error) {
    yield put(actionSetQuizError(error));
  }
}
export function* finishQuiz() {
  try {
    yield put(actionResetQuiz());
  } catch (error) {
    yield put(actionSetQuizError(error));
  }
}
export function* resumeQuiz(category) {
  try {
    const reports = yield select(selectCategoriesReports);
    const quizDatas = reports[category.payload.id];

    yield put(actionSetQuizActive(true));
    yield put(actionSetQuizCategory(category.payload));
    yield put(actionSetQuizDifficulty(quizDatas.resume.difficulty));
    yield put(actionSetQuizPromotion(quizDatas.resume.promotion));
    yield put(
      actionSetQuizQuestionNumber(quizDatas.questions_answered.length + 1)
    );
    yield put(actionSetQuizQuestionsAnswered(quizDatas.questions_answered));

    if (quizDatas.resume.lastQuestion) {
      yield put(actionSetQuizCurrentQuestion(quizDatas.resume.lastQuestion));
      yield getCurrentOptions();
    } else {
      yield getNewQuestion(quizDatas.resume.difficulty, category.payload.id);
    }
  } catch (error) {
    yield put(actionSetQuizError(error));
  }
}

// CALLS
export function* onStartQuiz() {
  yield takeLatest(QuizActionsTypes.SAGA_START_QUIZ, startQuiz);
}
export function* onCheckAnswer() {
  yield takeLatest(QuizActionsTypes.SAGA_CHECK_ANSWER, checkAnswer);
}
export function* onUpdateQuizReport() {
  yield takeLatest(QuizActionsTypes.SAGA_UPDATE_QUIZ_REPORT, updateQuizReport);
}
export function* onUpdateQuizResumeReport() {
  yield takeLatest(
    QuizActionsTypes.SAGA_UPDATE_QUIZ_RESUME_REPORT,
    updateQuizResumeReport
  );
}
export function* onGoToNextQuestion() {
  yield takeLatest(QuizActionsTypes.SAGA_GO_TO_NEXT_QUESTION, goToNextQuestion);
}
export function* onFinishQuiz() {
  yield takeLatest(QuizActionsTypes.SAGA_FINISH_QUIZ, finishQuiz);
}
export function* onResumeQuiz() {
  yield takeLatest(QuizActionsTypes.SAGA_RESUME_QUIZ, resumeQuiz);
}

export function* quizSagas() {
  yield all([
    call(onStartQuiz),
    call(onCheckAnswer),
    call(onUpdateQuizReport),
    call(onUpdateQuizResumeReport),
    call(onGoToNextQuestion),
    call(onFinishQuiz),
    call(onResumeQuiz),
  ]);
}
