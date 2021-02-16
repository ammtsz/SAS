import React from "react";
import {
  GoBackBtn,
  CardBodyTrivia,
  BodyTitle,
  ResultsSumary,
  ResultsDetails,
} from "./card-body.report.styles";

const ReportBody = ({
  reports,
  category,
  finishQuiz,
  resetReport,
}) => {

  const reportDatas = reports[category.id].results;

  return (
    <CardBodyTrivia>
      <BodyTitle>Check your performance</BodyTitle>
        <ResultsSumary>
        <div>
          <div className="sumary__number" data-testid="report-rights">{reportDatas.rights}</div>
          <div className="sumary__text">Correct</div>
        </div>
        <div>
          <div className="sumary__number"  data-testid="report-wrongs">{reportDatas.wrongs}</div>
          <div className="sumary__text">Incorrect</div>
        </div>
      </ResultsSumary>
      <ResultsDetails>
        {Object.keys(reportDatas.difficulty).map((difficulty) => (
          <div key={difficulty} className="level__details" data-testid="report-level-details">
            <h6 className="level__details--title">{difficulty[0].toUpperCase() + difficulty.substring(1)}</h6>
            <p className="level__details--info" data-testid={`report-${difficulty}-rights`}>
              Correct: {reportDatas.difficulty[difficulty].rights}
            </p>
            <p className="level__details--info" data-testid={`report-${difficulty}-wrongs`}>
              Incorrect: {reportDatas.difficulty[difficulty].wrongs}
            </p>
          </div>
        ))}
      </ResultsDetails>
      <GoBackBtn onClick={() => {
        finishQuiz()
        resetReport()
      }}>
        Go to Homepage
      </GoBackBtn>
    </CardBodyTrivia>
  );
};

export default (ReportBody);
