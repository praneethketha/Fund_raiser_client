import React from "react";
import { RiHome2Line } from "react-icons/ri";
// import { FiSettings } from "react-icons/fi";
import { FaWallet, FaDonate } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import {
  MdPersonAddAlt1,
  MdCampaign,
  MdManageAccounts,
  MdPersonOutline,
} from "react-icons/md";
import { GoDiffAdded } from "react-icons/go";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import cookie from "react-cookies";

const Menu = ({ open, handleLogOut, setopen }) => {
  const role = cookie.load("role") || "default";
  return (
    <div className={`${open ? "open_menu" : "open_menu close_menu"}`}>
      <Link className="menu_item" to="/" onClick={() => setopen(!open)}>
        <RiHome2Line /> home
      </Link>
      <Link className="menu_item" to="/donate" onClick={() => setopen(!open)}>
        {" "}
        <FaWallet /> donate Now
      </Link>
      {role === "admin" && (
        <>
          <Link
            className="menu_item"
            to="/manageDonations"
            onClick={() => setopen(!open)}
          >
            <FaDonate /> manage donations
          </Link>
          <Link
            className="menu_item"
            to="/manageUsers"
            onClick={() => setopen(!open)}
          >
            <MdManageAccounts /> manage users
          </Link>
        </>
      )}
      {role !== "donar" && (
        <>
          <Link
            className="menu_item"
            to="/manageUserCampaigns"
            onClick={() => setopen(!open)}
          >
            <MdCampaign /> manage campaigns
          </Link>
          <Link
            className="menu_item"
            to="createCampaign"
            onClick={() => setopen(!open)}
          >
            <GoDiffAdded /> create campaign
          </Link>
        </>
      )}
      {role === "default" && (
        <>
          <Link
            className="menu_item"
            to="/login"
            onClick={() => setopen(!open)}
          >
            <FiLogIn /> log in
          </Link>
          <Link
            className="menu_item"
            to="/signup"
            onClick={() => setopen(!open)}
          >
            <MdPersonAddAlt1 /> sign up
          </Link>
        </>
      )}
      {role !== "default" && (
        <>
          <Link
            className="menu_item"
            to="/profile"
            onClick={() => setopen(!open)}
          >
            <MdPersonOutline /> profile
          </Link>
          <li
            className="menu_item"
            onClick={() => {
              handleLogOut();
              setopen(!open);
            }}
          >
            <BiLogOut /> log out
          </li>
        </>
      )}
    </div>
  );
};

export default Menu;
