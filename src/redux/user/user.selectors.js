import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCredentials = createSelector(
  [selectUser],
  (user) => user.credentials
);
export const selectAuthError = createSelector(
  [selectUser],
  (user) => user.error
);
export const selectPersistence = createSelector(
  [selectUser],
  (user) => user.persistence
);
