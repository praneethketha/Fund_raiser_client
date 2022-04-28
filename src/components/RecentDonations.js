import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { motion } from "framer-motion";

const RecentDonations = ({ donations, color_array }) => {
  return (
    <>
      {donations.map((item, index) => {
        const { _id, campaign, user, donated_amount, createdAt } = item;
        let x = color_array[index % color_array.length];
        const bg_color = `rgba(${x},0.1)`;
        const color = `rgb(${x})`;
        return (
          <motion.section
            animate={{ opacity: 1, transition: { duration: 1 } }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            key={_id}
          >
            <div className="single_user_campaign">
              <section className="user_campaign_left">
                <div
                  className="user_campiagn_icon header_box"
                  style={{ background: bg_color }}
                >
                  <FaRupeeSign style={{ color: color, fontSize: "15px" }} />
                </div>
                <div className="user_campaign_name">
                  <h3>{campaign.name}</h3>
                  <article className="user_campaign_created">
                    <p>
                      Donated by <span>{user.name}</span>
                    </p>
                    <p style={{ fontSize: "0.9rem" }}>
                      at {new Date(createdAt).toDateString()}
                    </p>
                  </article>
                </div>
              </section>
              <section className="user_campaign_right donations_right">
                <div className="user_campaign_state">
                  <h3>E-mail</h3>
                  <p style={{ textTransform: "none" }}>{user.email}</p>
                </div>
                <div className="user_campaign_state">
                  <h3>donated</h3>
                  <p>₹{donated_amount}</p>
                </div>
                <div className="user_campaign_state">
                  <h3>category</h3>
                  <p>{campaign.category}</p>
                </div>
              </section>
            </div>
          </motion.section>
        );
      })}
    </>
  );
};

export default RecentDonations;
