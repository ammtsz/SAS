import { all, call, takeLatest, put, select } from "redux-saga/effects";
import { fetchQuestion } from "../../api/trivia";
import {
  actionSetQuizError,
  actionSetQuizDifficulty,
  actionSetQuizPromotion,
  actionSetQuizCurrentQuestion,
  actionSetQuizCurrentOptions,
  actionSetQuizQuestionNumber,
  actionResetQuiz,
  actionSetQuizToken,
  actionSetQuizActive,
  actionSetQuizCategory,
  actionSetQuizQuestionDatas,
} from "./quiz.actions";
import { QuizActionsTypes } from "./quiz.types";
import {
  selectQuizCurrentQuestion,
  selectQuizDifficulty,
  selectQuizPromotion,
  selectQuizQuestionNumber,
  selectQuizCategory,
  selectQuizQuestionDatas,
  selectQuizToken,
} from "./quiz.selectors";
import { selectReports } from "../categories/categories.selectors";
import { actionSetReports } from "../categories/categories.actions";

export function* saveQuestionDatas(fetchedQuestion) {
  try {
    yield put(actionSetQuizCurrentQuestion(fetchedQuestion));
    localStorage.setItem("trivia", JSON.stringify(fetchedQuestion));
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
export function* fetchNewQuestion({ payload: { difficulty, category } }) {
  try {
    const token = yield select(selectQuizToken);
    const fetchedQuestion = yield fetchQuestion(difficulty, category, token);
    if (!token) {
      yield put(actionSetQuizToken(fetchedQuestion.token));
    }
    yield saveQuestionDatas(fetchedQuestion.results);
    yield getCurrentOptions(fetchedQuestion.results);
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

export function* goToNextQuestion(history) {
  const quizQuestionNumber = yield select(selectQuizQuestionNumber);

  try {
    const difficulty = yield select(selectQuizDifficulty);
    const category = yield select(selectQuizCategory);

    if (quizQuestionNumber < 10) {
      yield put(actionSetQuizQuestionNumber(quizQuestionNumber + 1));
      yield fetchNewQuestion({
        payload: { difficulty, category: category.id },
      });
    } else {
      history.payload.push("/report");
    }
    yield updateQuizReport(quizQuestionNumber, difficulty, category);
    document.querySelector("#modal").style.display = "none";
  } catch (error) {
    yield put(actionSetQuizError(error));
  }
}

export function* updateQuizReport(quizQuestionNumber, difficulty, category) {
  const reports = yield select(selectReports);
  const question_datas = yield select(selectQuizQuestionDatas);
  const token = yield select(selectQuizToken);
  const promotion = yield select(selectQuizPromotion);
  const results = yield getReportDatas();
  const lastQuestion = yield select(selectQuizCurrentQuestion);
  const resume =
    quizQuestionNumber < 10
      ? {
          token,
          promotion,
          difficulty,
          lastQuestion,
        }
      : null;

  const categoryReport = {
    category_name: category.name,
    question_datas,
    results,
    resume,
  };
  yield put(actionSetReports({ ...reports, [category.id]: categoryReport }));
}

export function* getReportDatas() {
  try {
    let easy = { rights: 0, wrongs: 0 };
    let medium = { rights: 0, wrongs: 0 };
    let hard = { rights: 0, wrongs: 0 };
    let rights = 0;
    let wrongs = 0;

    const quizQuestionDatas = yield select(selectQuizQuestionDatas);

    quizQuestionDatas.forEach((question) => {
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

export function* finishQuiz(history) {
  try {
    yield put(actionResetQuiz());
    history.payload.push("/");
  } catch (error) {
    yield put(actionSetQuizError(error));
  }
}

export function* resumeQuiz(category) {
  try {
    const reports = yield select(selectReports);
    const quizDatas = reports[category.payload.id];

    yield put(actionSetQuizActive(true));
    yield put(actionSetQuizCategory(category.payload));
    yield put(actionSetQuizDifficulty(quizDatas.resume.difficulty));
    yield put(actionSetQuizPromotion(quizDatas.resume.promotion));
    yield put(actionSetQuizQuestionDatas(quizDatas.question_datas));
    yield put(actionSetQuizQuestionNumber(quizDatas.question_datas.length + 1));
    yield put(actionSetQuizToken(quizDatas.resume.token));
    yield put(actionSetQuizCurrentQuestion(quizDatas.resume.lastQuestion));

    yield getCurrentOptions();
  } catch (error) {
    yield put(actionSetQuizError(error));
  }
}

// CALLS

export function* onFetchNewQuestion() {
  yield takeLatest(QuizActionsTypes.SAGA_FETCH_NEW_QUESTION, fetchNewQuestion);
}
export function* onCheckAnswer() {
  yield takeLatest(QuizActionsTypes.SAGA_CHECK_ANSWER, checkAnswer);
}
export function* onRightAnswerActions() {
  yield takeLatest(
    QuizActionsTypes.SAGA_RIGHT_ANSWERS_ACTIONS,
    rightAnswerActions
  );
}
export function* onWrongAnswerActions() {
  yield takeLatest(
    QuizActionsTypes.SAGA_WRONG_ANSWERS_ACTIONS,
    wrongAnswerActions
  );
}
export function* onGetCurrentOptions() {
  yield takeLatest(
    QuizActionsTypes.SAGA_GET_CURRENT_OPTIONS,
    getCurrentOptions
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
    call(onFetchNewQuestion),
    call(onCheckAnswer),
    call(onWrongAnswerActions),
    call(onGetCurrentOptions),
    call(onGoToNextQuestion),
    call(onFinishQuiz),
    call(onResumeQuiz),
  ]);
}
