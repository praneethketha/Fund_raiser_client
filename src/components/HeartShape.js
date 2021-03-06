import React from "react";
import "./HeartShape.css";

const HeartShape = ({ handleFavorite, favorite }) => {
  return (
    <section
      className={favorite ? "love active" : "love"}
      onClick={() => handleFavorite(!favorite)}
    >
      <div className="drop"></div>
      <div className="drop"></div>
      <div className="drop"></div>
      <div className="drop"></div>
      <div className="drop"></div>
      <div className="drop"></div>
      <div className="drop"></div>
      <svg
        className="heart"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        x="0"
        y="0"
        width="510"
        height="510"
        viewBox="0 0 510 510"
      >
        <path d="M255 489.6l-35.7-35.7C86.7 336.6 0 257.6 0 160.7 0 81.6 61.2 20.4 140.3 20.4c43.4 0 86.7 20.4 114.8 53.6C283.1 40.8 326.4 20.4 369.8 20.4 448.8 20.4 510 81.6 510 160.7c0 96.9-86.7 176-219.3 293.3L255 489.6z" />
      </svg>
    </section>
  );
};

export default HeartShape;
