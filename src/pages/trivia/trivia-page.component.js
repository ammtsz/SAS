import React, { useEffect, useState } from "react";
import Modal from "../../components/modal/modal.component";
import {
  PageTrivia,
  ContainerTrivia,
  CardTrivia,
  AnswerBtn,
  AnswerBtnContainer,
} from "./trivia-page.styles";
import HeaderTriviaComponent from "./components/header.trivia/header.trivia.component";
import CardHeaderTriviaComponent from "./components/card-header.trivia/card-header.trivia.component";
import QATrivia from "./components/qa.trivia/qa.trivia.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  actionSetQuizQuestionDatas,
  actionCheckAnswer,
  actionRightAnswerActions,
  actionWrongAnswerActions,
} from "../../redux/quiz/quiz.actions";
import {
  selectQuizQuestionDatas,
  selectQuizCurrentQuestion,
  selectQuizCurrentOptions,
} from "../../redux/quiz/quiz.selectors";

const mapStateToProps = createStructuredSelector({
  quizQuestionDatas: selectQuizQuestionDatas,
  quizCurrentQuestion: selectQuizCurrentQuestion,
  quizCurrentOptions: selectQuizCurrentOptions,
});

const mapDispatchToProps = (dispatch) => ({
  setQuizQuestionDatas: (data) => dispatch(actionSetQuizQuestionDatas(data)),
  checkAnswer: (data) => dispatch(actionCheckAnswer(data)),
  rightAnswerActions: () => dispatch(actionRightAnswerActions()),
  wrongAnswerActions: () => dispatch(actionWrongAnswerActions()),
});

const Trivia = ({
  setQuizQuestionDatas,
  quizQuestionDatas,
  quizCurrentQuestion,
  quizCurrentOptions,
  checkAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState();
  const [answerCorrect, setAnswerCorrect] = useState();

  const onscroll = () => {
    window.onscroll = () => {
      console.log("rolling");
      const btn = document.querySelector("#answer-btn-container");
      if (btn.offsetTop - btn.clientHeight > window.innerHeight) {
        btn.dataset.sticky = false;
      } else {
        btn.dataset.sticky = true;
      }
    };
  };

  const confirmAnswer = () => {
    if (selectedOption !== null) {
      setQuizQuestionDatas([
        ...quizQuestionDatas,
        {
          ...quizCurrentQuestion,
          selected_answer: selectedOption,
          all_answers: quizCurrentOptions,
        },
      ]);
      checkAnswer(selectedOption);
      setAnswerCorrect(selectedOption === "0");
      showAnswerModal();
    }
  };

  const showAnswerModal = () => {
    document.querySelector("#modal").style.display = "initial";
  };

  useEffect(() => {
    // onscroll();
    // return () => onscroll();
  },[]);

  return (
    <PageTrivia>
      <ContainerTrivia>
        <Modal right={answerCorrect} />
        <HeaderTriviaComponent />
        <CardTrivia>
          <CardHeaderTriviaComponent />
          <QATrivia setSelectedOption={setSelectedOption} />

          <AnswerBtnContainer id="answer-btn-container">
            <AnswerBtn onClick={() => confirmAnswer()}>Check Answer</AnswerBtn>
          </AnswerBtnContainer>
        </CardTrivia>
      </ContainerTrivia>
    </PageTrivia>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
