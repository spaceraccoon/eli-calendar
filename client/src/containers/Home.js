import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Column,
} from 'react-foundation';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';

import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import Calendar from './Calendar';
import Sidebar from './Sidebar';
import * as actions from '../redux/actions';

class Home extends Component {
  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    return (
      <Row>
        <Column large={3}>
          <Sidebar />
        </Column>
        <Column large={9}>
          <Calendar />
        </Column>
      </Row>
    );
  }
}

export default DragDropContext(HTML5Backend)(connect(null, actions)(Home));
