import {render} from 'react-dom';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Comments from './components/Comments';

render(
  <MuiThemeProvider>
    <Comments/>
  </MuiThemeProvider>,
  document.getElementById('app')
);
