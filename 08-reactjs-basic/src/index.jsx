import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";

import App from "./App";

import store from "./store";

const node = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <>
      <CssBaseline />
      <App />
    </>
  </Provider>,
  node
);
