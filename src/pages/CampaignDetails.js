import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import * as api from "../api";
import "./CampaignDetails.css";

//LOGO
import logo from "./../images/logo.png";

//ICONS
import { BiCategory } from "react-icons/bi";
import { MdPersonOutline, MdPhone, MdLocationPin } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { RiRefund2Fill, RiRefund2Line } from "react-icons/ri";
import cookie from "react-cookies";

//COMPONENTS
import MapEmbed from "../components/MapEmbed";
import CircleLoader from "../components/CircleLoader";
import HeartShape from "../components/HeartShape";
import { useDispatch, useSelector } from "react-redux";
import { addToFavotie, deleteFavorite } from "../actions/favorites";

const CampaignDetails = () => {
  const { favorites } = useSelector((state) => state.favorites);
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const [campaign, setCampaign] = useState({
    name: "",
    details: "",
    category: "",
    contact_number: "",
    target_amount: 0,
    collected_amount: 0,
    state: "",
    cover_pic: "",
    created_by: {
      name: "",
      email: "",
    },
    location: {
      address: "",
      coordinates: ["", ""],
    },
    certificates: [],
  });
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const fetch_campaign = async (id) => {
    try {
      setLoading(true);
      const { data } = await api.getCampaign(id);
      setCampaign(data.data.campaign);
      setLoading(false);
    } catch (err) {
      console.log(err.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch_campaign(id);
    let favorite_item = favorites.map((item) => item.campaign._id);
    if (favorite_item.includes(id)) {
      setFavorite(true);
    }
  }, [favorites, id]);

  const handleFavorite = (favorite) => {
    setFavorite((prevState) => !prevState);
    const config = {
      headers: {
        authorization: `Bearer ${
          cookie.load("token") ? cookie.load("token") : ""
        }`,
      },
    };
    if (favorite) {
      const data = {
        campaign: id,
        user: cookie.load("userId"),
      };
      dispatch(addToFavotie(data, config));
    } else {
      const delete_favorite = favorites.filter(
        (item) => item.campaign._id === id
      );
      dispatch(deleteFavorite(delete_favorite[0]._id, config));
    }
  };

  return loading ? (
    <CircleLoader />
  ) : (
    <div className="donate">
      <div className="portion details_portion">
        <section className="campaign_heading">
          <img src={campaign.cover_pic} alt="" />
          <div className="back_arrow" onClick={() => history.goBack()}>
            <FaArrowLeft />
          </div>
          <div className="absolute_heading">
            <h1>{campaign.name}</h1>
            <p>
              <MdPersonOutline /> {campaign.created_by.name}
            </p>
          </div>
          <HeartShape handleFavorite={handleFavorite} favorite={favorite} />
        </section>
        <section className="campaign_about">
          <div style={{ padding: "2rem" }}>
            <article className="quick_facts">
              <h3>quick facts</h3>
              <div className="grid_details">
                <h4>
                  <BiCategory />
                  category
                </h4>
                <p>{campaign.category}</p>
              </div>
              <div className="grid_details">
                <h4>
                  <RiRefund2Fill />
                  Target fund
                </h4>
                <p>{campaign.target_amount}</p>
              </div>
              <div className="grid_details">
                <h4>
                  <RiRefund2Line /> gathered fund
                </h4>
                <p>{campaign.collected_amount}</p>
              </div>
              <div className="grid_details">
                <h4>
                  <MdPersonOutline />
                  created by
                </h4>
                <p>{campaign.created_by.name}</p>
              </div>
            </article>
            <article className="contact_info">
              <h3>Contact information</h3>
              <div className="grid_details">
                <h4>
                  <MdPhone />
                  contact number
                </h4>
                <p>{campaign.contact_number}</p>
              </div>
              <div className="grid_details">
                <h4>
                  <FiMail />
                  E-mail
                </h4>
                <p style={{ textTransform: "none" }}>
                  {campaign.created_by.email}
                </p>
              </div>
              <div className="grid_details">
                <h4>
                  <MdLocationPin />
                  state
                </h4>
                <p>{campaign.state}</p>
              </div>
            </article>
          </div>
          <div className="campaign_detail">
            <h3>About the {campaign.name}</h3>
            <p>{campaign.details}</p>
          </div>
        </section>
        {!campaign.certificates.length || (
          <section className="campaign_images_section">
            <h3>cover images</h3>
            <section className="campaign_images">
              {campaign.certificates.map((image, index) => {
                return (
                  <article className="single_campaign_image" key={index}>
                    <img src={image} alt="" />
                  </article>
                );
              })}
            </section>
          </section>
        )}
        {campaign.location.coordinates[0] && (
          <section className="campaign_location">
            <MapEmbed
              latitude={campaign.location.coordinates[0]}
              longitude={campaign.location.coordinates[1]}
              address={campaign.location.address}
            />
          </section>
        )}
        <section className="campaign_donate">
          <div className="donate_thing">
            <img src={logo} alt="" />
            <section>
              <h3>What are you thinking about?</h3>
              <p>Be a helping hand and raise others with you.</p>
            </section>
            <Link
              to={`/donate/${campaign.name}/${id}`}
              className="donate_button"
            >
              Donate Now
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CampaignDetails;
