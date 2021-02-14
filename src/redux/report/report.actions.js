import { ReportActionsTypes } from "./report.types";

//REDUCERS
export const actionSetReportReview = (data) => ({
  type: ReportActionsTypes.REDUCER_SET_REPORT_REVIEW,
  payload: data,
});
export const actionSetReportCategory = (data) => ({
  type: ReportActionsTypes.REDUCER_SET_REPORT_CATEGORY,
  payload: data,
});
export const actionSetReportReviewCategory = (data) => ({
  type: ReportActionsTypes.REDUCER_SET_REPORT_REVIEW_CATEGORY,
  payload: data,
});
export const actionResetReport = () => ({
  type: ReportActionsTypes.REDUCER_RESET_REPORT,
});
