import { QuizActionsTypes } from "./quiz.types";

const INITIAL_STATE = {
  active: false,
  category: null,
  questionNumber: 1,
  difficulty: "medium",
  promotion: "1", //0 = got last ne wrong, 1 = just changed difficulty, 2 = got last one right
  questionDatas: [],
  currentQuestion: {},
  currentOptions: [],
  token: null,
  error: null,
};

const quizReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QuizActionsTypes.REDUCER_SET_ACTIVE:
      return { ...state, active: action.payload };

    case QuizActionsTypes.REDUCER_SET_CATEGORY:
      return { ...state, category: action.payload };

    case QuizActionsTypes.REDUCER_SET_QUESTION_NUMBER:
      return { ...state, questionNumber: action.payload };

    case QuizActionsTypes.REDUCER_SET_DIFFICULTY:
      return { ...state, difficulty: action.payload };

    case QuizActionsTypes.REDUCER_SET_PROMOTION:
      return { ...state, promotion: action.payload };

    case QuizActionsTypes.REDUCER_SET_QUESTION_DATAS:
      return { ...state, questionDatas: action.payload };

    case QuizActionsTypes.REDUCER_SET_CURRENT_QUESTION:
      return { ...state, currentQuestion: action.payload };

    case QuizActionsTypes.REDUCER_SET_CURRENT_OPTIONS:
      return { ...state, currentOptions: action.payload };

    case QuizActionsTypes.REDUCER_SET_TOKEN:
      return { ...state, token: action.payload };

    case QuizActionsTypes.REDUCER_RESET_QUIZ:
      return INITIAL_STATE;

    case QuizActionsTypes.REDUCER_SET_QUIZ_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default quizReducer;
