import React, { useState } from "react";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";

//ICONS
import { IoIosSunny } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import { FiLogIn } from "react-icons/fi";
import { MdPersonAddAlt1 } from "react-icons/md";
import { RiMoonFill } from "react-icons/ri";

//IMAGES
import logo from "./../images/logo.png";
import default_img from "./../images/default.jpg";

import { useDispatch, useSelector } from "react-redux";
import cookie from "react-cookies";
import { logOutUser } from "./../actions/currentUser";
import Menu from "./Menu";
const Header = ({ dark, setDark }) => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogOut = () => {
    setOpen(false);
    dispatch(logOutUser());
    history.push("/");
  };

  const handleLogo = () => {
    history.push("/");
  };

  const toggleMode = (dark) => {
    setDark(dark);
    if (dark) {
      document.documentElement.style.setProperty(
        "--background_color",
        "#161616"
      );
      document.documentElement.style.setProperty("--primary_color", "#fff");
      document.documentElement.style.setProperty(
        "--alpha_16_shade_color",
        "rgba(255, 255, 255, 0.16)"
      );
      document.documentElement.style.setProperty(
        "--alpha_08_shade_color",
        "rgba(255, 255, 255, 0.08)"
      );
      document.documentElement.style.setProperty(
        "--alpha_016_shade_color",
        "rgba(255, 255, 255, 0.016)"
      );
      document.documentElement.style.setProperty(
        "--table_row_alternate_color",
        "#3a3a3a"
      );
      document.documentElement.style.setProperty(
        "--signup_page_border",
        "#323232"
      );
    } else {
      document.documentElement.style.setProperty("--background_color", "#fff");
      document.documentElement.style.setProperty("--primary_color", "#000");
      document.documentElement.style.setProperty(
        "--alpha_16_shade_color",
        "rgba(0, 0, 0, 0.16)"
      );
      document.documentElement.style.setProperty(
        "--alpha_08_shade_color",
        "rgba(0, 0, 0, 0.08)"
      );
      document.documentElement.style.setProperty(
        "--alpha_016_shade_color",
        "rgba(0, 0, 0, 0.016)"
      );
      document.documentElement.style.setProperty(
        "--table_row_alternate_color",
        "#f3f3f3"
      );
      document.documentElement.style.setProperty(
        "--signup_page_border",
        "#bcbcbc"
      );
    }
  };

  return (
    <header>
      <div className="wrap">
        <div className="left">
          <div className="logo_left" onClick={handleLogo}>
            {" "}
            <img src={logo} alt="" id="logo" />
            <section>
              <h2>FUND RAISER</h2>
              <p style={{ fontSize: "13px" }}>We rise by lifting others</p>
            </section>
          </div>
        </div>
        <div className="right">
          {cookie.load("userId") ? (
            <Link to="/profile" className="singup_links">
              <img
                src={currentUser.photo ? currentUser.photo : default_img}
                alt=""
                className="header_img"
              />
              <p style={{ fontSize: "1rem" }}>{currentUser.name}</p>
            </Link>
          ) : (
            <>
              <Link to="/login" className="singup_links link_hover">
                <FiLogIn className="header_icon" />
                Sign In
              </Link>
              <Link to="/signup" className="singup_links link_hover">
                <MdPersonAddAlt1 className="header_icon" />
                sign up
              </Link>
            </>
          )}
          <div className="header_box" onClick={() => toggleMode(!dark)}>
            {!dark ? (
              <RiMoonFill className="burger_menu" />
            ) : (
              <IoIosSunny className="burger_menu" />
            )}
          </div>
          <div className="header_box" onClick={() => setOpen(!open)}>
            <CgMenuGridO className="burger_menu" />
          </div>
          <Menu open={open} handleLogOut={handleLogOut} setopen={setOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;
