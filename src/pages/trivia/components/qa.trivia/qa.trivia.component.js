import React, { useEffect } from "react";
import { AnswerOptionCard, AnswerText, Question } from "./qa.trivia.styles";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectQuizQuestionNumber, selectQuizCurrentQuestion, selectQuizCurrentOptions } from "../../../../redux/quiz/quiz.selectors"
import { actionSetQuizCurrentQuestion, actionSetQuizCurrentOptions, actionGetCurrentOptions } from "../../../../redux/quiz/quiz.actions"
import { decodeHtml } from "../../../../utils/utils"
const mapStateToProps = createStructuredSelector({
  quizQuestionNumber: selectQuizQuestionNumber,
  quizCurrentQuestion: selectQuizCurrentQuestion,
  quizCurrentOptions: selectQuizCurrentOptions,
});

const mapDispatchToProps = (dispatch) => ({
  setQuizCurrentQuestion: (data) => dispatch(actionSetQuizCurrentQuestion(data)),
  setQuizCurrentOptions: (data) => dispatch(actionSetQuizCurrentOptions(data)),
  getCurrentOptions: (data) => dispatch(actionGetCurrentOptions(data)),
});

const QATrivia = ({
  quizCurrentQuestion,
  quizCurrentOptions,
  setSelectedOption,
  quizQuestionNumber,
}) => {

  const selectOption = (event) => {
    highlightSelectedOption(event);
    setSelectedOption(event.target.dataset.option);
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
    setSelectedOption(null)
    return () => removeHighlightedOption()
  }, [quizQuestionNumber, setSelectedOption]);

  return (
    <React.Fragment>
      <Question>{decodeHtml(quizCurrentQuestion.question)}</Question>

      {quizCurrentOptions.map((option) => (
        <AnswerOptionCard
          className="trivia__option"
          data-option={option.id}
          key={option.id}
          onClick={(event) => selectOption(event)}
        >
          <AnswerText data-option={option.id}>{decodeHtml(option.option)}</AnswerText>
        </AnswerOptionCard>
      ))}
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(QATrivia);
