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

const mapStateToProps = createStructuredSelector({
  categories: selectAllCategories,
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: (data) => dispatch(actionGetCategories(data)),
});

const Categories = ({ getCategories, categories }) => {
  useEffect(() => {
    getCategories();
    console.log("CATEGORIES");
  }, [getCategories]);

  return (
    <PageCategories>
      <Title>Categories <small>({categories.length})</small></Title>
      <CardsContainer>
        {categories.map((category) => (
          <Card
            key={category.id}
            category={category}
          />
        ))}
      </CardsContainer>
    </PageCategories>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Categories));
