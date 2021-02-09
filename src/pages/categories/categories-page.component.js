import React from "react";
import Card from "./components/card.categories/card.categories.components";
import {
  Title,
  PageCategories,
  CardsContainer,
} from "./categories-page.styles";

const Categories = ({ categories }) => {
  return (
    <PageCategories>
      <Title>Categories</Title>
      <CardsContainer>
        {categories.map(({ id, category }) => (
          <Card key={id} category={category} />
        ))}
      </CardsContainer>
    </PageCategories>
  );
};

export default Categories;
