import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./App";
import { createStore } from "redux";
import reducer from "./reducers";

const store = createStore(reducer);

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
