import React from "react";
import { PageReport, CardReport } from "./report-page.styles";

import ReportHeader from "./component.card-header/card-header.report.component";
import ReportBody from "./component.card-body/card-body.report.component";

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { actionFinishQuiz } from "../../redux/quiz/quiz.actions";
import { createStructuredSelector } from "reselect";

import { selectReports } from "../../redux/categories/categories.selectors";
import { selectQuizCategory } from "../../redux/quiz/quiz.selectors";
import {
  selectReportReview,
  selectReportCategory,
} from "../../redux/report/report.selectors";
import { actionResetReport } from "../../redux/report/report.actions";

const mapStateToProps = createStructuredSelector({
  reports: selectReports,
  quizCategory: selectQuizCategory,
  reportReview: selectReportReview,
  reportCategory: selectReportCategory,
});

const mapDispatchToProps = (dispatch) => ({
  resetReport: (data) => dispatch(actionResetReport(data)),
  finishQuiz: (data) => dispatch(actionFinishQuiz(data)),
});

const Report = (props) => {
  const { quizCategory, reportCategory, reportReview } = props;

  let category = reportReview ? reportCategory : quizCategory;

  return (
    <PageReport data-testid="report-page">
      <CardReport>
        <ReportHeader review={reportReview} category={category} />
        <ReportBody {...props} category={category} />
      </CardReport>
    </PageReport>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Report));
