import './main.html';
import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/App.js';

Meteor.startup(()=>{
	render(<App />, document.getElementById('main'));
});


