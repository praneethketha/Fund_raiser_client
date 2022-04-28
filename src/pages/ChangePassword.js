import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import cookie from "react-cookies";
import * as api from "../api";

const ChangePassword = () => {
  const [error, setError] = useState("");
  const [formError, setFormError] = useState({});
  const [forgotDetails, setForgotDetails] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const change_password = async (forgotDetails) => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${
            cookie.load("token") ? cookie.load("token") : ""
          }`,
        },
      };
      const { data } = await api.changePassword(forgotDetails, config);
      cookie.save("token", data.token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      cookie.save("userId", data.data.user._id, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      cookie.save("role", data.data.user.role, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      dispatch({ type: "RESET_PASSWORD", payload: data.data.user });
      history.goBack();
    } catch (err) {
      const er = err.response.data.message;
      if (er.startsWith("{")) {
        setError("");
        setFormError(JSON.parse(er));
      } else {
        setError(er);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    change_password(forgotDetails);
  };
  return (
    <div className="donate">
      <section className="portion signUpPage">
        <div className="signup_title">
          <h3>Password change</h3>
        </div>
        <form className="form2">
          <div className="sign_input">
            <input
              placeholder="current password"
              type="password"
              name="password"
              id="password_current"
              value={forgotDetails.passwordCurrent}
              onChange={(e) =>
                setForgotDetails({
                  ...forgotDetails,
                  passwordCurrent: e.target.value,
                })
              }
            />
            <label htmlFor="password_current" className="required">
              current password
            </label>
          </div>
          <div className="sign_input">
            <input
              placeholder="password"
              type="password"
              name="password"
              id="change_password"
              value={forgotDetails.password}
              onChange={(e) =>
                setForgotDetails({ ...forgotDetails, password: e.target.value })
              }
            />
            <label htmlFor="change_password" className="required">
              password
            </label>
          </div>
          <div
            style={
              Object.keys(formError).length === 0
                ? { display: "none" }
                : { display: "grid" }
            }
          >
            <div />
            <p className="form_error log_error">{formError.password}</p>
          </div>
          <div className="sign_input">
            <input
              placeholder="password confirm"
              type="password"
              name="passwordconfirm"
              id="change_password_confirm"
              value={forgotDetails.passwordConfirm}
              onChange={(e) =>
                setForgotDetails({
                  ...forgotDetails,
                  passwordConfirm: e.target.value,
                })
              }
            />
            <label htmlFor="change_password_confirm" className="required">
              confirm password
            </label>
          </div>
          <div
            style={
              Object.keys(formError).length === 0
                ? { display: "none" }
                : { display: "grid" }
            }
          >
            <div />
            <p className="form_error log_error">{formError.passwordConfirm}</p>
          </div>
          <div
            style={
              Object.keys(error).length === 0
                ? { display: "none" }
                : { display: "grid" }
            }
          >
            <div />
            <p className="form_error log_error">{error}</p>
          </div>
          <button
            className="btn_donate"
            style={{ width: "100%" }}
            onClick={handleSubmit}
          >
            change password
          </button>
        </form>
      </section>
    </div>
  );
};

export default ChangePassword;
