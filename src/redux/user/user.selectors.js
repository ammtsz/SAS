import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectUserDatas = createSelector(
  [selectUser],
  (user) => user.datas
);
export const selectAuthError = createSelector(
  [selectUser],
  (user) => user.error
);
export const selectPersistence = createSelector(
  [selectUser],
  (user) => user.persistence
);
