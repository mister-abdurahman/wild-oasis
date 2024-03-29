import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import AppTest from "./renderProps-test";
import AppCC from "./Compound Component/App";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <App />
    </ErrorBoundary>
    {/* <AppTest /> */}
    {/* <AppCC /> */}
  </React.StrictMode>
);
