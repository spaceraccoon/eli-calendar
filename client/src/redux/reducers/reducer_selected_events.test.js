import reducer from './reducer_selected_events';
import { MOVE_EVENT, DELETE_EVENT } from '../actions/types';

describe('Sidebar events reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle MOVE_EVENT', () => {
    const event = {
      'title': 'Sematics Reading Group',
      id: 3801241614
    };

    expect(
      reducer(undefined, {
        type: MOVE_EVENT,
        payload: { event }
      })
    ).toEqual({
      3801241614: {
        title: 'Sematics Reading Group',
        id: 3801241614
      }
    });
  });

  it('should handle DELETE_EVENT', () => {
    const event = {
      'title': 'Sematics Reading Group',
      id: 3801241614
    };

    const state = {
      3801241614: {
        title: 'Sematics Reading Group',
        id: 3801241614
      }
    }

    expect(
      reducer(state, {
        type: DELETE_EVENT,
        payload: { event }
      })
    ).toEqual({});
  });

});
