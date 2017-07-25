import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';

import Home from './Home';
import Calendar from './Calendar';
import Sidebar from './Sidebar';
import reducers from '../redux/reducers';

let store = createStore(
  reducers,
  undefined,
  compose (
    applyMiddleware(promise),
  )
);

describe('Home', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
  });

  it('renders without crashing', () => {});

  it('shows a calendar', () => {
    expect(wrapper.find('#calendar')).toHaveLength(1);
  })

  it('shows a sidebar', () => {
    expect(wrapper.find('#sidebar')).toHaveLength(1);
  })

});
