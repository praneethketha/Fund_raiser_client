import React, { useState } from "react";
import "./Editprofile.css";
import { useDispatch, useSelector } from "react-redux";
// import { updateCurrentUser } from "../actions/currentUser";
import { useHistory } from "react-router-dom";
import FileBase from "react-file-base64";
import cookie from "react-cookies";
import * as api from "../api";

const EditProfile = () => {
  const { currentUser } = useSelector((state) => state.currentUser);

  const [error, setError] = useState({
    name: "",
    email: "",
    contact_number: "",
  });

  const [currUser, setCurrUser] = useState({
    name: currentUser.name,
    email: currentUser.email,
    address: currentUser.address,
    contact_number: currentUser.contact_number,
    photo: currentUser.photo,
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const update_me = async (user) => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${
            cookie.load("token") ? cookie.load("token") : ""
          }`,
        },
      };
      const { data } = await api.updateCurrentUser(user, config);
      dispatch({ type: "UPDATE_USER", payload: data.data.user });
      history.goBack();
    } catch (err) {
      setError(JSON.parse(err.response.data.message));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update_me(currUser);
  };
  return (
    <div className="profile">
      <div className="portion">
        <div className="page_title">
          <div className="page_name">
            <h3>Edit Profile</h3>
          </div>
        </div>
        <div className="profile_content edit_profile">
          <section className="profile_pic">
            <p>active {currentUser.role}</p>
            <img src={currUser.photo} alt="" />
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setCurrUser({ ...currUser, photo: base64 })
              }
            />
          </section>
          <div className="form3">
            <div className="single_field">
              <label htmlFor="Nick_Name">nick name</label>
              <input
                type="text"
                name="Nick_Name"
                id="Nick_Name"
                value={currUser.name}
                onChange={(e) =>
                  setCurrUser({ ...currUser, name: e.target.value })
                }
              />
            </div>
            <div
              className="error_field"
              style={!error.name ? { display: "none" } : { display: "grid" }}
            >
              <div />
              <p className="form_error">{error.name}</p>
            </div>
            <div className="single_field">
              <label htmlFor="email">email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={currUser.email}
                onChange={(e) =>
                  setCurrUser({ ...currUser, email: e.target.value })
                }
              />
            </div>
            <div
              className="error_field"
              style={!error.email ? { display: "none" } : { display: "grid" }}
            >
              <div />
              <p className="form_error">{error.email}</p>
            </div>
            <div className="single_field">
              <label htmlFor="Contact_number">Phone number</label>
              <input
                type="number"
                name="Contact_number"
                id="Contact_number"
                value={currUser.contact_number}
                onChange={(e) =>
                  setCurrUser({ ...currUser, contact_number: e.target.value })
                }
              />
            </div>
            <div
              className="error_field"
              style={
                !error.contact_number
                  ? { display: "none" }
                  : { display: "grid" }
              }
            >
              <div />
              <p className="form_error">{error.contact_number}</p>
            </div>
            <div className="single_field">
              <label htmlFor="address">address line</label>
              <textarea
                name="address"
                id="address"
                cols="30"
                rows="10"
                value={currUser.address}
                onChange={(e) =>
                  setCurrUser({ ...currUser, address: e.target.value })
                }
              ></textarea>
            </div>
            <div className="single_field">
              <div />
              <button className="btn_donate" onClick={handleSubmit}>
                save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
