import React from "react";
import {
  HeaderTrivia,
  CategoryName,
  CloseButton,
  CloseIcon,
} from "./header.trivia.styles";

import CloseBtn from "../../../assets/img/close-btn.svg";
import { decodeHtml } from "../../../utils/utils";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectQuizCategory } from "../../../redux/quiz/quiz.selectors";
import { actionFinishQuiz } from "../../../redux/quiz/quiz.actions";

const mapStateToProps = createStructuredSelector({
  quizCategory: selectQuizCategory,
});

const mapDispatchToProps = (dispatch) => ({
  finishQuiz: () => dispatch(actionFinishQuiz()),
});

const HeaderTriviaComponent = ({ quizCategory, finishQuiz }) => {
  return (
    <HeaderTrivia>
      <CategoryName>{decodeHtml(quizCategory.name)}</CategoryName>
      <CloseButton
        onClick={() => finishQuiz()}
        onKeyUp={(event) => {if (event.keyCode === 13) finishQuiz()}}
        data-testid="trivia-close-button"
      >
        <CloseIcon src={CloseBtn} alt="close" tabIndex="-1" />
        Close
      </CloseButton>
    </HeaderTrivia>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderTriviaComponent);
