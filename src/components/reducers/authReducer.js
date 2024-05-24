const initialState = {
  isLoggedIn: false,
  idToken: null,
  userId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        idToken: action.payload.idToken,
        userId: action.payload.userId,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        idToken: null,
        userId: null,
      };
    default:
      return state;
  }
};

export default authReducer;
