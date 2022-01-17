import React from "react";
import ReactDOM from "react-dom";
import GlobalStyle from "../src/Styles/GlobalStyle";
import theme from "../src/Styles/theme";
import { ThemeProvider } from "styled-components";
import Router from "./Router";

ReactDOM.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </>,
  document.getElementById("root")
);
