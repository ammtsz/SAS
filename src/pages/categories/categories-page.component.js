import React, { useEffect } from "react";
import Card from "./component.card/card.categories.components";
import {
  Title,
  PageCategories,
  CardsContainer,
} from "./categories-page.styles";

import Spinner from "../../components/spinner/spinner.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectAllCategories,
  selectCategoriesLoading,
} from "../../redux/categories/categories.selectors";
import { selectUserDatas } from "../../redux/user/user.selectors";
import { actionGetCategories } from "../../redux/categories/categories.actions";
import { actionResetReport } from "../../redux/report/report.actions";
import { actionResetQuiz } from "../../redux/quiz/quiz.actions";

const mapStateToProps = createStructuredSelector({
  categories: selectAllCategories,
  categoriesLoading: selectCategoriesLoading,
  userDatas: selectUserDatas,
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(actionGetCategories()),
  resetReport: () => dispatch(actionResetReport()),
  resetQuiz: () => dispatch(actionResetQuiz()),
});

const Categories = ({
  categories,
  categoriesLoading,
  userDatas,
  getCategories,
  resetReport,
  resetQuiz,
}) => {
  let userId;
  if (userDatas) {
    userId = userDatas.id;
  }

  useEffect(() => {
    getCategories();
    resetReport();
    resetQuiz();
  }, [getCategories, userId, resetReport, resetQuiz]);

  return categoriesLoading ? (
    <Spinner />
  ) : (
    <PageCategories data-testid="categories-page" id="test-categories">
      <Title id="test-categories2">
        Categories <small>({categories.length})</small>
      </Title>
      <CardsContainer>
        {categories.map((category) => (
          <Card key={category.id} category={category} />
        ))}
      </CardsContainer>
    </PageCategories>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
