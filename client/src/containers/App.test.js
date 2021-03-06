import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';

import reducers from '../redux/reducers';

let store = createStore(
  reducers,
  undefined,
  compose (
    applyMiddleware(promise),
  )
);

import App from './App';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
  });

  it('renders without crashing', () => {});
});
