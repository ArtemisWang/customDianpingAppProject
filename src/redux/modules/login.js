const initialState = {
  username: localStorage.getItem('username') || '',
  password: "",
  isFetching: false,
  status: localStorage.getItem('login') || false //登录态标识
};

// action types
export const types = {
  LOGIN_REQUEST: "LOGIN/LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN/LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN/LOGIN_FAILURE",
  LOGOUT: "LOGIN/LOGOUT",
  SET_USERNAME: "LOGIN/SET_USERNAME",
  SET_PASSWORD: "LOGIN/SET_PASSWORD"
};

// action creators
export const actions = {
  // 异步action, 执行登录
  login: () => {
    return (dispatch, getState) => {
      const { username, password } = getState().login;
      if (
        !(username && username.length > 0 && password && password.length > 0)
      ) {
        return dispatch(loginFailure("用户名和秘密不能为空！"));
      }
      dispatch(loginRequest());
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          dispatch(loginSuccess());
          localStorage.setItem('username', username);
          localStorage.setItem('login', true);
          resolve();
        }, 1000);
      });
    };
  },
  logout: () => {
    localStorage.removeItem('username');
    localStorage.removeItem('login');
    return {
      type: types.LOGOUT
    };
  },
  setUsername: username => ({
    type: types.SET_USERNAME,
    username
  }),
  setPassword: password => ({
    type: types.SET_PASSWORD,
    password
  })
};

const loginRequest = () => ({
  type: types.LOGIN_REQUEST
});

const loginSuccess = () => ({
  type: types.LOGIN_SUCCESS
});

const loginFailure = error => ({
  type: types.LOGIN_FAILURE,
  error
});

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return { ...state, isFetching: true };
    case types.LOGIN_SUCCESS:
      return { ...state, isFetching: false, status: true };
    case types.LOGIN_FAILURE:
      return { ...state, isFetching: false };
    case types.LOGOUT:
      return { ...state, status: false, username: "", password: "" };
    case types.SET_USERNAME:
      return { ...state, username: action.username };
    case types.SET_PASSWORD:
      return { ...state, password: action.password };
    default:
      return state;
  }
};

export default reducer;

// selectors
export const getUsername = state => state.login.username;

export const getPassword = state => state.login.password;

export const isLogin = state => state.login.status;
