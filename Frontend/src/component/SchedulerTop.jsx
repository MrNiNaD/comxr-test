import React from "react";

const SchedulerTop = () => {
  return (
    <>
      <h2 className="schedule-heading">
        <span className="one">Book an appointment with</span>
        <span className="two">Physica Physiotherapy</span>
      </h2>
      <h3 className="schedule-sub-heading">
        <span className="about-physica">About Physica</span>
        <span className="choose-therapist">Choose Therapist &gt;</span>
      </h3>
      <p>
        Our professional doctors will visit your home for an 40 minute treatment
        session for your rehabilitation needs. <a href="#">Read More</a>
      </p>
    </>
  );
};

export default SchedulerTop;
