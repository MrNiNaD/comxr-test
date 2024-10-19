import React from "react";
import Arrow from "../assets/arrow.png";

const Topbar = () => {
  return (
    <div className="top-bar">
      <button className="remove-button-styling">
        <img src={Arrow} />
      </button>
    </div>
  );
};

export default Topbar;
