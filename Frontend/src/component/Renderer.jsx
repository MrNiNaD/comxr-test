import React, { useContext } from "react";
import UserForm from "./UserForm";
import Scheduler from "./Scheduler";
import { MyContext } from "../context";

const Renderer = () => {
  const { state } = useContext(MyContext);

  switch (state?.mode) {
    case "2":
      return <Scheduler />;

    default:
      return <UserForm />;
  }
};

export default Renderer;
