import React, { useContext, useEffect } from "react";
import { MyContext } from "../context";
import axios from "axios";
import Therapist from "../assets/therapist.png";
import Loader from "./Loader";
import SchedulerTop from "./SchedulerTop";
import SchedulingDetail from "./SchedulingDetail";
import SelectADate from "./SelectADate";

const Scheduler = () => {
  const { state, setInBluk } = useContext(MyContext);

  const fetchTherapist = async () => {
    setInBluk({ loading: true });
    try {
      const data = await axios.get("http://localhost:8080/api/therapists");
      console.log("data", data);

      const therapistData = data.data;
      let appointments = [];

      if (Array.isArray(therapistData)) {
        const appointmentsRes = await axios.get(
          `http://localhost:8080/api/therapists/${therapistData[0]?.id}/appointments`
        );

        if (
          appointmentsRes.status === 200 &&
          Array.isArray(appointmentsRes?.data)
        ) {
          appointments = appointmentsRes?.data;
        }
      }

      setInBluk({ therapist: data.data, appointments });
    } catch (error) {
      setInBluk({ therapist: [] });
    }

    setInBluk({ loading: false });
  };

  useEffect(() => {
    fetchTherapist();
  }, []);

  if (state?.loading) {
    return <Loader />;
  }

  return (
    <div className="scheduler-page">
      <SchedulerTop />
      {Array.isArray(state?.therapist) ? (
        <>
          <h3 className="select-therepist">Select A Therapist</h3>
          <div className="therapist-container">
            {state?.therapist?.map((data) => {
              return (
                <button
                  className="remove-button-styling therapist-btn"
                  key={data?.id}
                >
                  <img src={Therapist} />
                  <span className="dr-data">
                    <span className="dr-name">{data?.name}</span>
                    <span className="dr-availability">Available</span>
                  </span>
                </button>
              );
            })}
          </div>

          <SchedulingDetail />

          <SelectADate />
        </>
      ) : (
        <h2 className="schedule-heading no-data">
          <span>No Data Found</span>
        </h2>
      )}
    </div>
  );
};

export default Scheduler;
