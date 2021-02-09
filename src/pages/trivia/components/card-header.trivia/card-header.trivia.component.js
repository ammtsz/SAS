import React from "react";
import {
  CardTriviaHeader,
  QuestionLevel,
  Stars,
  QuestionNumber,
} from "./card-header.trivia.styles";

import Star from "../../../../assets/img/star.svg";

const CardHeaderTriviaComponent = () => {
  const stars = [1, 2, 3];
  const level = 2;
  return (
    <CardTriviaHeader>
      <QuestionNumber>Questao 1</QuestionNumber>
      <QuestionLevel>
        <Stars>
          {stars.map((star) => (
            <img
              src={Star}
              tabIndex="0"
              alt="star-level"
              key={star}
              className={star > level ? "starless" : ""}
            />
          ))}
        </Stars>
        <span>Dificil</span>
      </QuestionLevel>
    </CardTriviaHeader>
  );
};

export default CardHeaderTriviaComponent;
