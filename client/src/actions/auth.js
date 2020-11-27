import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      console.log(localStorage.getItem("token"));
      setAuthToken(localStorage.token);
    }

    const res = await axios.get("api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.message);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("api/users", formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.token,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await axios.post("api/auth", body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
