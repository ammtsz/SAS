import React from "react";
import {
  CardTriviaHeader,
  QuestionLevel,
  Stars,
  QuestionNumber,
} from "./card-header.trivia.styles";

import Star from "../../../assets/img/star.svg";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectQuizDifficulty,
  selectQuizQuestionNumber,
} from "../../../redux/quiz/quiz.selectors";

const mapStateToProps = createStructuredSelector({
  quizDifficulty: selectQuizDifficulty,
  quizQuestionNumber: selectQuizQuestionNumber,
});

const CardHeaderTriviaComponent = ({ quizDifficulty, quizQuestionNumber }) => {
  let difficulty;
  switch (quizDifficulty) {
    case "easy":
      difficulty = 1;
      break;
    case "hard":
      difficulty = 3;
      break;
    default:
      difficulty = 2;
      break;
  }

  return (
    <CardTriviaHeader>
      <QuestionNumber tabIndex="0">{`Question ${quizQuestionNumber}`}</QuestionNumber>
      <QuestionLevel>
        <Stars tabIndex="-1">
          {[1, 2, 3].map((star) => (
            <img
              src={Star}
              alt="star-level"
              key={star}
              className={star > difficulty ? "starless" : ""}
            />
          ))}
        </Stars>
        <span tabIndex="0">
          {quizDifficulty[0].toUpperCase() + quizDifficulty.substring(1)}
        </span>
      </QuestionLevel>
    </CardTriviaHeader>
  );
};

export default connect(mapStateToProps)(CardHeaderTriviaComponent);
