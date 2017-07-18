import React from 'react'
import { connect } from 'react-redux';
import moment from 'moment';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import * as actions from '../redux/actions';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Calendar extends React.Component {
  onEventDrop({ event, start, end }) {
    this.props.moveEvent({ event, start, end });
  }

  render(){
    return (
      <DragAndDropCalendar
        popup
        selectable
        events={this.props.events}
        onEventDrop={this.onEventDrop.bind(this)}
      />
    )
  }
}

function mapStateToProps(state) {
  return { events: state.events };
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, actions)(Calendar))
