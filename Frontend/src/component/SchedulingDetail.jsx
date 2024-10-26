import React from "react";
import Stopwatch from "../assets/Stopwatch.png";
import Vector from "../assets/Vector.png";
import Badge from "../assets/badge.png";

const SchedulingDetail = () => {
  const bookingDetailConfig = [
    {
      id: 1,
      title: "₹699",
      type: "Fees",
      icon: <img src={Vector} />,
    },
    {
      id: 2,
      title: "40min",
      type: "Session Duration",
      icon: <img src={Stopwatch} />,
    },
    {
      id: 3,
      title: "4.6/5",
      type: "Star rating",
      icon: <img src={Badge} />,
    },
  ];

  return (
    <div className="booking-detail">
      {bookingDetailConfig.map((eachDetail) => (
        <button key={eachDetail?.id} className="remove-button-styling">
          <span className="booking-detail-title">{eachDetail?.title}</span>
          <span className="booking-detail-type">
            {eachDetail?.icon}
            {eachDetail?.type}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SchedulingDetail;
