import React from "react";
import "./PreLoader.css";
const PreLoader = () => {
  return (
    <div className="pre_loader">
      <div className="circle"></div>
      <h2>Fund Raiser</h2>
      <h4>Be a helping hand</h4>
      <div className="loading">
        <div className="load_amount"></div>
      </div>
    </div>
  );
};

export default PreLoader;
