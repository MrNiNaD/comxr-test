import React, { useState } from "react";
import { MyContext } from "./context";
import Topbar from "./component/Topbar";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Renderer from "./component/Renderer";

const App = () => {
  const [state, setState] = useState();

  return (
    <MyContext.Provider value={{ setState, state }}>
      <section>
        <Topbar />
        <Renderer />
      </section>
      <ToastContainer autoClose={2000} />
    </MyContext.Provider>
  );
};

export default App;
