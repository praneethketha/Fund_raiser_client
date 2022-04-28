import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import cookie from "react-cookies";
import "./ManageUserCampaign.css";

import { MdCampaign, MdDelete, MdEdit } from "react-icons/md";
import EditCampaign from "../components/EditCampaign";
import * as api from "./../api";
import { getCampaigns } from "../actions/campaigns";

const color_array = [
  "255, 153, 0",
  "0, 200, 120",
  "255, 0, 128",
  "0 , 0 , 200",
];

const ManageUserCampaigns = () => {
  const { campaigns } = useSelector((state) => state.campaigns);
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [edit, setEdit] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState();

  const dispatch = useDispatch();

  const handleEdit = (id, edit) => {
    let temp_campaigns = userCampaigns.map((item) =>
      item._id === id ? { ...item, isEdit: edit } : { ...item, isEdit: false }
    );

    let updated_campaign = userCampaigns.filter((item) => item._id === id)[0];
    setCurrentCampaign(updated_campaign);
    setUserCampaigns(temp_campaigns);
    setEdit(edit);
  };

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${
            cookie.load("token") ? cookie.load("token") : ""
          }`,
        },
      };
      await api.deleteCampaign(id, config);
      dispatch(getCampaigns());
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  useEffect(() => {
    const role = cookie.load("role");
    if (campaigns) {
      if (role && role === "admin") {
        console.log(role);
        setUserCampaigns(campaigns);
      } else {
        let user_campaigns = campaigns.filter(
          (item) => item.created_by._id === cookie.load("userId")
        );
        setUserCampaigns(user_campaigns);
      }
    }
  }, [campaigns]);

  return (
    <div className="donate">
      <div className="user_portion">
        <h3>
          User campaigns <span> {userCampaigns.length} campaigns</span>
        </h3>
        <div className="user_campaigns_portion">
          <motion.div className="user_campaigns_list">
            {userCampaigns.map((item, index) => {
              const { _id, name, created_by, createdAt, state, category } =
                item;
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
                        className="user_campaign_icon header_box"
                        style={{ background: bg_color }}
                      >
                        <MdCampaign style={{ color: color }} />
                      </div>
                      <div className="user_campaign_name">
                        <h3>{name}</h3>
                        <article className="user_campaign_created">
                          <p>
                            By <span>{created_by.name}</span>
                          </p>
                          <p style={{ fontSize: "0.9rem" }}>
                            {new Date(createdAt).toDateString()}
                          </p>
                        </article>
                      </div>
                    </section>
                    <section className="user_campaign_right">
                      <div className="user_campaign_state">
                        <h3>State</h3>
                        <p>{state.toLowerCase()}</p>
                      </div>
                      <div className="user_campaign_state">
                        <h3>category</h3>
                        <p>{category}</p>
                      </div>
                      <div className="user_campaign_more">
                        <div
                          className="header_box"
                          onClick={() => handleEdit(_id, !edit)}
                        >
                          <MdEdit />
                        </div>
                        <div
                          className="header_box delete_box"
                          onClick={() => handleDelete(_id)}
                        >
                          <MdDelete />
                        </div>
                      </div>
                    </section>
                  </div>
                  {!item.isEdit || (
                    <EditCampaign
                      currentCampaign={currentCampaign}
                      setCurrentCampaign={setCurrentCampaign}
                    />
                  )}
                </motion.section>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ManageUserCampaigns;
