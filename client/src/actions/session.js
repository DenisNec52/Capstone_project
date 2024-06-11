import jwtDecode from "jwt-decode";
import * as userService from "../services/users";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const RECEIVE_SESSION_ERROR = "RECEIVE_SESSION_ERROR";
export const CLEAR_SESSION_ERROR = "CLEAR_SESSION_ERROR";
export const UPDATE_USER_AVATAR = "UPDATE_USER_AVATAR";

export const setAuthToken = (token) => {
  if (token) {
    userService.instance.defaults.headers.common["Authorization"] = token;
  } else {
    delete userService.instance.defaults.headers.common["Authorization"];
  }
};

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user,
});

export const receiveError = (error) => ({
  type: RECEIVE_SESSION_ERROR,
  error,
});

export const clearError = () => ({
  type: CLEAR_SESSION_ERROR,
});

export const signup = (userData) => async (dispatch) => {
  try {
    const response = await userService.signup(userData);
    const token = response.data.token;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwtDecode(token)));
  } catch (exception) {
    dispatch(receiveError(exception.response.data.error));
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    const response = await userService.login(userData);
    const token = response.data.token;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwtDecode(token)));
  } catch (exception) {
    dispatch(receiveError(exception.response.data.error));
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const updateUserAvatar = (avatarUrl) => async (dispatch) => {
  try {
    const response = await userService.updateAvatar({ avatar: avatarUrl });
    dispatch({
      type: UPDATE_USER_AVATAR,
      avatar: response.data.avatar,
    });
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decoded = jwtDecode(token);
      decoded.avatar = response.data.avatar;
      dispatch(setCurrentUser(decoded));
    }
  } catch (error) {
    dispatch(receiveError(error.response.data.error));
  }
};
