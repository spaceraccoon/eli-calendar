import moment from 'moment';
import _ from 'lodash';
import hash from 'string-hash';

import { FETCH_EVENTS } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_EVENTS: {
      if (!action.payload.data) {
        return state;
      }
      let { events } = action.payload.data.bwEventList;
      let eventsArray = events.map((event) => {
        return {
          'title': event.summary.replace(/&rsquo;/g, "'").replace(/&rdquo;|&ldquo;/g, '"').replace(/&ndash;|&mdash;/g, '-'),
          'start': moment(event.start.utcdate).toDate(),
          'end': moment(event.end.utcdate).toDate(),
          'id': hash(event.eventlink),
          'formattedDate': event.formattedDate,
          'contact': event.contact,
          'location': event.location,
          'description': event.description.replace(/&rsquo;/g, "'").replace(/&rdquo;|&ldquo;/g, '"').replace(/&ndash;|&mdash;/g, '-')
        }
      });
      let newState = { ...state, ..._.mapKeys(eventsArray, 'id') };
      return { ...state, ..._.mapKeys(eventsArray, 'id') };
    }
    default:
      return state;
  }
}
