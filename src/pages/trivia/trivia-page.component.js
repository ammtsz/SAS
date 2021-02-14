import React, { useEffect, useState } from "react";
import Modal from "../../components/modal/modal.component";
import {
  PageTrivia,
  ContainerTrivia,
  CardTrivia,
  AnswerBtn,
  AnswerBtnContainer,
} from "./trivia-page.styles";
import HeaderTriviaComponent from "./header.trivia/header.trivia.component";
import CardHeaderTriviaComponent from "./card-header.trivia/card-header.trivia.component";
import QATrivia from "./card-qa.trivia/card-qa.trivia.component";
import Spinner from "../../components/spinner/spinner.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  actionSetQuizQuestionsDatas,
  actionCheckAnswer,
  actionUpdateQuizReport,
} from "../../redux/quiz/quiz.actions";
import {
  selectQuizQuestionsDatas,
  selectQuizCurrentQuestion,
  selectQuizCurrentOptions,
  selectQuizLoading,
} from "../../redux/quiz/quiz.selectors";

const mapStateToProps = createStructuredSelector({
  quizQuestionsDatas: selectQuizQuestionsDatas,
  quizCurrentQuestion: selectQuizCurrentQuestion,
  quizCurrentOptions: selectQuizCurrentOptions,
  quizLoading: selectQuizLoading,
});

const mapDispatchToProps = (dispatch) => ({
  setQuizQuestionsDatas: (data) => dispatch(actionSetQuizQuestionsDatas(data)),
  checkAnswer: (data) => dispatch(actionCheckAnswer(data)),
  updateQuizReport: () => dispatch(actionUpdateQuizReport()),
});

const Trivia = ({
  setQuizQuestionsDatas,
  quizQuestionsDatas,
  quizCurrentQuestion,
  quizCurrentOptions,
  checkAnswer,
  updateQuizReport,
  quizLoading,
}) => {
  const [selectedOption, setSelectedOption] = useState();
  const [answerCorrect, setAnswerCorrect] = useState();
  const [sticky, setSticky] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const onscroll = (listening) => {
    if (window.innerWidth <= 375) {
      window.onscroll = () => {
        if (listening) {
          const btn = document.querySelector("#answer-button__container");
          if (btn.offsetTop > window.innerHeight) {
            console.log("false");
            setSticky(false);
          } else {
            console.log("true");
            setSticky(true);
          }
        }
      };
    }
  };

  const confirmAnswer = () => {
    setDisabled(true);
    if (selectedOption !== null) {
      setQuizQuestionsDatas([
        ...quizQuestionsDatas,
        {
          ...quizCurrentQuestion,
          selected_answer: selectedOption,
          all_answers: quizCurrentOptions,
          answered_at: new Date(),
        },
      ]);
      checkAnswer(selectedOption);
      updateQuizReport();
      setAnswerCorrect(selectedOption === "0");
      showAnswerModal();
    }
  };

  const showAnswerModal = () => {
    document.querySelector("#modal").style.display = "initial";
  };

  useEffect(() => {
    onscroll(true);
    return () => onscroll(false);
  }, []);

  return (
    <PageTrivia>
      <ContainerTrivia>
        <Modal right={answerCorrect} />
        <HeaderTriviaComponent />
        <CardTrivia as="article">
          <CardHeaderTriviaComponent />
          {quizLoading ? (
            <Spinner />
          ) : (
            <QATrivia
              setSelectedOption={setSelectedOption}
              setDisabled={setDisabled}
            />
          )}
          <AnswerBtnContainer id="answer-button__container" sticky={sticky}>
            <AnswerBtn
              id="answer-button_"
              disabled={disabled}
              onClick={() => confirmAnswer()}
            >
              Check Answer
            </AnswerBtn>
          </AnswerBtnContainer>
        </CardTrivia>
      </ContainerTrivia>
    </PageTrivia>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
