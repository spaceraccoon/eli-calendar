import React, { Component } from 'react';
import Alert from 'react-s-alert';

import './App.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import Header from './Header';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Home />
        <Alert
          stack={{limit: 3}}
          timeout={1000}
          position={'top'}
          effect={'stackslide'}
        />
      </div>
    );
  }
}

export default App;
