import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import { FaWallet } from "react-icons/fa";
import { GoDiffAdded } from "react-icons/go";
import cookie from "react-cookies";

const Hero = () => {
  return (
    <div className="hero">
      <div id="title">
        <div className="help">HELP</div>FOR <div className="cause">CAUSE</div>
      </div>
      <p className="paragraph">
        Fund Raiser is a fast, easy and has no raise requirements or start up
        fees.
      </p>
      <div className="buttons_home">
        <Link className="hero_btns" to="/donate">
          <FaWallet className="donate_symbol" />
          Donate Now
        </Link>
        {cookie.load("role") !== "donar" && (
          <Link
            to="/createCampaign"
            style={{ borderLeft: "2px solid white" }}
            className="hero_btns"
          >
            <GoDiffAdded className="donate_symbol" />
            new campaign
          </Link>
        )}
      </div>
    </div>
  );
};

export default Hero;
