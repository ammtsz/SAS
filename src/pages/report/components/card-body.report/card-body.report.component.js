import React from "react";
import {
  GoBackBtn,
  CardBodyTrivia,
  BodyTitle,
  ResultsSumary,
  ResultsDetails,
} from "./card-body.report.styles";

const ReportBody = () => {
  const results = [
    { level: "Facil", rights: 2, wrongs: 1 },
    { level: "Medio", rights: 3, wrongs: 1 },
    { level: "Dificil", rights: 1, wrongs: 2 },
  ];

  return (
    <CardBodyTrivia>
      <BodyTitle>Veja seu desempenho nas questões</BodyTitle>
      <ResultsSumary>
        <div>
          <div className="sumary__number">7</div>
          <div className="sumary__text">acertos</div>
        </div>
        <div>
          <div className="sumary__number">3</div>
          <div className="sumary__text">erros</div>
        </div>
      </ResultsSumary>
      <ResultsDetails>
        {results.map(({ level, rights, wrongs }) => (
          <div className="level__details">
            <h6 className="level__details--title">{level}</h6>
            <p className="level__details--info">Acertos: {rights}</p>
            <p className="level__details--info">Erros: {wrongs}</p>
          </div>
        ))}
      </ResultsDetails>
      <GoBackBtn>Voltar ao início</GoBackBtn>
    </CardBodyTrivia>
  );
};

export default ReportBody;
