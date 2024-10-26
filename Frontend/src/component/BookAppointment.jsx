import React, { useContext } from "react";
import Icon1 from "../assets/Vector2.png";
import Icon2 from "../assets/Group4288.png";
import Icon3 from "../assets/HomeFilled.png";
import Icon4 from "../assets/ic_round-access-time.png";
import Icon5 from "../assets/material-symbols_calendar-month-outline-rounded.png";
import Icon6 from "../assets/MobileOutlined.png";
import Icon7 from "../assets/UserOutlined.png";
import { MyContext } from "../context";

const BookAppointment = () => {
  const { setInBluk } = useContext(MyContext);

  try {
    appointmentArr = Object.keys(currentAppointment);
  } catch (error) {
    appointmentArr = [];
  }

  const onEdit = () => {
    setInBluk({ mode: "1" });
  };

  return (
    <div className="scheduler-page">
      <h2 className="schedule-heading">
        <span className="one">Book an appointment with</span>
        <span className="two">Dr. Rukaiya Mithaiwala</span>
      </h2>

      <div className="card">
        <button className="remove-button-styling edit-cta">
          <img src={Icon2} />
        </button>

        <h3 className="schedule-heading card-heading">
          <span className="one card-title">Physiotherapy Session with</span>
          <span className="two card-sub-title">Dr. Saily Ghag</span>
        </h3>

        <ul>
          <li>
            <img src={Icon7} />
            <span className="list-label">Name:</span>
            <span className="list-value">Value</span>
          </li>
          <li>
            <img src={Icon6} />
            <span className="list-label">Mobile:</span>
            <span className="list-value">Value</span>
          </li>
          <li>
            <img src={Icon3} />
            <span className="list-label">Pin Code:</span>
            <span className="list-value">Value</span>
          </li>
          <li>
            <img src={Icon5} />
            <span className="list-label">Date:</span>
            <span className="list-value">Value</span>
          </li>
          <li>
            <img src={Icon4} />
            <span className="list-label">Time:</span>
            <span className="list-value">Value</span>
          </li>
          <li>
            <img src={Icon1} />
            <span className="list-label">Fees:</span>
            <span className="list-value">Value</span>
          </li>
        </ul>
      </div>

      <div class="each-field">
        <label class="label-style">Complete Your Address to proceed:</label>
        <textarea
          placeholder="Enter Address"
          class="field-style text-area-style"
          rows="4"
          cols="50"
        ></textarea>
      </div>

      <button onClick={onEdit} className="btn-style shedule-btn">
        Confirm Appointment
      </button>
    </div>
  );
};

export default BookAppointment;
