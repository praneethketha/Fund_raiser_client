import React from "react";
import "./Footer.css";
import logo from "./../images/logo.png";
import { useHistory } from "react-router-dom";

const Footer = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  return (
    <footer>
      <div className="footer_wrap">
        <section className="logo_footer" onClick={handleClick}>
          <img src={logo} alt="" id="logo" />
          <section>
            <h2>FUND RAISER</h2>
            <p style={{ fontSize: "13px" }}>We rise by lifting others</p>
          </section>
        </section>
        <h4>&copy; 2022 by SVCE Students.</h4>
      </div>
    </footer>
  );
};

export default Footer;
