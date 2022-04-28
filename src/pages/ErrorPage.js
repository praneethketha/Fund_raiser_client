import React from "react";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="error_page">
      <div className="portion error_img">
        <h1>404</h1>
        <div className="error_info">
          <p>
            <b>Oops;</b> Sorry, but the page you were trying to view does not
            exist.
          </p>
          <a href="/">Back to home</a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
