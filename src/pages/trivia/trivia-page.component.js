import React, { useEffect } from "react";
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

const Trivia = () => {
  const onscroll = () => {
    window.onscroll = () => {
      const btn = document.querySelector("#answer-btn-container");
      console.dir(btn);
      if (btn.offsetTop - btn.clientHeight > window.innerHeight) {
        btn.dataset.sticky = false;
      } else {
        btn.dataset.sticky = true;
      }
    };
  };
  useEffect(() => {
    onscroll();
    return () => onscroll()
  });

  return (
    <PageTrivia>
      <ContainerTrivia>
        <HeaderTriviaComponent />
        <CardTrivia>

          <CardHeaderTriviaComponent />
          <QATrivia />

          <AnswerBtnContainer id="answer-btn-container">
            <AnswerBtn>Responder</AnswerBtn>
          </AnswerBtnContainer>
          
        </CardTrivia>
      </ContainerTrivia>
    </PageTrivia>
  );
};

export default Trivia;
