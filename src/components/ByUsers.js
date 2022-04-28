import React from "react";
import { motion } from "framer-motion";

const ByUsers = ({ allUsers, color_array }) => {
  return (
    <>
      {allUsers.map((item, index) => {
        const {
          _id,
          name,
          email,
          total_amount,
          total_donations,
          createdAt,
          role,
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
                  <h3
                    style={{
                      color: color,
                      fontSize: "15px",
                    }}
                  >
                    {index + 1}
                  </h3>
                </div>
                <div className="user_campaign_name">
                  <h3>{name}</h3>
                  <article className="user_campaign_created">
                    <p>
                      using <span>{email}</span>
                    </p>
                    <p style={{ fontSize: "0.9rem" }}>
                      at {new Date(createdAt).toDateString()}
                    </p>
                  </article>
                </div>
              </section>
              <section className="user_campaign_right by_campaign_right">
                <div className="user_campaign_state">
                  <h3>amount donated</h3>
                  <p>₹{total_amount}</p>
                </div>
                <div className="user_campaign_state">
                  <h3>donations</h3>
                  <p style={{ textTransform: "none" }}>
                    {total_donations} donations
                  </p>
                </div>
                <div className="user_campaign_state">
                  <h3>role</h3>
                  <p>{role}</p>
                </div>
              </section>
            </div>
          </motion.section>
        );
      })}
    </>
  );
};

export default ByUsers;
