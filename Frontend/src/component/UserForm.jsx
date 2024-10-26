import React, { useContext } from "react";
import Hero from "../assets/hero.jpg";
import { MyContext } from "../context";
import { toast } from "react-toastify";
import { cities } from "../constant";

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

  const onSubmit = () => {
    for (let i = 0; i < config.length; i++) {
      const eachConfig = config?.[i];

      if (!state.body?.[eachConfig?.key]) {
        toast.error(`${eachConfig?.label} should not be empty.`);
        return;
      }
    }

    setState((prev) => ({ ...prev, mode: "2" }));
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
                {eachConfig?.key === "city" ? (
                  <div className="select-div">
                    <select
                      onChange={fieldChange}
                      className="field-style select-style"
                      name={eachConfig?.key}
                      value={state?.body?.[eachConfig?.key] ?? ""}
                    >
                      {cities.map((city) => (
                        <option key={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <input
                    onChange={fieldChange}
                    className="field-style"
                    name={eachConfig?.key}
                    value={state?.body?.[eachConfig?.key] ?? ""}
                  />
                )}
              </div>
            );
          })}
          <button onClick={onSubmit} className="btn-style">
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
