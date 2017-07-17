import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, IndexRoute } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './redux/reducers';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App}>
      </Route>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
