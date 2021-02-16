import React, { useEffect } from "react";
import {
  AnswerOptionCard,
  AnswerText,
  Question,
} from "./card-qa.trivia.styles";

import { decodeHtml } from "../../../utils/utils";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectQuizQuestionNumber,
  selectQuizCurrentQuestion,
  selectQuizCurrentOptions,
} from "../../../redux/quiz/quiz.selectors";

const mapStateToProps = createStructuredSelector({
  quizCurrentQuestion: selectQuizCurrentQuestion,
  quizCurrentOptions: selectQuizCurrentOptions,
  quizQuestionNumber: selectQuizQuestionNumber,
});

const QATrivia = ({
  quizCurrentQuestion,
  quizCurrentOptions,
  quizQuestionNumber,
  setSelectedOption,
  setDisabled,
}) => {
  const selectOption = (event) => {
    highlightSelectedOption(event);
    setSelectedOption(event.target.dataset.option);
    setDisabled(false);
    console.log(event.target.dataset.option);
  };

  const highlightSelectedOption = (event) => {
    const option = event.target.dataset.option;
    document.querySelectorAll(".trivia__option").forEach((option) => {
      option.classList.remove("option__selected");
    });
    document
      .querySelector(`.trivia__option[data-option = '${option}']`)
      .classList.add("option__selected");
  };

  const removeHighlightedOption = () => {
    document.querySelectorAll(".trivia__option").forEach((option) => {
      option.classList.remove("option__selected");
    });
  };

  useEffect(() => {
    setSelectedOption(null);
    return () => removeHighlightedOption();
  }, [quizQuestionNumber, setSelectedOption]);

  return (
    <React.Fragment>
      <Question tabIndex="0">
        {decodeHtml(quizCurrentQuestion.question)}
      </Question>

      {quizCurrentOptions.map((option) => (
        <AnswerOptionCard
          key={option.id}
          className="trivia__option"
          data-option={option.id}
          data-testid={`trivia-card-option-${option.id}`}
          onClick={(event) => selectOption(event)}
        >
          <AnswerText
            data-option={option.id}
            data-testid="trivia-card-option-text"
          >
            {decodeHtml(option.option)}
          </AnswerText>
        </AnswerOptionCard>
      ))}
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(QATrivia);
