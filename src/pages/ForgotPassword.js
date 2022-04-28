import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as api from "../api";
import cookie from "react-cookies";

const ForgotPassword = () => {
  const [error, setError] = useState("");
  const [forgotDetails, setForgotDetails] = useState({
    email: "",
  });
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const forgot_password = async (forgotDetails) => {
    try {
      cookie.remove("token");
      cookie.remove("userId");
      cookie.remove("role");
      const { data } = await api.forgotPassword(forgotDetails);
      dispatch({ type: "FORGOT_PASSWORD", payload: data.data });
      setSuccess("Password reset mail sent!!!");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    forgot_password(forgotDetails);
  };
  return (
    <div className="donate">
      <section className="portion signUpPage">
        <div className="signup_title">
          <h3>Forgot!!</h3>
        </div>
        <form className="form2">
          <div className="sign_input">
            <input
              placeholder="email"
              type="email"
              name="email"
              id="email"
              value={forgotDetails.email}
              onChange={(e) =>
                setForgotDetails({ ...forgotDetails, email: e.target.value })
              }
            />
            <label htmlFor="email" className="required">
              email
            </label>
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
          <div
            style={
              Object.keys(success).length === 0
                ? { display: "none" }
                : { display: "grid" }
            }
          >
            <div />
            <p className="form_error log_error">{success}</p>
          </div>
          <button
            className="btn_donate"
            style={{ width: "100%" }}
            onClick={handleSubmit}
          >
            reset password
          </button>
        </form>
      </section>
    </div>
  );
};

export default ForgotPassword;
