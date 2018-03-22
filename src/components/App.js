import React, { Component } from 'react';
//react-router-dom is react-router for browsers.
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactTree from './react-tree';
import ReduxTree from './redux-tree';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-116211451-1');
ReactGA.pageview(window.location.pathname + window.location.search);
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
