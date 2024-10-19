import React from "react";
import Hero from "../assets/hero.jpg";

const UserForm = () => {
  return (
    <div className="user-form">
      <img className="hero" src={Hero} />
      <div className="form-container">
        <h3>
          Book An At Home Session With Our Physiotherapists{" "}
          <span>For ₹699!</span>
        </h3>
        <form></form>
      </div>
    </div>
  );
};

export default UserForm;
