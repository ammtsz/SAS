import { createSelector } from "reselect";

const selectCategories = (state) => state.categories;

export const selectReports = createSelector(
  [selectCategories],
  (categories) => categories.reports
);

export const selectAllCategories = createSelector(
  [selectCategories],
  (categories) => categories.allCategories
);

export const selectModalError = createSelector(
    [selectCategories],
    (categories) => categories.error
  );
