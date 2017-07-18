import _ from 'lodash';

import { MOVE_EVENT, DELETE_EVENT } from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case MOVE_EVENT: {
      let { event } = action.payload;
      const nextEvents = _.union(state, [event]);
      return nextEvents;
    }
    case DELETE_EVENT: {
      console.log('hi');
      let { event } = action.payload;
      return _.omit(state, event);
    }
    default:
      return state;
  }
}
