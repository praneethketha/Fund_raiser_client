import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import * as api from "../api";
import cookie from "react-cookies";

const Login = () => {
  const [login, setLogin] = useState(false);
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const logUser = async (credentials) => {
    try {
      setLogin(true);
      const { data } = await api.logTheUser(credentials);
      cookie.save("token", data.token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      cookie.save("userId", data.data.user._id, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      cookie.save("role", data.data.user.role, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      dispatch({ type: "LOG_IN", payload: data.data.user });
      history.push("/");
    } catch (err) {
      setError(err.response.data.message);
    }
    setLogin(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logUser(credentials);
  };

  return (
    <div className="donate">
      <section className="portion signUpPage">
        <div className="signup_title">
          <h3>Log In</h3>
        </div>
        <form className="form2">
          <div className="sign_input">
            <input
              placeholder="email"
              type="email"
              name="email"
              id="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
            <label htmlFor="email" className="required">
              email
            </label>
          </div>
          <div className="sign_input" style={{ marginBottom: "5px" }}>
            <input
              placeholder="password"
              type="password"
              name="password"
              id="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
            <label htmlFor="password" className="required">
              password
            </label>
          </div>
          <div className="signup_check login_check">
            <div />
            <Link className="forgot_password" to="/forgotPassword">
              forgot password
            </Link>
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
            {login ? "Logging..." : "Log In"}
          </button>
          <p style={{ marginTop: "1rem" }}>
            Don't you have an account?{" "}
            <Link className="login_sign" to="/signup">
              Create Now
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Login;
