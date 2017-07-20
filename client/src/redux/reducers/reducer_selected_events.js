import _ from 'lodash';
import Alert from 'react-s-alert';

import { MOVE_EVENT, DELETE_EVENT } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case MOVE_EVENT: {
      let { event } = action.payload;
      Alert.success(`Added ${event.title} to calendar`);
      return { ...state, [event.id]: event };
    }
    case DELETE_EVENT: {
      let { event } = action.payload;
      Alert.success(`Deleted ${event.title} from calendar`);
      return _.omit(state, event.id);
    }
    default:
      return state;
  }
}
