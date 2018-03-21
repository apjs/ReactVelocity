/*
  This is the file that renders directly to the index.html inside the App id.
   MuiThemeProvider is our Material UI boilerplate.
*/
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './src/components/App';

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  document.getElementById('app'));
