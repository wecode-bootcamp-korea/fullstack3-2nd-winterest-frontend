import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from '../src/Styles/GlobalStyle';
import Theme from './Styles/Theme';
import { ThemeProvider } from 'styled-components';
import Router from './Router';

ReactDOM.render(
  <>
    <GlobalStyle />
    <ThemeProvider Theme={Theme}>
      <Router />
    </ThemeProvider>
  </>,
  document.getElementById('root'),
);
