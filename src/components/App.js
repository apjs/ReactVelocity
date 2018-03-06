import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import WebPage from './webpage';
 
const App = () => (
  <MuiThemeProvider>
      <WebPage />
  </MuiThemeProvider>
);

export default App;