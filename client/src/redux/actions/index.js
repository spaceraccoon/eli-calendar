import { MOVE_EVENT } from './types';

export function moveEvent({ event, start, end }) {
  return {
    type: MOVE_EVENT,
    payload: { event, start, end }
  }
}
