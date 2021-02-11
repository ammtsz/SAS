import { ReportActionsTypes } from "./report.types";

const INITIAL_STATE = {
  review: false,
  category: null,
};

const reportReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReportActionsTypes.REDUCER_SET_REPORT_REVIEW:
      return { ...state, review: action.payload };

    case ReportActionsTypes.REDUCER_SET_REPORT_CATEGORY:
      return { ...state, category: action.payload };

    case ReportActionsTypes.REDUCER_SET_REPORT_REVIEW_CATEGORY:
      return { ...state, review: true, category: action.payload };

    case ReportActionsTypes.REDUCER_RESET_REPORT:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default reportReducer;
