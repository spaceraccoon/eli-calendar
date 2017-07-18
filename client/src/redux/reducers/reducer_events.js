import moment from 'moment';
import shortid from 'shortid';

import { FETCH_EVENTS } from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_EVENTS: {
      let { events } = action.payload.data.bwEventList;
      return events.map((event) => {
        return {
          'title': event.summary,
          'start': moment(event.start.utcdate).toDate(),
          'end': moment(event.end.utcdate).toDate(),
          'id': shortid.generate()
        }
      });
    }
    default:
      return state;
  }
}
