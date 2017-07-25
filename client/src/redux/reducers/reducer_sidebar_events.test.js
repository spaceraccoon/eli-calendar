import moment from 'moment';

import reducer from './reducer_sidebar_events';
import { FETCH_EVENTS } from '../actions/types';

describe('Sidebar events reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle FETCH_EVENTS', () => {
    const events = [{
      summary: "Sematics Reading Group",
      eventlink: "http://calendar.yale.edu/cal/event/eventView.do?calPath=%2Fpublic%2Fcals%2FMainCal&guid=CAL-2c9cb3cc-5a0971f1-015a-1e78d993-00000378bedework@yale.edu&recurrenceId=20170418T193000Z",
      formattedDate: "Tuesday, April 18, 2017 3:30 PM - Tue , August 1, 2017 4:50 PM",
      start: {
        utcdate: "20170418T193000Z",
      },
      end: {
        utcdate: "20170801T205000Z",
      },
      location: {},
      contact: {},
      description: "See Google Calendar Our default text will be Jessica Rett's Semantics of Evaluativity",
    }];

    expect(
      reducer(undefined, {
        type: FETCH_EVENTS,
        payload: {data: {bwEventList: {events}}}
      })
    ).toEqual({
      3801241614: {
        title: 'Sematics Reading Group',
        start: moment('20170418T193000Z').toDate(),
        end: moment('20170801T205000Z').toDate(),
        id: 3801241614,
        formattedDate: 'Tuesday, April 18, 2017 3:30 PM - Tue , August 1, 2017 4:50 PM',
        contact: {},
        location: {},
        description: 'See Google Calendar Our default text will be Jessica Rett\'s Semantics of Evaluativity'
      }
    });
  });
});
