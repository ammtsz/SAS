import React from "react";
import { CardCategory, CategoryName } from "./card.categories.styles";

const Card = ({ category }) => {
  return (
    <CardCategory done={false} as="a" href="/quiz">
      <div className="card__results">
        <span>7/10</span>
        <a href="/">resultado</a>
      </div>
      <CategoryName done={true}>{category}</CategoryName>
    </CardCategory>
  );
};

export default Card;
