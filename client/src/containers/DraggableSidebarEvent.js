import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { DragSource } from 'react-dnd';
import BigCalendar from 'react-big-calendar'
import { connect } from 'react-redux';

/* drag sources */
let eventSource = {
  beginDrag(props) {
    return props.event;
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

class DraggableSidebarEvent extends Component {
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

DraggableSidebarEvent.propTypes = propTypes;

export default connect()(DragSource('event', eventSource, collectSource)(DraggableSidebarEvent));
