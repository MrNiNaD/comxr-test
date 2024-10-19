import React from "react";
import Arrow from "../assets/arrow.png";
import { toast } from "react-toastify";

const Topbar = () => {
  return (
    <div className="top-bar">
      <button
        onClick={() => {
          toast.error("Error Notification !");
        }}
      >
        <img src={Arrow} />
      </button>
    </div>
  );
};

export default Topbar;
