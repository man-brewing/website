import React from 'react';
import Home from './components/Home'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Fermentorium from './components/Fermentorium';

class App extends React.Component {

  render() {
    return (
      <Router>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <Switch>
          <Route path="/fermentorium">
            <Fermentorium />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>      
    )
  }
}

export default App;
