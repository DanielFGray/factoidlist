import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';

import configureStore from './store';
import App from './containers/App';

let store = configureStore();

const Init = (props) => (
  <Provider store={store}>
    <App {...props} />
  </Provider>
);

const AppRoutes = (
  <Router history={hashHistory}>
    <Route path="/" component={Init}>
      <Route path=":factdb" />
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', () => {
  render(AppRoutes, document.querySelector('#app'));
});
