import React from "react";
import { CardHeaderStyled } from "./card-header.categories.styles";
import ProgressBar from "../progress-bar.categories/progress-bar.categories.component";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectReports } from "../../../../redux/categories/categories.selectors";
import { actionSetReportReviewCategory } from "../../../../redux/report/report.actions";
import { actionResumeQuiz } from "../../../../redux/quiz/quiz.actions";

const mapStateToProps = createStructuredSelector({
  reports: selectReports,
});

const mapDispatchToProps = (dispatch) => ({
  setReportReviewCategory: (data) => dispatch(actionSetReportReviewCategory(data)),
  resumeQuiz: (data) => dispatch(actionResumeQuiz(data)),
});

const CardHeader = ({
  category,
  reports,
  setReportReviewCategory,
  resumeQuiz,
}) => {

  let report;
  if (category.completed !== 0) {
    report = reports[category.id];
  }

  return category.completed === 10 ? (
    <CardHeaderStyled>
      <span>{`${report.results.rights}/${
        report.results.rights + report.results.wrongs
      }`}</span>
      <Link onClick={() => setReportReviewCategory(category)} to="/report">
        see report
      </Link>
    </CardHeaderStyled>
  ) : (
    <CardHeaderStyled>
      <ProgressBar progress={report.results.rights + report.results.wrongs} />
      <Link onClick={() => resumeQuiz(category)} to="/quiz">
        continue
      </Link>
    </CardHeaderStyled>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CardHeader);
