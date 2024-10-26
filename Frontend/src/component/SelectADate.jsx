import React, { useContext, useEffect } from "react";
import {
  formatDate,
  getNextSixWeekdays,
  getShortDayName,
  getTimeSlotsByPeriod as getTimeSlotsByPeriodV2,
} from "../utils";
import { MyContext } from "../context";

const SelectADate = () => {
  const { state, setInBluk } = useContext(MyContext);
  const dates = state.dates;
  const appointments = state.appointments;
  const appoinmentsObj = state.appoinmentsObj;
  const currentAppointment = appoinmentsObj?.[dates[0]];
  let appointmentArr;

  try {
    appointmentArr = Object.keys(currentAppointment);
  } catch (error) {
    appointmentArr = [];
  }

  const onSubmit = () => {
    setInBluk({ mode: "3" });
  };

  useEffect(() => {
    const result = getNextSixWeekdays();
    const appoinmentsObj = {};

    if (Array.isArray(result)) {
      result.forEach((date) => {
        const dateToString = date.toString();

        appoinmentsObj[dateToString] = getTimeSlotsByPeriodV2(
          date,
          appointments
        );
      });
    }

    setInBluk({ dates: getNextSixWeekdays(), appoinmentsObj });
  }, []);

  if (!Array.isArray(dates)) {
    return null;
  }

  return (
    <>
      <h3 className="select-therepist">Select A Date</h3>

      <div>
        <div className="days-list">
          {dates?.map((date) => {
            const dateToString = date.toString();

            return (
              <React.Fragment key={dateToString}>
                <button
                  className="remove-button-styling days-btn"
                  htmlFor={dateToString}
                  onClick={() =>
                    setInBluk({ selectedDate: date, selectedTime: undefined })
                  }
                >
                  <span className="day-name">{getShortDayName(date)}</span>
                  <span
                    className={`avalability-detail ${
                      state?.selectedDate?.toString() === dateToString
                        ? "avalability-detail-active"
                        : ""
                    }`}
                  >
                    <span className="respec-date">{formatDate(date)}</span>
                    <br />
                    <span className="availablity">Availability</span>
                  </span>
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {!!state?.selectedDate ? (
          <>
            <h3 className="select-therepist time-title">Time</h3>
            {appointmentArr.map((tab) =>
              !!currentAppointment?.[tab]?.length ? (
                <React.Fragment key={tab}>
                  <h4 className="day-section-title">{tab}</h4>

                  <div className="time-btn-container">
                    {currentAppointment?.[tab]?.map((dateDetail) => (
                      <button
                        key={dateDetail?.formattedTime}
                        onClick={() =>
                          setInBluk({ selectedTime: dateDetail?.formattedTime })
                        }
                        className={`remove-button-styling time-btn ${
                          state?.selectedTime === dateDetail?.formattedTime
                            ? "avalability-detail-active"
                            : ""
                        }`}
                      >
                        {dateDetail?.formattedTime}
                      </button>
                    ))}
                  </div>
                </React.Fragment>
              ) : null
            )}

            {!currentAppointment?.Morning?.length &&
              !currentAppointment?.Noon?.length &&
              !currentAppointment?.Evening?.length && (
                <h2 className="schedule-heading no-data">
                  <span>No Data Found</span>
                </h2>
              )}
          </>
        ) : null}

        {!!state?.selectedTime ? (
          <button onClick={onSubmit} className="btn-style shedule-btn">
            Proceed
          </button>
        ) : null}
      </div>
    </>
  );
};

export default SelectADate;
