import events from '../../containers/events';
import {
  MOVE_EVENT
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case MOVE_EVENT: {
      var { event, start , end } = action.payload;
      const idx = state.indexOf(event);
      const updatedEvent = { ...event, start, end };
      const nextEvents = [...state];
      nextEvents.splice(idx, 1, updatedEvent);
      return nextEvents;
    }
    default:
      return events;
  }
}
