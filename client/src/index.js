import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist'
import promise from 'redux-promise';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './redux/reducers';

const store = createStore(
  reducers,
  undefined,
  compose (
    applyMiddleware(promise),
    autoRehydrate()
  )
);

persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path="/" component={App} />
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
