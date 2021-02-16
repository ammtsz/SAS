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

const CardHeaderTrivia = ({ quizDifficulty, quizQuestionNumber }) => {
  let difficultyLevels = [{id: 1, name: "easy"}, {id: 2, name: "medium"}, {id: 3, name:"hard"}]
  let difficulty = difficultyLevels.filter(level => level.name === quizDifficulty)[0].id

  return (
    <CardTriviaHeader>
      <QuestionNumber tabIndex="0">{`Question ${quizQuestionNumber}`}</QuestionNumber>
      <QuestionLevel>
        <Stars tabIndex="-1">
          {difficultyLevels.map((star) => (
            <img
              src={Star}
              alt={`star-level-${star.name}`}
              key={star.id}
              className={star.id > difficulty ? "starless" : ""}
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

export default connect(mapStateToProps)(CardHeaderTrivia);
