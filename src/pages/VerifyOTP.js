import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as api from "../api";
import cookie from "react-cookies";

const VerifyOTP = () => {
  const [verifing, setVerifing] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useSelector((state) => state.currentUser);
  const [credentials, setCredentials] = useState({
    user_id: "",
    otp: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const verify = async (otpInfo) => {
    try {
      setVerifing(true);
      setCredentials({ ...credentials, user_id: `${currentUser.userId}` });
      if (typeof credentials.user_id === "string" && credentials.user_id) {
        const { data } = await api.verifyOTP(otpInfo);
        cookie.save("token", data.token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        cookie.save("userId", data.data.user._id, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        cookie.save("role", data.data.user.role, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        dispatch({ type: "VERIFY_OTP", payload: data.data.user });
        history.push("/");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
    setVerifing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    verify(credentials);
  };
  return (
    <div className="donate">
      <section className="portion signUpPage">
        <div className="signup_title">
          <h3>Verify OTP</h3>
        </div>
        <form className="form2">
          <div className="sign_input">
            <input
              placeholder="OTP"
              type="password"
              name="password"
              id="otp"
              value={credentials.otp}
              onChange={(e) =>
                setCredentials({ ...credentials, otp: e.target.value })
              }
            />
            <label htmlFor="otp" className="required">
              OTP
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
          <button
            className="btn_donate"
            style={{ width: "100%" }}
            onClick={handleSubmit}
          >
            {verifing ? "Verifing..." : "Verify"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default VerifyOTP;
