import React from "react";
import {
  HeaderTrivia,
  CategoryName,
  CloseButton,
  CloseIcon,
} from "./header.trivia.styles";
import CloseBtn from "../../../../assets/img/close-btn.svg";

const HeaderTriviaComponent = () => {
  return (
        <HeaderTrivia>
          <CategoryName>Historia</CategoryName>
          <CloseButton>
            <CloseIcon src={CloseBtn} alt="close" tabIndex="-1" />
            Fechar
          </CloseButton>
        </HeaderTrivia>

  );
};

export default HeaderTriviaComponent;
