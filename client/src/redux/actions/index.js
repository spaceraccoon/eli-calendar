import axios from 'axios';

import { MOVE_EVENT, FETCH_EVENTS } from './types';

export function moveEvent({ event, start, end }) {
  return {
    type: MOVE_EVENT,
    payload: { event, start, end }
  }
}

export function fetchEvents() {
  const request = axios.get('/api/events');

  return {
    type: FETCH_EVENTS,
    payload: request
  }
}
