import React from "react";
import "./AlertComponent.css";

import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logOutUser } from "../actions/currentUser";
import cookie from "react-cookies";
import { update_user } from "../actions/users";

const AlertComponent = ({ msg, setAlerts }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogOut = () => {
    const config = {
      headers: {
        authorization: `Bearer ${
          cookie.load("token") ? cookie.load("token") : ""
        }`,
      },
    };
    dispatch(update_user(cookie.load("userId"), { active: false }, config));
    dispatch(logOutUser());
    history.push("/");
  };

  return (
    <div className="alert">
      <div className="alert_modal">
        <AiFillCloseCircle className="close" onClick={() => setAlerts(false)} />
        <p>{msg}</p>
        <button onClick={handleLogOut}>ok</button>
      </div>
    </div>
  );
};

export default AlertComponent;
