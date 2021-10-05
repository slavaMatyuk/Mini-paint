import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import GlobalStyles from './GlobalStyles';
import theme from './Theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
