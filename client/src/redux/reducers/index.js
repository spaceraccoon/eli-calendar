import { combineReducers } from 'redux';
import events from './reducer_events';
import selectedEvents from './reducer_selected_events';
import sidebarEvents from './reducer_sidebar_events';

const rootReducer = combineReducers({
  events,
  selectedEvents,
  sidebarEvents
});

export default rootReducer;
