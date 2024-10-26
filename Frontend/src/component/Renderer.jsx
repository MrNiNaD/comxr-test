import React, { useContext } from "react";
import UserForm from "./UserForm";
import Scheduler from "./Scheduler";
import { MyContext } from "../context";
import BookAppointment from "./BookAppointment";

const Renderer = () => {
  const { state } = useContext(MyContext);

  switch (state?.mode) {
    case "3":
      return <BookAppointment />;

    case "2":
      return <Scheduler />;

    default:
      return <UserForm />;
  }
};

export default Renderer;
