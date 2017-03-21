/**
 * Created by dines on 2017-03-20.
 */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
//var routes = require('./config/routes');

var Hello = React.createClass({
  render: function () {
    return (
      <h1>Hello, hapi-react-ing!!</h1>
    )
  }
});

ReactDOM.render(
  <Hello/>,
  document.getElementById('app')
);