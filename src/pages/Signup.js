import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import * as api from "../api";
import "./Signup.css";
const Signup = () => {
  const [error, setError] = useState({});
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    passwordConfirm: "",
    address: "",
    contact_number: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const signup = async (newUser) => {
    try {
      const { data } = await api.createUser(newUser);
      dispatch({ type: "CREATE_USER", payload: data.data });
      history.push("/verifyOTP");
    } catch (err) {
      console.log(err.response);
      setError(JSON.parse(err.response.data.message));
    }
  };

  const handleSubmit = () => {
    signup(user);
  };

  return (
    <div className="donate">
      <section className="portion signUpPage" style={{ width: "60vw" }}>
        <div className="signup_title">
          <h3>Sign Up</h3>
        </div>
        <div className="signup_content">
          <form className="form2">
            <div className="sign_input">
              <input
                placeholder="nick name"
                type="text"
                name="nickname"
                id="nick_name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
              <label htmlFor="nick_name" className="required">
                nick name
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
              <p className="form_error log_error">{error.name}</p>
            </div>
            <div className="sign_input">
              <input
                placeholder="email"
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
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
              <p className="form_error log_error">{error.email}</p>
            </div>
            <div className="sign_input">
              <input
                placeholder="contact number"
                type="number"
                name="contact_number"
                id="contact_name"
                value={user.contact_number}
                onChange={(e) =>
                  setUser({ ...user, contact_number: e.target.value })
                }
              />
              <label htmlFor="contact_number" className="required">
                contact number
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
              <p className="form_error log_error">{error.contact_number}</p>
            </div>
            <div className="sign_input">
              <select
                name="role"
                id="role"
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="donar"> Donar</option>
                <option value="fundraiser">Fund Raiser</option>
              </select>
            </div>
          </form>
          <form className="form2">
            <div className="sign_input">
              <textarea
                name="adress_line"
                id="adress_line"
                cols="30"
                rows="10"
                placeholder="address"
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              ></textarea>
              <label htmlFor="adress_line">Address Line</label>
            </div>
            <div
              style={
                Object.keys(error).length === 0
                  ? { display: "none" }
                  : { display: "grid" }
              }
            >
              <div />
              <p className="form_error log_error">{error.address}</p>
            </div>
            <div className="sign_input">
              <input
                placeholder="password"
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <label htmlFor="password" className="required">
                password
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
              <p className="form_error log_error">{error.password}</p>
            </div>
            <div className="sign_input">
              <input
                placeholder="passwordConfirm"
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                value={user.passwordConfirm}
                onChange={(e) =>
                  setUser({ ...user, passwordConfirm: e.target.value })
                }
              />
              <label htmlFor="passwordConfirm" className="required">
                password confirm
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
              <p className="form_error log_error">{error.passwordConfirm}</p>
            </div>
          </form>
        </div>
        <button
          className="btn_donate"
          style={{ width: "50%" }}
          onClick={handleSubmit}
        >
          sign up
        </button>
        <div className="signup_check">
          <Link className="forgot_password" to="/forgotPassword">
            forgot password
          </Link>
          <p>
            If you already have an account!{" "}
            <Link className="login_sign" to="/login">
              log in
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Signup;
