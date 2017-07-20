import axios from 'axios';

import {
  MOVE_EVENT,
  SELECT_EVENT,
  FETCH_EVENTS,
  DELETE_EVENT
} from './types';

export function moveEvent(event) {
  return {
    type: MOVE_EVENT,
    payload: event
  }
}

export function selectEvent(event) {
  return {
    type: SELECT_EVENT,
    payload: event
  }
}

export function fetchEvents(values) {
  const request = axios.post('/api/events', values);

  return {
    type: FETCH_EVENTS,
    payload: request
  }
}

export function deleteEvent(event) {
  return {
    type: DELETE_EVENT,
    payload: event
  }
}
