import { ReportActionsTypes } from "./report.types";

import {
  actionSetReportReview,
  actionSetReportCategory,
  actionSetReportReviewCategory,
  actionSetReportError,
  actionResetReport,
} from "./report.actions";

describe("report.actions", () => {
  describe("reducers actions", () => {
    it("should create the 'actionSetReportReview' action", () => {
      const mockReview = true;

      const action = actionSetReportReview(mockReview);

      expect(action.type).toEqual(ReportActionsTypes.REDUCER_SET_REPORT_REVIEW);
      expect(action.payload).toEqual(mockReview);
    });

    it("should create the 'actionSetReportCategory' action", () => {
      const mockCategory = { id: 1, name: "Television", comppleted: 10 };

      const action = actionSetReportCategory(mockCategory);

      expect(action.type).toEqual(
        ReportActionsTypes.REDUCER_SET_REPORT_CATEGORY
      );
      expect(action.payload).toEqual(mockCategory);
    });

    it("should create the 'actionSetReportReviewCategory' action", () => {
      const mockCategory = { id: 1, name: "Television", comppleted: 10 };

      const action = actionSetReportReviewCategory(mockCategory);

      expect(action.type).toEqual(
        ReportActionsTypes.REDUCER_SET_REPORT_REVIEW_CATEGORY
      );
      expect(action.payload).toEqual(mockCategory);
    });

    it("should create the 'actionSetReportError' action", () => {
      const mockError = "error";

      const action = actionSetReportError(mockError);

      expect(action.type).toEqual(ReportActionsTypes.REDUCER_SET_REPORT_ERROR);
      expect(action.payload).toEqual(mockError);
    });

    it("should create the 'actionResetReport' action", () => {
      expect(actionResetReport().type).toEqual(
        ReportActionsTypes.REDUCER_RESET_REPORT
      );
    });
  });
});
