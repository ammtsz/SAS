import React from "react";
import { CardHeaderStyled } from "./card-header.categories.styles";
import ProgressBar from "../component.progress-bar/progress-bar.categories.component";
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
  reports,
  setReportReviewCategory,
  resumeQuiz,
  category,
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

  const progress = report.results.rights + report.results.wrongs;

  return category.completed === 10 ? (
    <CardHeaderStyled>
      <div data-testid="card-header-results">{`${report.results.rights}/${
        report.results.rights + report.results.wrongs
      }`}</div>
      <span
        className="category-card__link"
        onClick={() => seeReport()}
        onKeyUp={(event) => {if(event.keyCode === 13) seeReport()}}
        role="button"
        aria-label={`see report for ${category.name} (quiz completed)`}
        tabIndex="0"
      >
        see report
      </span>
    </CardHeaderStyled>
  ) : (
    <CardHeaderStyled>
      <ProgressBar progress={progress} />
      <span
        className="category-card__link"
        onClick={() => continueQuiz()}
        onKeyUp={(event) => {if(event.keyCode === 13) continueQuiz()}}
        role="button"
        aria-label={`continue ${category.name} quiz (${progress} questions answered)`}
        tabIndex="0"
      >
        continue
      </span>
    </CardHeaderStyled>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CardHeader);
