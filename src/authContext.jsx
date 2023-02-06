import React, { useReducer, useEffect } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
  case "LOGIN":
  const { user, token, role } = action.payload;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  return {
  ...state,
  isAuthenticated: true,
  user,
  token,
  role,
  };
  case "LOGOUT":
  localStorage.clear();
  return {
  ...state,
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
  };
  default:
  return state;
  }
  };

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
  dispatch({
  type: "LOGOUT",
  });
  window.location.href = "/" + role + "/login";
  }
  };

  const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (user && token && role) {
      sdk.setToken(token);
      dispatch({
        type: "LOGIN",
        payload: { user: JSON.parse(user), token, role },
      });
    }
  }, []);    

  return (
    <AuthContext.Provider
    value={{
    state,
    dispatch,
    }}
    >
    {children}
    </AuthContext.Provider>
    );
    };
export default AuthProvider;
