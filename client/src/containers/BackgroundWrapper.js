import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'

import dates from 'react-big-calendar/lib/utils/dates';
import BigCalendar from 'react-big-calendar'

export function getEventTimes(start, end, dropDate, type) {
  // Calculate duration between original start and end dates
  const duration = dates.diff(start, end)

  // If the event is dropped in a "Day" cell, preserve an event's start time by extracting the hours and minutes off
  // the original start date and add it to newDate.value
  const nextStart = type === 'dateCellWrapper'
    ? dates.merge(dropDate, start) : dropDate

  const nextEnd = dates.add(nextStart, duration, 'milliseconds')

  return {
    start: nextStart,
    end: nextEnd
  }
}

const propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  type: PropTypes.string
}

class DraggableBackgroundWrapper extends Component {
  render() {
    const { connectDropTarget, children, type } = this.props;
    const BackgroundWrapper = BigCalendar.components[type];

    let resultingChildren = children

    return (
      <BackgroundWrapper>
        {connectDropTarget(resultingChildren)}
      </BackgroundWrapper>
    );
  }
}
DraggableBackgroundWrapper.propTypes = propTypes;

DraggableBackgroundWrapper.contextTypes = {
  onEventDrop: PropTypes.func,
  dragDropManager: PropTypes.object
}

function createWrapper(type) {
  function collectTarget(connect, monitor) {
    return {
      type,
      connectDropTarget: connect.dropTarget()
    };
  }


  const dropTarget = {
    drop(_, monitor, { props, context }) {
      const event = monitor.getItem();
      const { value } = props
      const { onEventDrop } = context

      onEventDrop({
        event,
        ...getEventTimes(value, type)
      })
    }
  };



  return DropTarget(['event'], dropTarget, collectTarget)(DraggableBackgroundWrapper);
}

export const DateCellWrapper = createWrapper('dateCellWrapper');
export const DayWrapper = createWrapper('dayWrapper');
