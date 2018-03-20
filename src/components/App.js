import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactTree from './react-tree';
import ReduxTree from './redux-tree';

class App extends Component {
    render () {
      return (
        <Router>
          <div>
            <Route exact path='/' component={ReactTree} />
            <Route exact path='/redux' component={ReduxTree} />
          </div>
        </Router>
      )
    }
  }

export default App;
