import { ReportActionsTypes } from "./report.types";
import reportReducer from "./report.reducer";

const INITIAL_STATE = {
  review: false,
  category: null,
  error: null,
};

describe("reportReducer", () => {
  it("should return initial state", () => {
    expect(reportReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("should set 'review' to payload", () => {
    const mockReview = true;
    expect(
      reportReducer(INITIAL_STATE, {
        type: ReportActionsTypes.REDUCER_SET_REPORT_REVIEW,
        payload: mockReview,
      }).review
    ).toEqual(mockReview);
  });

  it("should set 'category' to payload", () => {
    const mockCategory = { id: 1, name: "Computers" };
    expect(
      reportReducer(INITIAL_STATE, {
        type: ReportActionsTypes.REDUCER_SET_REPORT_CATEGORY,
        payload: mockCategory,
      }).category
    ).toEqual(mockCategory);
  });

  it("should set 'category' to payload and 'review' to true", () => {
    const mockCategory = { id: 1, name: "Computers" };
    expect(
      reportReducer(INITIAL_STATE, {
        type: ReportActionsTypes.REDUCER_SET_REPORT_REVIEW_CATEGORY,
        payload: mockCategory,
      })
    ).toEqual({ ...INITIAL_STATE, review: true, category: mockCategory });
  });

  it("should set 'error' to payload", () => {
    expect(
      reportReducer(INITIAL_STATE, {
        type: ReportActionsTypes.REDUCER_SET_REPORT_ERROR,
        payload: "error",
      }).error
    ).toEqual("error");
  });

  it("should reset quiz", () => {
    expect(
      reportReducer(INITIAL_STATE, {
        type: ReportActionsTypes.REDUCER_RESET_REPORT,
      })
    ).toEqual(INITIAL_STATE);
  });
});
