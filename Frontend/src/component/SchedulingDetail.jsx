import React from "react";

const SchedulingDetail = () => {
  const bookingDetailConfig = [
    {
      id: 1,
      title: "₹699",
      type: "Fees",
      icon: <img />,
    },
    {
      id: 2,
      title: "40min",
      type: "Session Duration",
    },
    {
      id: 3,
      title: "4.6/5",
      type: "Star rating",
    },
  ];

  return (
    <div className="booking-detail">
      {bookingDetailConfig.map((eachDetail) => (
        <button key={eachDetail?.id} className="remove-button-styling">
          <span className="booking-detail-title">{eachDetail?.title}</span>
          <span className="booking-detail-type">{eachDetail?.type}</span>
        </button>
      ))}
    </div>
  );
};

export default SchedulingDetail;
