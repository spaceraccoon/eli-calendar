import moment from 'moment';

import {
  MOVE_EVENT,
  FETCH_EVENTS
} from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case MOVE_EVENT: {
      var { event, start , end } = action.payload;
      const idx = state.indexOf(event);
      const updatedEvent = { ...event, start, end };
      const nextEvents = [...state];
      nextEvents.splice(idx, 1, updatedEvent);
      return nextEvents;
    }
    case FETCH_EVENTS: {
      var { events } = action.payload.data.bwEventList;
      return events.map((event) => {
        return {
          'title': event.summary,
          'start': moment(event.start.utcdate),
          'end': moment(event.end.utcdate),
        }
      });
    }
    default:
      return state;
  }
}
