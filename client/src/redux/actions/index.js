import axios from 'axios';

import { MOVE_EVENT, FETCH_EVENTS, DELETE_EVENT } from './types';

export function moveEvent({ event }) {
  return {
    type: MOVE_EVENT,
    payload: { event }
  }
}

export function fetchEvents() {
  const request = axios.get('/api/events');

  return {
    type: FETCH_EVENTS,
    payload: request
  }
}

export function deleteEvent({ event }) {
  return {
    type: DELETE_EVENT,
    payload: { event }
  }
}
