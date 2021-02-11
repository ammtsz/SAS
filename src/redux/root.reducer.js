import { combineReducers } from "redux";
import userReducer from "./user/user.reducer"
import quizReducer from "./quiz/quiz.reducer"
import categoriesReducer from "./categories/categories.reducer"
import reportReducer from "./report/report.reducer"

export default combineReducers({
  user: userReducer,
  quiz: quizReducer,
  categories: categoriesReducer,
  report: reportReducer,
});
