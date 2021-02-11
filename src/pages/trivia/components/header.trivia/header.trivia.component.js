import React from "react";
import {
  HeaderTrivia,
  CategoryName,
  CloseButton,
  CloseIcon,
} from "./header.trivia.styles";
import CloseBtn from "../../../../assets/img/close-btn.svg";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectQuizCategory } from "../../../../redux/quiz/quiz.selectors";
import { actionFinishQuiz } from "../../../../redux/quiz/quiz.actions";

import { decodeHtml } from "../../../../utils/utils"

const mapStateToProps = createStructuredSelector({
  quizCategory: selectQuizCategory,
});

const mapDispatchToProps = (dispatch) => ({
  finishQuiz: () => dispatch(actionFinishQuiz()),
});

const HeaderTriviaComponent = ({ history, quizCategory, finishQuiz }) => {
  const leaveQuiz = () => {
    finishQuiz();
  };

  return (
    <HeaderTrivia>
      <CategoryName>{decodeHtml(quizCategory.name)}</CategoryName>
      <CloseButton onClick={() => leaveQuiz()}>
        <CloseIcon src={CloseBtn} alt="close" tabIndex="-1" />
        Close
      </CloseButton>
    </HeaderTrivia>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HeaderTriviaComponent));
