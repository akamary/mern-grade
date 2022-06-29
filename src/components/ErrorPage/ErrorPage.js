import React from "react";
import "./ErrorPage.css";

const NotFound = () => (
  <div className="container">
    <div className="div-dois">
      <h1 className="title">404</h1>
      <h2 className="page-not-found">Page not found</h2>
      <p className="sorry-txt">
        Sorry... we can't find the page you're looking for{" "}
      </p>
      <meta name="viewport" content="width=device-width,initial-scale=0.72" />

      <button
        className="wrong-container btn"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          window.location.href =
            "http://localhost:3000/";
        }}
      >
        Go Back
      </button>
    </div>
  </div>
);

export default NotFound;