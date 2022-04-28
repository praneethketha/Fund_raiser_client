import React from "react";
import { useState, useEffect } from "react";
import { BsPersonFill } from "react-icons/bs";
import { RiMore2Fill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../actions/users";
import { update_user } from "../actions/users";
import cookie from "react-cookies";
import * as api from "../api";

const color_array = [
  "255, 153, 0",
  "0, 200, 120",
  "255, 0, 128",
  "0 , 0 , 200",
];

const ManageUsers = () => {
  const { users } = useSelector((state) => state.users);
  const [allUsers, setAllUsers] = useState([]);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const config = {
      headers: {
        authorization: `Bearer ${
          cookie.load("token") ? cookie.load("token") : ""
        }`,
      },
    };
    dispatch(fetchUsers(config));
    setAllUsers(users);
  }, [dispatch]);

  const updateUser = (id, user) => {
    const config = {
      headers: {
        authorization: `Bearer ${
          cookie.load("token") ? cookie.load("token") : ""
        }`,
      },
    };
    dispatch(update_user(id, user, config));
  };

  const deleteUser = async (id) => {
    try {
      await api.deleteUser(id);
      dispatch(fetchUsers());
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const handleEdit = (id, edit) => {
    let tempUsers = allUsers.map((user) =>
      user._id === id ? { ...user, isEdit: edit } : { ...user, isEdit: false }
    );
    setAllUsers(tempUsers);
    setEdit(edit);
  };

  const handleDeActive = () => {
    let deactivated = allUsers.map((item) => {
      if (item.isEdit) {
        updateUser(item._id, { active: false });
        return { ...item, active: false };
      } else {
        return item;
      }
    });
    setAllUsers(deactivated);
  };

  const handleActive = () => {
    let activated = allUsers.map((item) => {
      if (item.isEdit) {
        updateUser(item._id, { active: true });
        return { ...item, active: true };
      }
      return item;
    });
    setAllUsers(activated);
  };

  const handleDelete = () => {
    let after_delete = allUsers.filter((item) => {
      if (item.isEdit) {
        deleteUser(item._id);
      } else {
        return item;
      }
    });
    setAllUsers(after_delete);
  };

  return (
    <div className="donate">
      <div className="user_portion">
        <h3>
          Manage users <span>{users.length} users</span>
        </h3>
        <div className="user_campaigns_portion">
          <motion.div layout className="user_campaigns_list">
            {allUsers.map((item, index) => {
              const { _id, name, createdAt, email, role, active } = item;
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
                        <BsPersonFill
                          style={{ color: color, transform: "none" }}
                        />
                      </div>
                      <div className="user_campaign_name">
                        <h3>{name}</h3>
                        <article className="user_campaign_created">
                          <p>
                            <span style={{ textTransform: "none" }}>
                              {email}
                            </span>
                          </p>
                          <p style={{ fontSize: "0.9rem" }}>
                            {new Date(createdAt).toDateString()}
                          </p>
                        </article>
                      </div>
                    </section>
                    <section className="user_campaign_right users_right">
                      <div className="user_campaign_state">
                        <h3>role</h3>
                        <p>{role}</p>
                      </div>
                      <div className="user_campaign_state">
                        <h3>active</h3>
                        <p className={active ? "active_user" : "inactive_user"}>
                          {active ? "active" : "In active"}
                        </p>
                      </div>
                      <div
                        className="user_campaign_more"
                        onClick={() => handleEdit(_id, !edit)}
                      >
                        <RiMore2Fill style={{ fontSize: "22px" }} />
                      </div>
                    </section>
                  </div>
                  {!item.isEdit || (
                    <div className="manage_users_buttons">
                      <button
                        className="btn_donate btn_user"
                        style={{ margin: "0" }}
                        onClick={handleActive}
                      >
                        Activate
                      </button>
                      <button
                        className="btn_donate btn_user"
                        onClick={handleDeActive}
                      >
                        Deactivate
                      </button>
                      <button
                        className="btn_donate btn_user"
                        onClick={handleDelete}
                      >
                        delete
                      </button>
                    </div>
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

export default ManageUsers;
