import React from "react";
import { CardHeaderStyled } from "./card-header.categories.styles";
import ProgressBar from "../progress-bar.categories/progress-bar.categories.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectReports } from "../../../redux/categories/categories.selectors";
import { actionSetReportReviewCategory } from "../../../redux/report/report.actions";
import { actionResumeQuiz } from "../../../redux/quiz/quiz.actions";

const mapStateToProps = createStructuredSelector({
  reports: selectReports,
});

const mapDispatchToProps = (dispatch) => ({
  setReportReviewCategory: (data) =>
    dispatch(actionSetReportReviewCategory(data)),
  resumeQuiz: (data) => dispatch(actionResumeQuiz(data)),
});

const CardHeader = ({
  category,
  reports,
  setReportReviewCategory,
  resumeQuiz,
  history,
}) => {
  let report = { results: { rights: 0, wrongs: 0 } };
  if (category.completed !== 0 && reports[category.id]) {
    report = reports[category.id];
  }

  const seeReport = () => {
    setReportReviewCategory(category);
    history.push("/report");
  };

  const continueQuiz = () => {
    resumeQuiz(category);
    history.push("/quiz");
  };

  return category.completed === 10 ? (
    <CardHeaderStyled>
      <span>{`${report.results.rights}/${
        report.results.rights + report.results.wrongs
      }`}</span>
      <span className="category-card__link" onClick={() => seeReport()}>
        see report
      </span>
    </CardHeaderStyled>
  ) : (
    //rights in green and wrongs in red, add aria-label
    <CardHeaderStyled>
      <ProgressBar progress={report.results.rights + report.results.wrongs} />
      <span className="category-card__link" onClick={() => continueQuiz()}>
        continue
      </span>
    </CardHeaderStyled>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CardHeader);
