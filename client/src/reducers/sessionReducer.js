import { SET_CURRENT_USER, UPDATE_USER_AVATAR } from "../actions/session";

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {},
};

const sessionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user,
      };
    case UPDATE_USER_AVATAR:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.avatar,
        },
      };
    default:
      return state;
  }
};

export default sessionReducer;
