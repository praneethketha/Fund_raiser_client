import React, { useState } from "react";
import "./CreateCampaign.css";

//ICONS
import { GoDiffAdded } from "react-icons/go";

import { useDispatch } from "react-redux";
import FileBase from "react-file-base64";
import cookie from "react-cookies";
import generate from "../utils/generateEmail";
import { useHistory } from "react-router-dom";
import * as api from "./../api";
import useGeoLocation from "../hooks/useGeoLocation";

const CreateCompaign = () => {
  const [errors, setErrors] = useState({});
  const [campaignData, setCampaignData] = useState({
    name: "",
    details: "",
    category: "",
    target_amount: 0,
    cover_pic: "",
    contact_number: 0,
    address: "",
    state: "",
    email: `${generate()}@email.com`,
    created_by: cookie.load("userId"),
    collected_amount: 0,
    certificates: [],
  });

  const location = useGeoLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleMultipleFiles = (files) => {
    let multiple_files = files.map((item) => item.base64);
    setCampaignData((prevState) => ({
      ...prevState,
      certificates: multiple_files,
    }));
  };

  const createNewCampaign = async (campaignData) => {
    try {
      if (location.loaded) {
        campaignData.location = {
          address: campaignData.address,
          coordinates: location.coordinates,
        };
      }
      const config = {
        headers: {
          authorization: `Bearer ${
            cookie.load("token") ? cookie.load("token") : ""
          }`,
        },
      };
      const { data } = await api.creteCampaign(campaignData, config);
      dispatch({ type: "CREATE_CAMPAIGN", payload: data.data.campaign });
      history.push("/");
    } catch (err) {
      setErrors(JSON.parse(err.response.data.message));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cookie.load("userId")) {
      history.push("/login");
    } else {
      createNewCampaign(campaignData);
    }
  };

  return (
    <div className="profile">
      <div className="portion">
        <div className="page_title">
          <h3 className="page_name">
            <GoDiffAdded className="padding_right" />
            Create Compaign
          </h3>
        </div>
        <div className="profile_content campaign_content">
          <div className="form3">
            <div className="single_field">
              <label htmlFor="campaign_title" className="required">
                campaign title
              </label>
              <input
                type="text"
                name="campaign_title"
                id="campaign_title"
                value={campaignData.name}
                onChange={(e) =>
                  setCampaignData({ ...campaignData, name: e.target.value })
                }
              />
            </div>
            <div
              className="error_field"
              style={
                Object.keys(errors).length === 0
                  ? { display: "none" }
                  : { display: "grid" }
              }
            >
              <div />
              <p className="form_error">{errors.name}</p>
            </div>
            <div className="single_field">
              <label htmlFor="campaign_contact" className="required">
                contact number
              </label>
              <input
                type="number"
                name="campaign_contact"
                id="campaign_contact"
                value={campaignData.contact_number}
                onChange={(e) =>
                  setCampaignData({
                    ...campaignData,
                    contact_number: e.target.value,
                  })
                }
              />
            </div>
            <div
              className="error_field"
              style={
                Object.keys(errors).length === 0
                  ? { display: "none" }
                  : { display: "grid" }
              }
            >
              <div />
              <p className="form_error">{errors.contact_number}</p>
            </div>
            <div className="single_field">
              <label htmlFor="campaign_address" className="required">
                address line
              </label>
              <textarea
                name="campaign_address"
                id="campaign_address"
                cols="30"
                rows="6"
                value={campaignData.address}
                onChange={(e) =>
                  setCampaignData({
                    ...campaignData,
                    address: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div
              className="error_field"
              style={
                Object.keys(errors).length === 0
                  ? { display: "none" }
                  : { display: "grid" }
              }
            >
              <div />
              <p className="form_error">{errors.address}</p>
            </div>
            <div className="single_field">
              <label htmlFor="campaign_state" className="required">
                state
              </label>
              <input
                type="text"
                name="campaign_state"
                id="campaign_state"
                value={campaignData.state}
                onChange={(e) =>
                  setCampaignData({ ...campaignData, state: e.target.value })
                }
              />
            </div>
            <div
              className="error_field"
              style={
                Object.keys(errors).length === 0
                  ? { display: "none" }
                  : { display: "grid" }
              }
            >
              <div />
              <p className="form_error">{errors.state}</p>
            </div>
            <div className="single_field">
              <label htmlFor="cover_images">cover images</label>
              <FileBase
                type="file"
                multiple={true}
                onDone={(files) => handleMultipleFiles(files)}
                id="cover_images"
              />
            </div>
          </div>
          <div className="form3">
            <div className="single_field">
              <label htmlFor="campaign_category" className="required">
                category
              </label>
              <select
                name="campaign_category"
                id="campaign_category"
                value={campaignData.category}
                onChange={(e) =>
                  setCampaignData({ ...campaignData, category: e.target.value })
                }
              >
                <option value="Select Category">Select Category</option>
                <option value="emergency">emergency</option>
                <option value="education">education</option>
                <option value="animals">animals</option>
                <option value="orphanages">orphanages</option>
                <option value="others">others</option>
              </select>
            </div>
            <div
              className="error_field"
              style={
                Object.keys(errors).length === 0
                  ? { display: "none" }
                  : { display: "grid" }
              }
            >
              <div />
              <p className="form_error">{errors.category}</p>
            </div>
            <div className="single_field">
              <label htmlFor="campaign_required" className="required">
                required fund
              </label>
              <input
                type="text"
                name="campaign_required"
                id="campaign_required"
                value={campaignData.target_amount}
                onChange={(e) =>
                  setCampaignData({
                    ...campaignData,
                    target_amount: e.target.value,
                  })
                }
              />
            </div>
            <div
              className="error_field"
              style={
                Object.keys(errors).length === 0
                  ? { display: "none" }
                  : { display: "grid" }
              }
            >
              <div />
              <p className="form_error">{errors.target_amount}</p>
            </div>
            <div className="single_field">
              <label htmlFor="campaign_about" className="required">
                about campaign
              </label>
              <textarea
                name="campaign_about"
                id="campaign_about"
                cols="30"
                rows="10"
                value={campaignData.details}
                onChange={(e) =>
                  setCampaignData({ ...campaignData, details: e.target.value })
                }
              ></textarea>
            </div>
            <div
              className="error_field"
              style={
                Object.keys(errors).length === 0
                  ? { display: "none" }
                  : { display: "grid" }
              }
            >
              <div />
              <p className="form_error">{errors.details}</p>
            </div>
            <div className="single_field">
              <label htmlFor="campaign_image" className="required">
                campaign image
              </label>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setCampaignData({ ...campaignData, cover_pic: base64 })
                }
                id="campaign_image"
              />
            </div>
            <div
              className="error_field"
              style={
                Object.keys(errors).length === 0
                  ? { display: "none" }
                  : { display: "grid" }
              }
            >
              <div />
              <p className="form_error">{errors.cover_pic}</p>
            </div>
          </div>
        </div>
        <div
          className="error_field"
          style={errors.login ? { display: "grid" } : { display: "none" }}
        >
          <div />
          <p className="form_error">{errors.login}</p>
        </div>
        <button className="btn_donate" onClick={handleSubmit}>
          {cookie.load("userId") ? "submit" : "log in"}
        </button>
      </div>
    </div>
  );
};

export default CreateCompaign;
