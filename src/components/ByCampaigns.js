import React from "react";
import { motion } from "framer-motion";

const ByCampaigns = ({ allCampaigns, color_array }) => {
  return (
    <>
      {allCampaigns.map((item, index) => {
        const {
          _id,
          name,
          created_by,
          target_amount,
          createdAt,
          collected_amount,
          total_donations,
          category,
        } = item;
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
                  <h3 style={{ color: color, fontSize: "15px" }}>
                    {index + 1}
                  </h3>
                </div>
                <div className="user_campaign_name">
                  <h3>{name}</h3>
                  <article className="user_campaign_created">
                    <p>
                      By <span>{created_by.name}</span>
                    </p>
                    <p style={{ fontSize: "0.9rem" }}>
                      at {new Date(createdAt).toDateString()}
                    </p>
                  </article>
                </div>
              </section>
              <section className="user_campaign_right by_campaign_right">
                <div className="user_campaign_state">
                  <h3>amount collected</h3>
                  <p>
                    {((collected_amount / target_amount) * 100).toFixed(2)}%
                  </p>
                </div>
                <div className="user_campaign_state">
                  <h3>donations</h3>
                  <p style={{ textTransform: "none" }}>
                    {total_donations} donations
                  </p>
                </div>
                <div className="user_campaign_state">
                  <h3>category</h3>
                  <p>{category}</p>
                </div>
              </section>
            </div>
          </motion.section>
        );
      })}
    </>
  );
};

export default ByCampaigns;
