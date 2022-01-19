import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from '../src/Styles/GlobalStyle';
import Theme from '../src/Styles/Theme';
import { ThemeProvider } from 'styled-components';
import Router from './Router';

ReactDOM.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={Theme}>
      <Router />
    </ThemeProvider>
  </>,
  document.getElementById('root'),
);
