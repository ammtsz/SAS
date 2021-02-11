import { ReportActionsTypes } from "./report.types";

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
export const actionResetReport = (data) => ({
  type: ReportActionsTypes.REDUCER_SET_REPORT_REVIEW_CATEGORY,
  payload: data,
});
