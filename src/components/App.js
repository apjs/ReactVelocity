import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import WebPage from './webpage';
import Tree from './tree';
 
const App = () => (
  <MuiThemeProvider>
    <div>
      <WebPage />
      <Tree />
    </div>
  </MuiThemeProvider>
);

export default App;