import React, { useContext } from "react";
import Arrow from "../assets/arrow.png";
import { MyContext } from "../context";

const Topbar = () => {
  const { state, setInBluk } = useContext(MyContext);
  const mode = state?.mode;

  const onClick = () => {
    if (mode == "2") {
      setInBluk({ mode: "1" });
    }

    if (mode == "3") {
      setInBluk({ mode: "2" });
    }
  };

  return (
    <div className="top-bar">
      <button onClick={onClick} className="remove-button-styling">
        <img src={Arrow} />
      </button>
    </div>
  );
};

export default Topbar;
