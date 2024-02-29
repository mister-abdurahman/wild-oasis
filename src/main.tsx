import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AppTest from "./renderProps-test";
import AppCC from "./Compound Component/App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    {/* <AppTest /> */}
    {/* <AppCC /> */}
  </React.StrictMode>
);
