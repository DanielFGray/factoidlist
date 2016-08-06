import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './store';
import App from './components/App';

injectTapEventPlugin();
let store = configureStore();

const Init = (props) => (
  <MuiThemeProvider>
    <Provider store={store}>
      <App {...props} />
    </Provider>
  </MuiThemeProvider>
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
