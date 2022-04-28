import React, { useEffect, useState } from "react";
import "./Profile.css";
import default_img from "./../images/default.jpg";

//ICONS
import { FaRupeeSign, FaWallet } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { RiEdit2Fill } from "react-icons/ri";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { MdPhone, MdLocationPin } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { IoMdPower } from "react-icons/io";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PreLoader from "../components/PreLoader";
import AlertComponent from "../components/AlertComponent";

const Profile = () => {
  const { currentUser, isLoading } = useSelector((state) => state.currentUser);
  const { campaigns } = useSelector((state) => state.campaigns);
  const { favorites } = useSelector((state) => state.favorites);

  const [activities, setActivities] = useState([]);
  const [alerts, setAlerts] = useState(false);

  const handleDeactivate = () => {
    setAlerts(!alerts);
  };

  useEffect(() => {
    if (!isLoading) {
      //gettign user campaigns
      let user_creations = campaigns.filter(
        (item) => item.created_by._id === currentUser._id
      );

      //getting user recent donations
      let recent_donations = currentUser.donations.map((item) => {
        item["createdAt"] = item["donated_at"];
        return item;
      });

      let recent_activities = recent_donations.concat(user_creations);
      recent_activities = recent_activities.concat(favorites);

      recent_activities.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setActivities(recent_activities);
    }
  }, [isLoading]);

  return isLoading ? (
    <PreLoader />
  ) : (
    <div className="profile">
      <div className="portion">
        <div className="page_title">
          <h3 className="page_name">
            <BsPersonFill className="padding_right" /> PROFILE
          </h3>
        </div>
        <div className="flex_profile">
          <div className="left_profile">
            <section className="profile_pic">
              <img
                src={currentUser.photo ? currentUser.photo : default_img}
                alt=""
              />
            </section>
            <section className="profile_details">
              <div className="page_title contact_name">
                <h3 className="page_name">contact information</h3>
              </div>
              <article className="grid_details" style={{ marginTop: "2rem" }}>
                <h4>
                  <MdPhone /> Phone:
                </h4>
                <p className="highlight">{currentUser.contact_number}</p>
              </article>
              <article className="grid_details" style={{ width: "80%" }}>
                <h4>
                  <MdLocationPin /> Address:
                </h4>
                <p>{currentUser.address}</p>
              </article>
              <article className="grid_details">
                <h4>
                  <FiMail /> E-mail:
                </h4>
                <p className="highlight">{currentUser.email}</p>
              </article>
            </section>
          </div>
          <div className="right_profile">
            <div className="about_user">
              <h2>{currentUser.name}</h2>
              <p className="highlight">active {currentUser.role}</p>
              <h4 className="recent_info">useful links</h4>
              <div className="flex_profile_links">
                <Link to="/editProfile" className="links_profile">
                  <RiEdit2Fill /> edit profile
                </Link>
                <Link to="/changePassword" className="links_profile">
                  <CgArrowsExchangeAlt style={{ fontSize: "25px" }} /> change
                  password
                </Link>
                <button
                  className="links_profile deactivate_btn"
                  onClick={handleDeactivate}
                >
                  <IoMdPower /> deactivate
                </button>
              </div>
            </div>
            <section style={{ marginTop: "2rem" }}>
              <h4
                className="recent_info"
                style={{
                  borderBottom: "2px solid #b5b5b5",
                  paddingBottom: "5px",
                }}
              >
                recent activities
              </h4>
              {!activities.length ? (
                <div className="no_activity">
                  <h3>NO DONATIONS MADE OR CAMPAIGNS CREATED TO DISPLAY</h3>
                  <Link
                    to="/donate"
                    className="links_profile"
                    style={{ width: "max-content" }}
                  >
                    <FaWallet /> Donate Now
                  </Link>
                </div>
              ) : (
                <div className="recent_activites">
                  <section className="recent_donations">
                    {activities.map((item) => {
                      if (item.campaign_name) {
                        const {
                          _id,
                          campaign_name,
                          donated_amount,
                          createdAt,
                        } = item;
                        return (
                          <div className="single_donation" key={_id}>
                            <h4>
                              You had donated{" "}
                              <span className="amount_donated">
                                <FaRupeeSign className="rupee_symbol" />
                                {donated_amount}
                              </span>{" "}
                              to a campaign called{" "}
                              <span className="campaign_donated">
                                {campaign_name}
                              </span>
                            </h4>
                            <p>{new Date(createdAt).toLocaleString()}</p>
                          </div>
                        );
                      } else if (item.favorite) {
                        const { _id, campaign, createdAt } = item;
                        return (
                          <div className="single_favorite" key={_id}>
                            <h4>
                              you added{" "}
                              <span className="campaign_donated">
                                {campaign.name}
                              </span>{" "}
                              to your favories.
                            </h4>
                            <p>{new Date(createdAt).toLocaleString()}</p>
                          </div>
                        );
                      } else {
                        const { _id, name, category, createdAt } = item;
                        return (
                          <div className="single_campaign" key={_id}>
                            <h4>
                              Created a campiagn called{" "}
                              <span className="campaign_donated">{name}</span>{" "}
                              in the category :{" "}
                              <span className="amount_donated">{category}</span>
                            </h4>
                            <p>{new Date(createdAt).toLocaleString()}</p>
                          </div>
                        );
                      }
                    })}
                  </section>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
      {alerts && (
        <AlertComponent
          msg={"Please confirm to deactivate your fundraiser account!!!"}
          setAlerts={setAlerts}
        />
      )}
    </div>
  );
};

export default Profile;
