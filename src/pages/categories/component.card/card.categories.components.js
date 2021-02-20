import React from "react";
import { CardCategory, CategoryName } from "./card.categories.styles";
import CardHeader from "../component.card-header/card-header.categories.component";

import { decodeHtml } from "../../../utils/utils";
import { connect } from "react-redux";
import {
  actionStartQuiz,
} from "../../../redux/quiz/quiz.actions";
import { withRouter } from "react-router-dom";

const mapDispatchToProps = (dispatch) => ({
  startQuiz: (data) => dispatch(actionStartQuiz(data)),
});

const Card = ({
  category,
  startQuiz,
  history,
}) => {

  return (
    <CardCategory
      onClick={() => startQuiz({category, history})}
      onKeyUp={(event) => {if(event.keyCode === 13) startQuiz({category, history})}}
      data-testid="category-card"
      data-readonly={category.completed !== 0}
  
      completed={category.completed !== 0}
  
      tabIndex={category.completed === 0 ? "0" : "-1"}
      role={category.completed === 0 ? "button" : "div"}
      aria-label={`${category.name} start quiz`}
    >
      {category.completed !== 0 ? (
        <CardHeader category={category} history={history} />
      ) : null}
      <CategoryName completed={category.completed !== 0}>
        {decodeHtml(category.name)}
      </CategoryName>
    </CardCategory>
  );
};

export default connect(null, mapDispatchToProps)(withRouter(Card));
