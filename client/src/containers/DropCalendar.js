import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cn from 'classnames';

import { accessor } from 'react-big-calendar/lib/utils/propTypes';
import DraggableEvent from './DraggableEvent';
import { DayWrapper, DateCellWrapper } from './BackgroundWrapper';

export default function withDrop(Calendar) {

  class DropCalendar extends Component {
    static propTypes = {
      selectable: PropTypes.oneOf([true, false, 'ignoreEvents']).isRequired,
      components: PropTypes.object,
    }
    getChildContext() {
      return {
        onEventDrop: this.props.onEventDrop,
        startAccessor: this.props.startAccessor,
        endAccessor: this.props.endAccessor
      }
    }

    constructor(...args) {
      super(...args);
      this.state = { isDragging: false };
    }

    componentWillMount() {
      let monitor = this.context.dragDropManager.getMonitor()
      this.monitor = monitor
      this.unsubscribeToStateChange = monitor
        .subscribeToStateChange(this.handleStateChange)
    }

    componentWillUnmount() {
      this.monitor = null
      this.unsubscribeToStateChange()
    }

    handleStateChange = () => {
      const isDragging = !!this.monitor.getItem();

      if (isDragging !== this.state.isDragging) {
        setTimeout(() => this.setState({ isDragging }));
      }
    }

    render() {
      const { selectable, components, ...props } = this.props;

      delete props.onEventDrop;

      props.selectable = selectable
        ? 'ignoreEvents' : false;

      props.className = cn(
        props.className,
        'rbc-addons-dnd',
        this.state.isDragging && 'rbc-addons-dnd-is-dragging'
      )

      props.components = {
        ...components,
        eventWrapper: DraggableEvent,
        dateCellWrapper: DateCellWrapper,
        dayWrapper: DayWrapper
      }

      return <Calendar {...props} />
    }
  }

  DropCalendar.propTypes = {
    onEventDrop: PropTypes.func.isRequired,
    startAccessor: accessor,
    endAccessor: accessor
  }

  DropCalendar.defaultProps = {
    startAccessor: 'start',
    endAccessor: 'end'
  };

  DropCalendar.contextTypes = {
    dragDropManager: PropTypes.object
  }

  DropCalendar.childContextTypes = {
    onEventDrop: PropTypes.func,
    startAccessor: accessor,
    endAccessor: accessor
  }

  return DropCalendar;
}
