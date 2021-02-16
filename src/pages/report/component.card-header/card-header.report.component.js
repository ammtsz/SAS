import React from "react";
import Mascot from "../../../assets/img/mascot.svg";
import {
  CardHeaderTrivia,
  HeaderTitle,
  HeaderMessage,
  HeaderImage,
  HeaderText,
} from "./card-header.report.styles";

const CardHeader = ({ review, category }) => {
  
  const title = review ? category.name : "Congratulation!";
  const message = review ? "" : "You finished the quiz";

  return (
    <CardHeaderTrivia>
      <HeaderImage src={Mascot} />

      <HeaderText>
        <HeaderTitle>{title}</HeaderTitle>
        <HeaderMessage>{message}</HeaderMessage>
      </HeaderText>
    </CardHeaderTrivia>
  );
};

export default CardHeader;
