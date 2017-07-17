import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import events from './events';

class Calendar extends Component {
  render() {
    BigCalendar.momentLocalizer(moment);

    return (
      <div>
        <BigCalendar
          events={events}
        />
      </div>
    );
  }
}

export default Calendar;
