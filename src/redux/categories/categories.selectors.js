import { createSelector } from "reselect";

const selectCategories = (state) => state.categories;

export const selectCategoriesReports = createSelector(
  [selectCategories],
  (categories) => categories.reports
);

export const selectAllCategories = createSelector(
  [selectCategories],
  (categories) => categories.allCategories
);

export const selectCategoriesLoading = createSelector(
  [selectCategories],
  (categories) => categories.loading
);

export const selectModalError = createSelector(
    [selectCategories],
    (categories) => categories.error
  );
