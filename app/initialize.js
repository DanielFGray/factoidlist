import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App';

injectTapEventPlugin();

const Init = (props) => (
  <MuiThemeProvider>
    <App {...props} />
  </MuiThemeProvider>
);

const AppRoutes = (
  <Router history={browserHistory}>
    <Route path="/" component={Init}>
      <Route path=":factdb" />
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', () => {
  render(AppRoutes, document.querySelector('#app'));
});
