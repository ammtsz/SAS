import { QuizActionsTypes } from "./quiz.types";

const INITIAL_STATE = {
  active: false,
  loading: false,
  category: null,
  difficulty: "medium",
  questionNumber: 1,
  promotion: "1", //0 = got last one wrong, 1 = first question on that level, 2 = got last one right
  currentQuestion: {},
  currentOptions: [],
  questionsAnswered: [],
  error: null,
};

const quizReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QuizActionsTypes.REDUCER_SET_ACTIVE:
      return { ...state, active: action.payload };

    case QuizActionsTypes.REDUCER_SET_LOADING:
      return { ...state, loading: action.payload };

    case QuizActionsTypes.REDUCER_SET_CATEGORY:
      return { ...state, category: action.payload };

    case QuizActionsTypes.REDUCER_SET_DIFFICULTY:
      return { ...state, difficulty: action.payload };

    case QuizActionsTypes.REDUCER_SET_QUESTION_NUMBER:
      return { ...state, questionNumber: action.payload };

    case QuizActionsTypes.REDUCER_SET_PROMOTION:
      return { ...state, promotion: action.payload };

    case QuizActionsTypes.REDUCER_SET_CURRENT_QUESTION:
      return { ...state, currentQuestion: action.payload };

    case QuizActionsTypes.REDUCER_SET_CURRENT_OPTIONS:
      return { ...state, currentOptions: action.payload };

    case QuizActionsTypes.REDUCER_SET_QUESTIONS_ANSWERED:
      return { ...state, questionsAnswered: action.payload };

    case QuizActionsTypes.REDUCER_RESET_QUIZ:
      return INITIAL_STATE;

    case QuizActionsTypes.REDUCER_SET_QUIZ_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default quizReducer;
