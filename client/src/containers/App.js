import React, { Component } from 'react';
import {
  Row,
  Column,
} from 'react-foundation';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import Header from './Header';
import Calendar from './Calendar';
import Sidebar from './Sidebar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Row>
          <Column large={3}>
            <Sidebar />
          </Column>
          <Column large={9}>
            <Calendar />
          </Column>
        </Row>
      </div>
    );
  }
}

export default App;
