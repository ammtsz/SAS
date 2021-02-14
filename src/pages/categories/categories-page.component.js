import React, { useEffect } from "react";
import Card from "./card.categories/card.categories.components";
import {
  Title,
  PageCategories,
  CardsContainer,
} from "./categories-page.styles";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAllCategories } from "../../redux/categories/categories.selectors";
import { actionGetCategories } from "../../redux/categories/categories.actions";
import { selectUserDatas } from "../../redux/user/user.selectors";
import { actionResetReport } from "../../redux/report/report.actions";
import { actionResetQuiz } from "../../redux/quiz/quiz.actions";

const mapStateToProps = createStructuredSelector({
  categories: selectAllCategories,
  userDatas: selectUserDatas,
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: (data) => dispatch(actionGetCategories(data)),
  resetReport: () => dispatch(actionResetReport()),
  resetQuiz: () => dispatch(actionResetQuiz()),
});

const Categories = ({ getCategories, categories, userDatas, resetReport, resetQuiz }) => {
  
  let userId;
  if (userDatas) {
    userId = userDatas.id;
  }

  useEffect(() => {
    getCategories();
    resetReport();
    resetQuiz();
  }, [getCategories, userId, resetReport, resetQuiz]);

  
  return (
    <PageCategories>
      <Title >
        Categories <small>({categories.length})</small>
      </Title>
      <CardsContainer >
        {categories.map((category) => (
          <Card
            key={category.id}
            category={category}
            data-testid="categories-cards"/>
        ))}
      </CardsContainer>
    </PageCategories>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
