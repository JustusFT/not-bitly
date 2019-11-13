// babel polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";

import "normalize.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("root"));
