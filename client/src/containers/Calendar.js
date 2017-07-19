import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import BigCalendar from 'react-big-calendar'

import * as actions from '../redux/actions';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import DraggableCalendarEvent from './DraggableCalendarEvent';
import Toolbar from './Toolbar';

BigCalendar.momentLocalizer(moment);
const DropCalendar = withDragAndDrop(BigCalendar, { backend: false });

class Calendar extends Component {
  onEventDrop({ event, start, end }) {
    this.props.moveEvent({ event });
  }

  render(){
    let components = {
      event: DraggableCalendarEvent,
      toolbar: Toolbar
    }

    return (
      <div>
        <DropCalendar
          popup
          events={this.props.selectedEvents}
          onEventDrop={this.onEventDrop.bind(this)}
          components={components}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { selectedEvents: state.selectedEvents };
}

export default connect(mapStateToProps, actions)(Calendar);
