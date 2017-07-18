import React from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import BigCalendar from 'react-big-calendar'

import * as actions from '../redux/actions';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import withDrop from './DropCalendar';

BigCalendar.momentLocalizer(moment);
const DropCalendar = withDrop(BigCalendar);

class Calendar extends React.Component {
  onEventDrop({ event, start, end }) {
    this.props.moveEvent({ event });
  }

  render(){
    return (
      <div>
        <DropCalendar
          popup
          events={this.props.selectedEvents}
          onEventDrop={this.onEventDrop.bind(this)}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { selectedEvents: state.selectedEvents };
}

export default connect(mapStateToProps, actions)(Calendar);
