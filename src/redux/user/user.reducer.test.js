import { UserActionsTypes } from "./user.types";
import userReducer from "./user.reducer";

const INITIAL_STATE = {
  datas: null,
  persistence: false,
  theme: "light",
  error: null,
};

describe("userReducer", () => {
  it("should return initial state", () => {
    expect(userReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("should set 'datas' to payload", () => {
    const mockDatas = { id: "123456", displayName: "teste" };
    expect(
      userReducer(INITIAL_STATE, {
        type: UserActionsTypes.REDUCER_SET_USER,
        payload: mockDatas,
      }).datas
    ).toEqual(mockDatas);
  });

  it("should set 'persistence' to payload", () => {
    const mockPersistence = false;
    expect(
      userReducer(INITIAL_STATE, {
        type: UserActionsTypes.REDUCER_SET_PERSISTENCE,
        payload: mockPersistence,
      }).persistence
    ).toEqual(mockPersistence);
  });

  it("should set 'error' to payload", () => {
    const mockError = "error";
    expect(
      userReducer(INITIAL_STATE, {
        type: UserActionsTypes.REDUCER_SET_AUTH_ERROR,
        payload: mockError,
      }).error
    ).toEqual(mockError);
    expect(
      userReducer(INITIAL_STATE, {
        type: UserActionsTypes.REDUCER_SIGN_IN_FAILURE,
        payload: mockError,
      }).error
    ).toEqual(mockError);
    expect(
      userReducer(INITIAL_STATE, {
        type: UserActionsTypes.REDUCER_SIGN_OUT_FAILURE,
        payload: mockError,
      }).error
    ).toEqual(mockError);
    expect(
      userReducer(INITIAL_STATE, {
        type: UserActionsTypes.REDUCER_SIGN_UP_FAILURE,
        payload: mockError,
      }).error
    ).toEqual(mockError);
    expect(
      userReducer(INITIAL_STATE, {
        type: UserActionsTypes.REDUCER_SET_USER_ERROR,
        payload: mockError,
      }).error
    ).toEqual(mockError);
  });

  it("should set 'datas' to payload and 'error' to null", () => {
    const mockDatas = { id: "123456", displayName: "teste" };
    expect(
      userReducer(INITIAL_STATE, {
        type: UserActionsTypes.REDUCER_SIGN_IN_SUCCESS,
        payload: mockDatas,
      })
    ).toEqual({ ...INITIAL_STATE, error: null, datas: mockDatas });
  });

  it("should set 'datas' to null and 'error' to null", () => {
    expect(
      userReducer(INITIAL_STATE, {
        type: UserActionsTypes.REDUCER_SIGN_OUT_SUCCESS,
      })
    ).toEqual({ ...INITIAL_STATE, error: null, datas: null });
  });

  it("should set 'theme' to payload", () => {
    const mockTheme = "dark";
    expect(
      userReducer(INITIAL_STATE, {
        type: UserActionsTypes.REDUCER_SET_THEME,
        payload: mockTheme,
      }).theme
    ).toEqual(mockTheme);
  });

  it("should set 'theme' to 'light'", () => {
    expect(
      userReducer(INITIAL_STATE, {
        type: UserActionsTypes.REDUCER_RESET_THEME,
      }).theme
    ).toEqual("light");
  });
});
