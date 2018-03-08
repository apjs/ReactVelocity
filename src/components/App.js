import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Tree from './tree';
 
const App = () => (
  <MuiThemeProvider>
      <Tree />
  </MuiThemeProvider>
);

export default App;