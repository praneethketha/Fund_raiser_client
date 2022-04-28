import React, { useEffect, useState } from "react";
import "./Campaigns.css";
import { Link } from "react-router-dom";

//ICONS
import { AiFillStar } from "react-icons/ai";
import { FaHeartbeat, FaRupeeSign, FaHeart } from "react-icons/fa";
import { GiBookmarklet } from "react-icons/gi";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { RiGroupLine, RiMore2Fill } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import cookie from "react-cookies";
import { getFavorites } from "../actions/favorites";

const categories = ["emergency", "education", "orphanages"];

const Category = ({ category, setCategory, name, icon }) => {
  return (
    <h4
      className={category === name && "highlight_category"}
      onClick={() => setCategory(name)}
    >
      {icon} {name}
    </h4>
  );
};

const Campaigns = () => {
  const { campaigns } = useSelector((state) => state.campaigns);
  const { favorites } = useSelector((state) => state.favorites);
  const [allCampaigns, setAllCampaigns] = useState(campaigns);
  const [category, setCategory] = useState("popular");
  const dispatch = useDispatch();

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const campaign_by_category = (category) => {
    if (category === "popular") {
      setAllCampaigns(campaigns);
    } else if (category === "others") {
      let new_campaigns = campaigns.filter(
        (item) => !categories.includes(item.category)
      );
      setAllCampaigns(new_campaigns);
    } else if (category === "completed") {
      let new_campaigns = campaigns.filter(
        (item) => !(item.target_amount - item.collected_amount)
      );
      setAllCampaigns(new_campaigns);
    } else if (category === "favorites") {
      let favorite_campaigns = favorites.map((item) => item.campaign._id);
      let new_campaigns = campaigns.filter((item) =>
        favorite_campaigns.includes(item._id)
      );
      setAllCampaigns(new_campaigns);
    } else {
      let new_campaigns = campaigns.filter(
        (item) => item.category === category
      );
      setAllCampaigns(new_campaigns);
    }
  };

  useEffect(() => {
    campaign_by_category(category);
    const userId = cookie.load("userId");
    if (userId) {
      dispatch(getFavorites(userId));
    }
  }, [favorites, category]);

  return (
    <div className="campaign">
      <section>
        <div className="category">
          <h4 id="trending">Trending now</h4>
          <Category
            category={category}
            setCategory={setCategory}
            name="popular"
            icon={<AiFillStar className="icon" />}
          />
          <Category
            category={category}
            setCategory={setCategory}
            name="emergency"
            icon={<FaHeartbeat className="icon" />}
          />
          <Category
            category={category}
            setCategory={setCategory}
            name="education"
            icon={<GiBookmarklet className="icon" />}
          />
          <Category
            category={category}
            setCategory={setCategory}
            name="orphanages"
            icon={<RiGroupLine className="icon" />}
          />
          <Category
            category={category}
            setCategory={setCategory}
            name="completed"
            icon={<BsFillPatchCheckFill className="icon" />}
          />
          {cookie.load("userId") && (
            <Category
              category={category}
              setCategory={setCategory}
              name="favorites"
              icon={<FaHeart className="icon" />}
            />
          )}
          <Category
            category={category}
            setCategory={setCategory}
            name="others"
            icon={<RiMore2Fill className="icon" />}
          />
        </div>
      </section>
      <motion.div className="content">
        <AnimatePresence>
          {allCampaigns.length ? (
            allCampaigns.map((x) => {
              const {
                _id,
                name,
                cover_pic,
                details,
                target_amount,
                collected_amount,
              } = x;
              const percentage =
                100 -
                [((target_amount - collected_amount) / target_amount) * 100];
              return (
                <motion.div
                  layout
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  className="box"
                  key={_id}
                >
                  <div className="box_container">
                    <img src={cover_pic} alt="" />
                    <h3>{name}</h3>
                  </div>
                  <div className="details">
                    <h4>
                      Required :{" "}
                      <span className="amount_required">
                        <FaRupeeSign style={{ fontSize: "15px" }} />
                        {target_amount}
                      </span>
                    </h4>
                    <div className="progressbar">
                      <div
                        className="progress"
                        style={{ width: `${percentage}%` }}
                      ></div>
                      <section
                        className="collected_popup"
                        style={{
                          left: `${percentage}%`,
                        }}
                      >
                        {collected_amount}
                      </section>
                    </div>
                    <p style={{ height: "80px" }}>
                      {truncate(details, 100)}
                      <Link
                        to={`/campaignDetails/${_id}`}
                        className="link_to_details"
                      >
                        Explore
                      </Link>
                    </p>
                    <Link to={`/donate/${name}/${_id}`} className="donate_link">
                      Donate now{" "}
                      <MdOutlineDoubleArrow className="arrows_donate" />
                    </Link>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="no_campaigns">
              <h3>
                no campaigns to display with this category. Please use another
                category!!!
              </h3>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Campaigns;
