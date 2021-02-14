import React from "react";
import { PageReport, CardReport } from "./report-page.styles";
import ReportHeader from "./card-header.report/card-header.report.component";
import ReportBody from "./card-body.report/card-body.report.component";

import { connect } from "react-redux";
import { actionFinishQuiz } from "../../redux/quiz/quiz.actions";

import { withRouter } from "react-router-dom";
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
  finishQuiz: (data) => dispatch(actionFinishQuiz(data)),
  resetReport: (data) => dispatch(actionResetReport(data)),
});

const Report = (props) => {
  const { reportReview, reportCategory, quizCategory } = props;

  let category = reportReview ? reportCategory : quizCategory;

  return (
    <PageReport>
      <CardReport>
        <ReportHeader review={reportReview} category={category}/>
        <ReportBody {...props} category={category} />
      </CardReport>
    </PageReport>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Report));
