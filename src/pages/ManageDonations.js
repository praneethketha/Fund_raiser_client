import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getDonations from "../actions/donations";
import cookie from "react-cookies";
import { fetchUsers } from "../actions/users";
import RecentDonations from "../components/RecentDonations";
import ByCampaigns from "../components/ByCampaigns";
import ByUsers from "../components/ByUsers";
import { motion } from "framer-motion";

import LineChart from "../components/LineChart";
import { AiOutlineUnorderedList, AiOutlineLineChart } from "react-icons/ai";
import getDonationsByDate from "../actions/dateDonations";

const color_array = [
  "255, 153, 0",
  "0, 200, 120",
  "255, 0, 128",
  "0 , 0 , 200",
];

const ManageDonations = () => {
  // use selectors
  const { donations } = useSelector((state) => state.donations);
  const { campaigns } = useSelector((state) => state.campaigns);
  const { users } = useSelector((state) => state.users);
  const { donations_stats } = useSelector((state) => state.donations_stats);

  // use states
  const [filter, setFilter] = useState("recent");
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [label, setLabel] = useState([]);
  const [data, setData] = useState([]);
  const [chart, setChart] = useState(false);

  // dispatching the event
  const dispatch = useDispatch();

  const handleSetFilter = (value) => {
    setFilter(value);
    if (value === "recent") {
      getRecentDonations_data();
    } else if (value === "campaign") {
      campaigns.sort(
        (a, b) =>
          b.collected_amount / b.target_amount -
          a.collected_amount / a.target_amount
      );
      setAllCampaigns(campaigns);
      getCampaigns_data();
    } else if (value === "user") {
      let allusers = users.map((item) => {
        item.total_donations = item.donations.length;
        let sum = 0;
        for (let i = 0; i < item.donations.length; i++) {
          sum += item.donations[i].donated_amount;
        }
        item.total_amount = sum;

        return item;
      });

      allusers.sort((a, b) => b.total_amount - a.total_amount);

      setAllUsers(allusers);
      getUsers_data();
    }
  };

  const getCampaigns_data = () => {
    let labels = campaigns.map((item) => item.name);
    let data = campaigns.map((item) => item.collected_amount);
    let data1 = campaigns.map((item) => item.total_donations);
    setLabel(labels);
    setData([data, data1]);
  };

  const getUsers_data = () => {
    let labels = users.map((item) => item.name);
    let data = allUsers.map((item) => item.total_amount);
    let data1 = allUsers.map((item) => item.total_donations);
    setLabel(labels);
    setData([data, data1]);
  };

  const getRecentDonations_data = () => {
    let labels = donations_stats.map((item) => item._id);
    let data = donations_stats.map((item) => item.sumAmountDonated);
    let data1 = donations_stats.map((item) => item.numDonations);
    setLabel(labels);
    setData([data, data1]);
  };

  useEffect(() => {
    const config = {
      headers: {
        authorization: `Bearer ${
          cookie.load("token") ? cookie.load("token") : ""
        }`,
      },
    };
    dispatch(fetchUsers(config));
    dispatch(getDonations(config));
    dispatch(getDonationsByDate());
  }, [dispatch]);

  return (
    <div className="donate">
      <div className="user_portion">
        <h3>
          Manage Donations <span> {donations.length} donations</span>
        </h3>
        <section className="filter_buttons_donations">
          <article
            className={filter === "recent" ? "header_box active" : "header_box"}
            onClick={() => handleSetFilter("recent")}
          >
            recent donations
          </article>
          <article
            className={
              filter === "campaign" ? "header_box active" : "header_box"
            }
            onClick={() => handleSetFilter("campaign")}
          >
            by campaign
          </article>
          <article
            className={filter === "user" ? "header_box active" : "header_box"}
            onClick={() => handleSetFilter("user")}
          >
            by users
          </article>
          <hr />
          <article
            className={!chart ? "header_box active" : "header_box"}
            onClick={() => setChart(false)}
            style={{ fontSize: "17px" }}
          >
            <AiOutlineUnorderedList />
          </article>
          <article
            className={chart ? "header_box active" : "header_box"}
            onClick={() => setChart(true)}
            style={{ fontSize: "17px" }}
          >
            <AiOutlineLineChart />
          </article>
        </section>
        <div className="user_campaigns_portion">
          <motion.div className="user_campaigns_list">
            {filter === "recent" &&
              (!chart ? (
                <RecentDonations
                  donations={donations}
                  color_array={color_array}
                />
              ) : (
                <LineChart
                  label={label}
                  data={data}
                  labels={["number of donations", "donated amount"]}
                  main_label={"Day Wise Donations"}
                />
              ))}
            {filter === "campaign" &&
              (!chart ? (
                <ByCampaigns
                  allCampaigns={allCampaigns}
                  color_array={color_array}
                />
              ) : (
                <LineChart
                  label={label}
                  data={data}
                  labels={["number of donations", "collected amount"]}
                  main_label={"Campaign Collections"}
                />
              ))}
            {filter === "user" &&
              (!chart ? (
                <ByUsers allUsers={allUsers} color_array={color_array} />
              ) : (
                <LineChart
                  label={label}
                  data={data}
                  labels={["number of donations", "donated amount"]}
                  main_label={"User Donations"}
                />
              ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ManageDonations;
