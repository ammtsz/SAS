import React from "react";
import Mascot from "../../../../assets/img/mascot.svg";
import {
  CardHeaderTrivia,
  HeaderTitle,
  HeaderMessage,
  HeaderImage,
  HeaderText,
} from "./card-header.report.styles";

const ReportHeaderFinished = () => {
// const title = "Historia"
const title = "Parabéns!"
// const message = ""
const message = "Você finalizou o teste"

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

export default ReportHeaderFinished;
