import React, { Component } from 'react';
import {
  Row,
  Column,
} from 'react-foundation';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';
import { Route, Switch } from 'react-router-dom'

import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import Calendar from './Calendar';
import Sidebar from './Sidebar';
import Event from './Event';

class Home extends Component {
  render() {
    return (
      <Row>
        <Column medium={3}>
          <Sidebar />
        </Column>
        <Column medium={9}>
          <Switch>
            <Route exact path="/" component={Calendar} />
            <Route path="/events/:eventId" component={Event} />
          </Switch>
        </Column>
      </Row>
    );
  }
}

export default DragDropContext(HTML5Backend)(Home);
