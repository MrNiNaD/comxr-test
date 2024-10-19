import React, { useContext } from "react";
import Hero from "../assets/hero.jpg";
import { MyContext } from "../context";

const UserForm = () => {
  const { state, setState } = useContext(MyContext);

  const config = [
    { label: "Name", key: "name" },
    { label: "Mobile Number", key: "mobile" },
    { label: "City", key: "city" },
    { label: "Pincode", key: "pincode" },
  ];

  const fieldChange = (e) => {
    setState((prev) => ({
      ...prev,
      body: {
        ...(prev?.body ?? {}),
        [e?.target?.name]: e?.target?.value,
      },
    }));
  };

  return (
    <div className="user-form">
      <img className="hero" src={Hero} />
      <div className="form-container">
        <h3>
          Book An At Home Session With Our Physiotherapists{" "}
          <span>For ₹699!</span>
        </h3>
        <form onSubmit={(e) => e.preventDefault()}>
          {config?.map((eachConfig) => {
            return (
              <div className="each-field" key={eachConfig?.key}>
                <label className="label-style">{eachConfig?.label}</label>
                <input
                  onChange={fieldChange}
                  className="field-style"
                  name={eachConfig?.key}
                />
              </div>
            );
          })}
          <button className="btn-style">Proceed</button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
