import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './src/components/App';
 
ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>, 
  document.getElementById('app'));