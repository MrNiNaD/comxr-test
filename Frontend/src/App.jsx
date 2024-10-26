import React, { useState } from "react";
import { MyContext } from "./context";
import Topbar from "./component/Topbar";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Renderer from "./component/Renderer";
import { cities } from "./constant";

const App = () => {
  const [state, setState] = useState({ mode: "3", body: { city: cities[0] } });

  const setInBluk = (obj) => setState((prev) => ({ ...prev, ...obj }));

  return (
    <MyContext.Provider value={{ setState, state, setInBluk }}>
      <section>
        <Topbar />
        <Renderer />
      </section>
      <ToastContainer autoClose={2000} />
    </MyContext.Provider>
  );
};

export default App;
