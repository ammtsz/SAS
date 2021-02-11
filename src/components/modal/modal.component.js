import React from "react";
import { PageModal, CardModal, Icon, Message, NextBtn } from "./modal.styles";
import RightIcon from "../../assets/img/right.svg";
import WrongIcon from "../../assets/img/wrong.svg";
import ArrowIcon from "../../assets/img/arrow-right.svg";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { actionGoToNextQuestion } from "../../redux/quiz/quiz.actions";

const mapDispatchToProps = (dispatch) => ({
  goToNextQuestion: (data) => dispatch(actionGoToNextQuestion(data)),
});

const Modal = ({ right, goToNextQuestion, history }) => {
  return (
    <PageModal id="modal">
      <CardModal right={right}>
        <Icon src={right ? RightIcon : WrongIcon} alt="..." />
        <Message>{right ? "Correct answer!" : "Wrong answer"}</Message>
        <NextBtn onClick={() => goToNextQuestion(history)}>
          Avancar
          <img className="nextButton__icon" src={ArrowIcon} alt="..." />
        </NextBtn>
      </CardModal>
    </PageModal>
  );
};

export default connect(null, mapDispatchToProps)(withRouter(Modal));
