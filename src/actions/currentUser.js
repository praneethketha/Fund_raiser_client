import * as api from "./../api";
import cookie from "react-cookies";

export const logTheUser = (user_details) => {
  return user_details;
};

export const logOutUser = () => {
  cookie.remove("token");
  cookie.remove("userId");
  cookie.remove("role");
  return { type: "LOG_OUT" };
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOAD_START" });
    const { data } = await api.getUser(id);
    dispatch({ type: "GET_USER", payload: data.data.user });
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const updateCurrentUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.updateCurrentUser(user);
    dispatch({ type: "UPDATE_USER", payload: data.data.user });
  } catch (err) {
    console.log(err);
  }
};
