import React from "react";
import { MyContext } from "./context";
import Topbar from "./component/Topbar";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <MyContext.Provider value={{}}>
      <section>
        <Topbar />
      </section>
      <ToastContainer autoClose={2000} />
    </MyContext.Provider>
  );
};

export default App;
