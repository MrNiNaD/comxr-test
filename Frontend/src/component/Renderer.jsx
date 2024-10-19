import React from "react";
import UserForm from "./UserForm";

const Renderer = () => {
  switch (false) {
    case "":
      return <p>Test</p>;

    default:
      return <UserForm />;
  }
};

export default Renderer;
