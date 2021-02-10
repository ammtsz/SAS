import React from "react";
import {
  HeaderTrivia,
  CategoryName,
  CloseButton,
  CloseIcon,
} from "./header.trivia.styles";
import CloseBtn from "../../../../assets/img/close-btn.svg";
import { withRouter } from "react-router-dom"

const HeaderTriviaComponent = ({ history }) => {
  const leaveQuiz = () => {
    history.push("/");
  };

  return (
    <HeaderTrivia>
      <CategoryName>Historia</CategoryName>
      <CloseButton onClick={() => leaveQuiz()}>
        <CloseIcon src={CloseBtn} alt="close" tabIndex="-1" />
        Fechar
      </CloseButton>
    </HeaderTrivia>
  );
};

export default withRouter(HeaderTriviaComponent);
