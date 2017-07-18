import { combineReducers } from 'redux';
import events from './reducer_events';
import selectedEvents from './reducer_selected_events';

const rootReducer = combineReducers({
  events,
  selectedEvents
});

export default rootReducer;
