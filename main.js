import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from './src/components/App';
 
ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <App />
  </MuiThemeProvider>, 
  document.getElementById('app'));