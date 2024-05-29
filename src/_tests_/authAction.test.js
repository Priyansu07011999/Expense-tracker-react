import { loginSuccess, logout } from '../components/actions/authActions';

describe('loginSuccess action creator', () => {
  test('returns the correct action object', () => {
    const idToken = 'some-id-token';
    const expectedAction = {
      type: 'LOGIN_SUCCESS',
      payload: idToken,
    };
    expect(loginSuccess(idToken)).toEqual(expectedAction);
  });
});

describe('logout action creator', () => {
  test('returns the correct action object', () => {
    const expectedAction = {
      type: 'LOGOUT',
    };
    expect(logout()).toEqual(expectedAction);
  });
});
