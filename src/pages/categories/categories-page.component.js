import React, { useEffect } from "react";
import Card from "./components/card.categories/card.categories.components";
import {
  Title,
  PageCategories,
  CardsContainer,
} from "./categories-page.styles";

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAllCategories } from "../../redux/categories/categories.selectors";
import { actionGetCategories } from "../../redux/categories/categories.actions";
import { selectUserDatas } from "../../redux/user/user.selectors";

const mapStateToProps = createStructuredSelector({
  categories: selectAllCategories,
  userDatas: selectUserDatas,
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: (data) => dispatch(actionGetCategories(data)),
});

const Categories = ({ getCategories, categories, userDatas }) => {
  
  let userId;
  if (userDatas) {
    userId = userDatas.id;
  }

  useEffect(() => {
    getCategories();
    console.log("CATEGORIES");
  }, [getCategories, userId]);

  return (
    <PageCategories>
      <Title>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Categories));
