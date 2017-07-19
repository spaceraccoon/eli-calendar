import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { DragSource } from 'react-dnd';
import BigCalendar from 'react-big-calendar'
import { connect } from 'react-redux';

import { deleteEvent } from '../redux/actions';

/* drag sources */
let eventSource = {
  beginDrag(props) {
    return props.event;
  },
  endDrag(props, monitor) {
    const event = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.dispatch(deleteEvent({ event }));
    }
  }
}

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  event: PropTypes.object.isRequired
}

class DraggableCalendarEvent extends Component {
  render() {
    let { connectDragSource, isDragging, event } = this.props;
    let EventWrapper = BigCalendar.components.eventWrapper;

    return (
      <EventWrapper event={event}>
        {connectDragSource(<div className="rbc-event" style={{ opacity: isDragging ? 0.5 : 1 }}>
          {event.title}
        </div>)}
      </EventWrapper>
    );
  }
}

DraggableCalendarEvent.propTypes = propTypes;

export default connect()(DragSource('event', eventSource, collectSource)(DraggableCalendarEvent));
