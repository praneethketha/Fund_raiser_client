import React, { useState } from "react";
import "./Donation.css";

//ICONS
import { FaWallet } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";
import cookie from "react-cookies";
import { donate } from "../api";
import { useDispatch, useSelector } from "react-redux";

const Donate = () => {
  const { campaigns } = useSelector((state) => state.campaigns);
  const [errors, setErrors] = useState("");
  const { campaign, id } = useParams();
  const [donation, setDonation] = useState({
    user: cookie.load("userId"),
    campaign: id || "",
    donated_amount: 0,
    comments: "",
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const donate_now = async (donation) => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${
            cookie.load("token") ? cookie.load("token") : ""
          }`,
        },
      };
      const { data } = await donate(donation, config);
      dispatch({ type: "DONATE_NOW", payload: data.data.campaign });
      history.push("/");
    } catch (err) {
      setErrors(err.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    donate_now(donation);
  };
  return (
    <div className="donate">
      <section className="portion">
        <div className="page_title">
          <h3 className="page_name">
            {" "}
            <FaWallet className="padding_right" />
            Donate
          </h3>
        </div>
        <form className="form1" onSubmit={handleSubmit}>
          {campaign ? (
            <div className="single_field">
              <label htmlFor="campaign_name">Campaign</label>
              <input
                type="text"
                name="campaign_name"
                id="campaign_name"
                defaultValue={campaign.toUpperCase()}
              />
            </div>
          ) : (
            <div className="single_field">
              <label htmlFor="select_campaign">Campaign</label>
              <select
                name="select_campaign"
                id="select_campaign"
                style={{ width: "300px" }}
                value={donation.campaign}
                onChange={(e) =>
                  setDonation({ ...donation, campaign: e.target.value })
                }
              >
                {campaigns.map((item) => {
                  return (
                    <option value={item._id} key={item._id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          <div className="single_field">
            <label htmlFor="donation_amount">Donation amount</label>{" "}
            <input
              type="text"
              name="donation_amount"
              id="donation_amount"
              value={donation.donated_amount}
              onChange={(e) =>
                setDonation({ ...donation, donated_amount: e.target.value })
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
            <p className="form_error">{errors}</p>
          </div>
          <div className="single_field">
            <label htmlFor="processing_fee">Processing Fee</label>{" "}
            <input
              type="text"
              name="processing_fee"
              id="processing_fee"
              value="2.50"
            />
          </div>
          <div className="single_field">
            <label htmlFor="comment1">comments</label>{" "}
            <textarea
              name="comments"
              id="comment1"
              cols="30"
              rows="10"
              value={donation.comments}
              onChange={(e) =>
                setDonation({ ...donation, comments: e.target.value })
              }
            ></textarea>
          </div>
          <div className="single_field">
            <div />
            <button className="btn_donate">Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Donate;
