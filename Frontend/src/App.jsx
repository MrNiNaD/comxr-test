import React, { useState } from "react";
import { MyContext } from "./context";
import Topbar from "./component/Topbar";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Renderer from "./component/Renderer";
import { initialSate } from "./constant";

const App = () => {
  const [state, setState] = useState(initialSate);

  const setInBluk = (obj) => setState((prev) => ({ ...prev, ...obj }));

  const setInBody = (obj) =>
    setState((prev) => ({
      ...prev,
      body: {
        ...(prev?.body ?? {}),
        ...obj,
      },
    }));

  return (
    <MyContext.Provider value={{ setState, state, setInBluk, setInBody }}>
      <section>
        <Topbar />
        <Renderer />
      </section>
      <ToastContainer autoClose={2000} />
    </MyContext.Provider>
  );
};

export default App;
