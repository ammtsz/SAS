import React, { useEffect, useState } from "react";
import Modal from "../../components/modal/modal.component";
import {
  PageTrivia,
  ContainerTrivia,
  CardTrivia,
  AnswerBtn,
  AnswerBtnContainer,
} from "./trivia-page.styles";

import HeaderTriviaComponent from "./component.header/header.trivia.component";
import CardHeaderTriviaComponent from "./component.card-header/card-header.trivia.component";
import QATrivia from "./component.card-qa/card-qa.trivia.component";
import Spinner from "../../components/spinner/spinner.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectQuizQuestionsAnswered,
  selectQuizCurrentQuestion,
  selectQuizCurrentOptions,
  selectQuizLoading,
} from "../../redux/quiz/quiz.selectors";
import {
  actionSetQuizQuestionsAnswered,
  actionCheckAnswer,
  actionUpdateQuizReport,
} from "../../redux/quiz/quiz.actions";

const mapStateToProps = createStructuredSelector({
  quizQuestionsAnswered: selectQuizQuestionsAnswered,
  quizCurrentQuestion: selectQuizCurrentQuestion,
  quizCurrentOptions: selectQuizCurrentOptions,
  quizLoading: selectQuizLoading,
});

const mapDispatchToProps = (dispatch) => ({
  setQuizQuestionsAnswered: (data) => dispatch(actionSetQuizQuestionsAnswered(data)),
  checkAnswer: (data) => dispatch(actionCheckAnswer(data)),
  updateQuizReport: () => dispatch(actionUpdateQuizReport()),
});

const Trivia = ({
  quizQuestionsAnswered,
  quizCurrentQuestion,
  quizCurrentOptions,
  quizLoading,
  setQuizQuestionsAnswered,
  checkAnswer,
  updateQuizReport,
}) => {
  const [selectedOption, setSelectedOption] = useState();
  const [answerCorrect, setAnswerCorrect] = useState();
  const [sticky, setSticky] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const onscroll = (listening) => {
    if (window.innerWidth <= 375) {
      window.onscroll = () => {
        const btn = document.querySelector("#trivia-btn-answer-container");
        if (listening && btn) {
          if (btn.offsetTop >= 552) {
            setSticky(false);
          } else {
            setSticky(true);
          }
        }
      };
    }
  };

  const confirmAnswer = () => {
    setDisabled(true);

    if (selectedOption !== null) {
      setQuizQuestionsAnswered([
        ...quizQuestionsAnswered,
        {
          ...quizCurrentQuestion,
          selected_answer: selectedOption,
          all_answers: quizCurrentOptions,
          answered_at: new Date(),
        },
      ]);

      document.querySelector("#modal-button").dataset.readonly = false;
      checkAnswer(selectedOption);
      updateQuizReport();
      setAnswerCorrect(selectedOption === "0");
      showAnswerModal();
    }

    document.querySelector("#modal-message").focus();
  };

  const showAnswerModal = () => {
    document.querySelector("#modal").style.display = "initial";
  };

  useEffect(() => {
    onscroll(true);
    return () => onscroll(false);
  }, []);

  return (
    <PageTrivia data-testid="trivia-page">
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
          <AnswerBtnContainer id="trivia-btn-answer-container" sticky={sticky}>
            <AnswerBtn
              id="trivia-btn-answer"
              data-readonly={disabled}
              onClick={() => confirmAnswer()}
              onKeyUp={(event) => {if(event.keyCode === 13) confirmAnswer()}}
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
