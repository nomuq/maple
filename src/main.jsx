import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import FontStyles from "./styles/fontStyles";
import App from "./App";
import "./firebase";

ReactDOM.render(
  <>
    <FontStyles />
    <App />
  </>,
  document.getElementById("root")
);
