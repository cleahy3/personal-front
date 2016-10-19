
var App = require('./components/app.jsx');
var Nav = require('./components/nav.jsx');
import React from 'react';
import ReactDom from 'react-dom';
import Popup from 'react-popup';

ReactDOM.render(
    <Popup />,
    document.getElementById('popupContainer')
);
ReactDOM.render(
  <App />,
  document.getElementById('app')
);

ReactDOM.render(
  <Nav / >,
  document.getElementById('nav')
);
