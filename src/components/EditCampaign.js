import React from "react";
import { useDispatch } from "react-redux";
import { RiCloseFill } from "react-icons/ri";
import FileBase from "react-file-base64";
import cookie from "react-cookies";

import * as api from "./../api";

const EditCampaign = ({ currentCampaign, setCurrentCampaign }) => {
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${
            cookie.load("token") ? cookie.load("token") : ""
          }`,
        },
      };

      const { data } = await api.updateCampaign(
        currentCampaign._id,
        currentCampaign,
        config
      );
      dispatch({
        type: "UPDATE_CURRENT_CAMPAIGN",
        payload: data.data.campaign,
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const handleRemoveCover = () => {
    setCurrentCampaign((prevState) => ({ ...prevState, cover_pic: "" }));
  };

  const handleMultipleFiles = (files) => {
    let multiple_files = files.map((item) => item.base64);
    let updated_pics = currentCampaign.certificates.concat(multiple_files);
    setCurrentCampaign((prevState) => ({
      ...prevState,
      certificates: updated_pics,
    }));
  };

  const handleRemovePics = (index) => {
    let remaining_images = currentCampaign.certificates.filter(
      (item, i) => i !== index
    );
    setCurrentCampaign((prevState) => ({
      ...prevState,
      certificates: remaining_images,
    }));
  };

  return (
    <div className="user_campaigns_form">
      <h4>Edit Campaign</h4>
      <div className="flex_fields">
        <section>
          <div className="single_field">
            <label htmlFor="user_campaign_title" className="required">
              title
            </label>
            <input
              type="text"
              name="user_campaign_title"
              id="user_campaign_title"
              value={currentCampaign.name}
              onChange={(e) =>
                setCurrentCampaign({ ...currentCampaign, name: e.target.value })
              }
            />
          </div>
          <div className="single_field">
            <label htmlFor="user_campiagn_required" className="required">
              required fund
            </label>
            <input
              type="number"
              name="user_campiagn_required"
              id="user_campiagn_required"
              value={currentCampaign.target_amount}
              onChange={(e) =>
                setCurrentCampaign({
                  ...currentCampaign,
                  target_amount: e.target.value,
                })
              }
            />
          </div>
          <div className="single_field">
            <label htmlFor="user_campaign_collected">collected fund</label>
            <input
              type="number"
              name="user_campaign_collected"
              id="user_campaign_collected"
              value={currentCampaign.collected_amount}
              onChange={(e) =>
                setCurrentCampaign({
                  ...currentCampaign,
                  collected_amount: e.target.value,
                })
              }
            />
          </div>
          <div className="single_field">
            <label htmlFor="user_campaign_contact" className="required">
              contact number
            </label>
            <input
              type="number"
              name="user_campaign_contact"
              id="user_campaign_contact"
              value={currentCampaign.contact_number}
              onChange={(e) =>
                setCurrentCampaign({
                  ...currentCampaign,
                  contact_number: e.target.value,
                })
              }
            />
          </div>
        </section>
        <section>
          <div className="single_field">
            <label htmlFor="user_campiagn_state" className="required">
              state
            </label>
            <input
              type="text"
              name="user_campiagn_state"
              id="user_campiagn_state"
              value={currentCampaign.state}
              onChange={(e) =>
                setCurrentCampaign({
                  ...currentCampaign,
                  state: e.target.value,
                })
              }
            />
          </div>
          <div className="single_field">
            <label htmlFor="user_campaign_address" className="required">
              address
            </label>
            <textarea
              name="user_campaign_address"
              id="user_campaign_address"
              rows="4"
              cols="10"
              value={currentCampaign.location.address}
              onChange={(e) =>
                setCurrentCampaign({
                  ...currentCampaign,
                  location: {
                    ...currentCampaign.location,
                    address: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="single_field">
            <label htmlFor="user_campiagn_category" className="required">
              category
            </label>
            <input
              type="text"
              name="user_campiagn_category"
              id="user_campiagn_category"
              value={currentCampaign.category}
              onChange={(e) =>
                setCurrentCampaign({
                  ...currentCampaign,
                  category: e.target.value,
                })
              }
            />
          </div>
        </section>
      </div>
      <div className="flex_fields">
        <div className="single_field">
          <label htmlFor="campaign_about" className="required">
            about campaign
          </label>
          <textarea
            name="campaign_about"
            id="campaign_about"
            rows="5"
            style={{ width: "300%", marginLeft: "2rem" }}
            value={currentCampaign.details}
            onChange={(e) =>
              setCurrentCampaign({
                ...currentCampaign,
                details: e.target.value,
              })
            }
          ></textarea>
        </div>
      </div>
      <div className="flex_fields flex_start">
        <article>
          <h3>cover images:</h3>
          <div className="user_campiagn_images">
            {currentCampaign.certificates.map((x, index) => {
              return (
                <article className="single_user_campaign_img" key={index}>
                  <section
                    className="user_cover_image_close"
                    onClick={() => handleRemovePics(index)}
                  >
                    <RiCloseFill />
                  </section>
                  <img src={x} alt="" />
                </article>
              );
            })}
          </div>
          <FileBase
            type="file"
            multiple={true}
            onDone={(files) => handleMultipleFiles(files)}
          />
        </article>
        <article>
          <h3>campaign image:</h3>
          {currentCampaign.cover_pic ? (
            <article
              className="single_user_campaign_img"
              style={{ marginBottom: "1rem" }}
            >
              <section
                className="user_cover_image_close"
                onClick={handleRemoveCover}
              >
                <RiCloseFill />
              </section>
              <img src={currentCampaign.cover_pic} alt="" />
            </article>
          ) : (
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setCurrentCampaign({ ...currentCampaign, cover_pic: base64 })
              }
            />
          )}
        </article>
      </div>
      <article className="flex_btn">
        <button className="btn_donate" onClick={handleSubmit}>
          submit
        </button>
      </article>
    </div>
  );
};

export default EditCampaign;
