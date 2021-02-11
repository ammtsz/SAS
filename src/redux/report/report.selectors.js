import { createSelector } from "reselect";

const selectReport = (state) => state.report;

export const selectReportReview = createSelector(
  [selectReport],
  (report) => report.review
);

export const selectReportCategory = createSelector(
  [selectReport],
  (report) => report.category
);
