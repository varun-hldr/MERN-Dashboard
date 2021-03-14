const initialState = {
  token: null,
  isAuth: false,
};

export default function authReducer(state, action) {
  state = state || initialState;
  switch (action.type) {
    case "AUTH_LOGIN":
      return {
        ...state,
        token: action.payload.TOKEN,
        isAuth: true,
      };
    case "AUTH_LOGOUT":
      return { ...state, token: null, isAuth: false };

    default:
      return state;
  }
}
