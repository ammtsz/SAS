import { QuizActionsTypes } from "./quiz.types";
import quizReducer from "./quiz.reducer";

const INITIAL_STATE = {
  active: false,
  loading: false,
  category: null,
  difficulty: "medium",
  questionNumber: 1,
  promotion: "1",
  currentQuestion: {},
  currentOptions: [],
  token: null,
  questionsDatas: [],
  error: null,
};

describe("quizReducer", () => {
  it("should return initial state", () => {
    expect(quizReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("should set 'active' to payload", () => {
    const mockActive = true;
    expect(
      quizReducer(INITIAL_STATE, {
        type: QuizActionsTypes.REDUCER_SET_ACTIVE,
        payload: mockActive,
      }).active
    ).toEqual(mockActive);
  });

  it("should set 'loading' to payload", () => {
    const mockLoading = true;
    expect(
      quizReducer(INITIAL_STATE, {
        type: QuizActionsTypes.REDUCER_SET_LOADING,
        payload: mockLoading,
      }).loading
    ).toEqual(mockLoading);
  });

  it("should set 'category' to payload", () => {
    const mockCategory = { id: 1, name: "Art" };
    expect(
      quizReducer(INITIAL_STATE, {
        type: QuizActionsTypes.REDUCER_SET_CATEGORY,
        payload: mockCategory,
      }).category
    ).toEqual(mockCategory);
  });

  it("should set 'difficulty' to payload", () => {
    const mockDifficulty = { id: 1, name: "Art" };
    expect(
      quizReducer(INITIAL_STATE, {
        type: QuizActionsTypes.REDUCER_SET_DIFFICULTY,
        payload: mockDifficulty,
      }).difficulty
    ).toEqual(mockDifficulty);
  });

  it("should set 'questionNumber' to payload", () => {
    const mockQuestionNumber = 5;
    expect(
      quizReducer(INITIAL_STATE, {
        type: QuizActionsTypes.REDUCER_SET_QUESTION_NUMBER,
        payload: mockQuestionNumber,
      }).questionNumber
    ).toEqual(mockQuestionNumber);
  });

  it("should set 'promotion' to payload", () => {
    const mockPromotion = 1;
    expect(
      quizReducer(INITIAL_STATE, {
        type: QuizActionsTypes.REDUCER_SET_PROMOTION,
        payload: mockPromotion,
      }).promotion
    ).toEqual(mockPromotion);
  });

  it("should set 'currentQuestion' to payload", () => {
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
    expect(
      quizReducer(INITIAL_STATE, {
        type: QuizActionsTypes.REDUCER_SET_CURRENT_QUESTION,
        payload: mockCurrentQuestion,
      }).currentQuestion
    ).toEqual(mockCurrentQuestion);
  });

  it("should set 'currentOptions' to payload", () => {
    const mockCurrentOptions = [
      { id: 0, option: "True Conservative Radio" },
      { id: 1, option: "True Republican Radio" },
      { id: 2, option: "Texan Capitalist Radio" },
      { id: 3, option: "United Capitalists" },
    ];
    expect(
      quizReducer(INITIAL_STATE, {
        type: QuizActionsTypes.REDUCER_SET_CURRENT_OPTIONS,
        payload: mockCurrentOptions,
      }).currentOptions
    ).toEqual(mockCurrentOptions);
  });

  it("should set 'token' to payload", () => {
    const mockToken = "1234567890";
    expect(
      quizReducer(INITIAL_STATE, {
        type: QuizActionsTypes.REDUCER_SET_TOKEN,
        payload: mockToken,
      }).token
    ).toEqual(mockToken);
  });

  it("should set 'questionsDatas' to payload", () => {
    const mockQuestionsDatas = [];
    expect(
      quizReducer(INITIAL_STATE, {
        type: QuizActionsTypes.REDUCER_SET_QUESTIONS_DATAS,
        payload: mockQuestionsDatas,
      }).questionsDatas
    ).toEqual(mockQuestionsDatas);
  });

  it("should reset quiz", () => {
    expect(
      quizReducer(INITIAL_STATE, {
        type: QuizActionsTypes.REDUCER_RESET_QUIZ,
      })
    ).toEqual(INITIAL_STATE);
  });

  it("should set 'error' to payload", () => {
    expect(
      quizReducer(INITIAL_STATE, {
        type: QuizActionsTypes.REDUCER_SET_QUIZ_ERROR,
        payload: "error",
      }).error
    ).toEqual("error");
  });
});
