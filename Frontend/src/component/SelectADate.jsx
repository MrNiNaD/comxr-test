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

  console.log("appointmentArr", appointmentArr, currentAppointment);

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
        {dates?.map((date) => {
          const dateToString = date.toString();

          return (
            <React.Fragment key={dateToString}>
              <button className="remove-button-styling" htmlFor={dateToString}>
                <span className="day-name">{getShortDayName(date)}</span>
                <span className="avalability-detail">
                  <span className="respec-date">{formatDate(date)}</span>
                  <span className="availablity">Availability</span>
                </span>
              </button>
            </React.Fragment>
          );
        })}

        {appointmentArr.map((tab) =>
          !!currentAppointment?.[tab]?.length ? (
            <>
              <h4>{tab}</h4>

              {currentAppointment?.[tab]?.map((dateDetail) => (
                <button className="remove-button-styling">
                  {dateDetail?.formattedTime}
                </button>
              ))}
            </>
          ) : null
        )}

        {!currentAppointment?.Morning?.length &&
          !currentAppointment?.Noon?.length &&
          !currentAppointment?.Evening?.length && (
            <h2 className="schedule-heading no-data">
              <span>No Data Found</span>
            </h2>
          )}

        <button onClick={() => {}} className="btn-style">
          Proceed
        </button>
      </div>
    </>
  );
};

export default SelectADate;
