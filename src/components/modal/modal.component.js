import React from "react";
import { PageModal, CardModal, Icon, Message, NextBtn } from "./modal.styles";

import RightIcon from "../../assets/img/right.svg";
import WrongIcon from "../../assets/img/wrong.svg";
import ArrowIcon from "../../assets/img/arrow-right.svg";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectQuizQuestionNumber } from "../../redux/quiz/quiz.selectors";
import {
  actionGoToNextQuestion,
  actionUpdateQuizResumeReport,
} from "../../redux/quiz/quiz.actions";

const mapStateToProps = createStructuredSelector({
  quizQuestionNumber: selectQuizQuestionNumber,
});

const mapDispatchToProps = (dispatch) => ({
  goToNextQuestion: () => dispatch(actionGoToNextQuestion()),
  updateQuizResumeReport: () => dispatch(actionUpdateQuizResumeReport()),
});

const Modal = ({
  quizQuestionNumber,
  goToNextQuestion,
  updateQuizResumeReport,
  history,
  right,
}) => {

  const nextQuestionActions = () => {
    document.querySelector("#modal-button").dataset.readonly = true;
    document.querySelector("#modal").style.display = "none";

    if (quizQuestionNumber < 10) {
      goToNextQuestion();
    } else {
      updateQuizResumeReport();
      history.push("/report");
    }
  };

  return (
    <PageModal id="modal" data-testid="modal-card-container">
      <CardModal data-testid="modal-card" right={right}>
        <Icon
          src={right ? RightIcon : WrongIcon}
          alt={right ? "correct" : "incorrect"}
          tabindex="-1"
        />
        <Message id="modal-message" tabIndex="0" >{right ? "Correct answer!" : "Wrong answer"}</Message>
        <NextBtn
          id="modal-button"
          data-readonly={true}
          onClick={() => nextQuestionActions()}
        >
          {quizQuestionNumber < 10 ? "Next question" : "See report"}
          <img className="modal__nextButton--icon" src={ArrowIcon} alt="..." />
        </NextBtn>
      </CardModal>
    </PageModal>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Modal));
