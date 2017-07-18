import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Column,
} from 'react-foundation';

import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import Header from './Header';
import Calendar from './Calendar';
import Sidebar from './Sidebar';
import * as actions from '../redux/actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

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

export default connect(null, actions)(App);
