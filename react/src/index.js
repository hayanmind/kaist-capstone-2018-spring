import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';
import routes from 'routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

render(
  <Provider store={store}>
    <MuiThemeProvider>
      {routes}
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('react')
);
