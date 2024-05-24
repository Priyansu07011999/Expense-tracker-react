export const loginSuccess = (idToken) => ({
    type: 'LOGIN_SUCCESS',
    payload: idToken,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  