import React from "react";
import { CardCategory, CategoryName } from "./card.categories.styles";
import CardHeader from "../card-header.categories/card-header.categories.component";

import { decodeHtml } from "../../../utils/utils";
import { connect } from "react-redux";
import {
  actionSetQuizCategory,
  actionSetQuizActive,
  actionGetNewQuestion,
} from "../../../redux/quiz/quiz.actions";
import { withRouter } from "react-router-dom";

const mapDispatchToProps = (dispatch) => ({
  setQuizCategory: (data) => dispatch(actionSetQuizCategory(data)),
  setQuizActive: (data) => dispatch(actionSetQuizActive(data)),
  getNewQuestion: (data) => dispatch(actionGetNewQuestion(data)),
});

const Card = ({
  category,
  setQuizCategory,
  setQuizActive,
  getNewQuestion,
  history,
}) => {
  const startQuiz = () => {
    if (category.completed !== 10) {
      setQuizCategory(category);
      setQuizActive(true);
      getNewQuestion({ difficulty: "medium", category: category.id });
      history.push("/quiz");
    }
  };

  return (
    <CardCategory
      disabled={category.completed !== 0}
      completed={category.completed !== 0}
      as="button"
      onClick={() => startQuiz()}
      data-testid="category-card"
    >
      {category.completed !== 0 ? <CardHeader category={category} history={history}/> : null}
      <CategoryName completed={category.completed !== 0}>{decodeHtml(category.name)}</CategoryName>
    </CardCategory>
  )
};

export default connect(null, mapDispatchToProps)(withRouter(Card));