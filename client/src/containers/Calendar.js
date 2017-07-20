import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import BigCalendar from 'react-big-calendar'
import _ from 'lodash';
import { Button } from 'react-foundation';
import ical from 'ical-generator';
import fileDownload from 'react-file-download';

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

  handleClick() {
    console.log(this.props.selectedEvents);
    let cal = ical({domain: 'github.com', name: 'EliCal Export'});

    this.props.selectedEvents.map((event) => {
      let {
        title,
        start,
        end,
        location,
        description
      } = event;

      cal.createEvent({
      	start,
      	end,
      	summary: title,
      	description,
      	location: `${location.address}, ${location.street}, ${location.city}`
      });

      return(event);
    })

    var data = new Blob([cal.toString()], {type: 'text/calendar'});
    fileDownload(data, 'download.ics');
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
          views={['month', 'week', 'day']}
          components={components}
        />
        <Button onClick={this.handleClick.bind(this)}>Export Calendar as iCal</Button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { selectedEvents: _.toArray(state.selectedEvents) };
}

export default connect(mapStateToProps, actions)(Calendar);
