import React, { useContext } from "react";
import Icon1 from "../assets/Vector2.png";
import Icon2 from "../assets/Group4288.png";
import Icon3 from "../assets/HomeFilled.png";
import Icon4 from "../assets/ic_round-access-time.png";
import Icon5 from "../assets/material-symbols_calendar-month-outline-rounded.png";
import Icon6 from "../assets/MobileOutlined.png";
import Icon7 from "../assets/UserOutlined.png";
import { MyContext } from "../context";
import {
  formatDateTime,
  formatDateToLongString,
  getCurrentDateTimeFormatted,
} from "../utils";
import { toast } from "react-toastify";
import { initialSate } from "../constant";
import axios from "axios";

const BookAppointment = () => {
  const { state, setInBluk, setInBody, setState } = useContext(MyContext);

  const therapist = state?.therapist;
  const therapistId = state?.body?.therapistId;
  const selectedTherapist = Array.isArray(therapist)
    ? therapist.find((t) => t.id === therapistId)
    : {};

  const onEdit = () => {
    setInBluk({ mode: "1" });
  };

  const onConfirm = async () => {
    axios
      .post("http://localhost:8080/api/appointments", {
        ...state?.body,
        bookingTime: getCurrentDateTimeFormatted(),
        slotTime: formatDateTime(state?.selectedDate, state?.selectedTime),
      })
      .then(() => {
        toast.success("Form Successfully Submited");
        setState(initialSate);
      });
  };

  return (
    <div className="scheduler-page">
      <h2 className="schedule-heading">
        <span className="one">Book an appointment with</span>
        <span className="two">{selectedTherapist?.name}</span>
      </h2>

      <div className="card">
        <button onClick={onEdit} className="remove-button-styling edit-cta">
          <img src={Icon2} />
        </button>

        <h3 className="schedule-heading card-heading">
          <span className="one card-title">Physiotherapy Session with</span>
          <span className="two card-sub-title">{selectedTherapist?.name}</span>
        </h3>

        <ul>
          <li>
            <img src={Icon7} />
            <span className="list-label">Name:</span>
            <span className="list-value">{state?.body?.name}</span>
          </li>
          <li>
            <img src={Icon6} />
            <span className="list-label">Mobile:</span>
            <span className="list-value">{state?.body?.mobile}</span>
          </li>
          <li>
            <img src={Icon3} />
            <span className="list-label">Pin Code:</span>
            <span className="list-value">{state?.body?.pincode}</span>
          </li>
          <li>
            <img src={Icon5} />
            <span className="list-label">Date:</span>
            <span className="list-value">
              {formatDateToLongString(state?.selectedDate ?? new Date())}
            </span>
          </li>
          <li>
            <img src={Icon4} />
            <span className="list-label">Time:</span>
            <span className="list-value">{state?.selectedTime}</span>
          </li>
          <li>
            <img src={Icon1} />
            <span className="list-label">Fees:</span>
            <span className="list-value">₹699</span>
          </li>
        </ul>
      </div>

      <div className="each-field">
        <label className="label-style">Complete Your Address to proceed:</label>
        <textarea
          placeholder="Enter Address"
          className="field-style text-area-style"
          rows="4"
          cols="50"
          value={state?.body?.address}
          onChange={(e) => setInBody({ address: e?.target?.value })}
        ></textarea>
      </div>

      <button onClick={onConfirm} className="btn-style shedule-btn">
        Confirm Appointment
      </button>
    </div>
  );
};

export default BookAppointment;
