#!/usr/bin/env node

const fs = require('fs');
const inquirer = require('inquirer');
const npm = require('./tasks/npm');
const defaults = require('./tasks/default-settings');
const fileBuilder = require('./tasks/file-builder');
const questions = require('./tasks/questions');

/*
	TODO:
	Don't use componentName use:
		<%= contentTypeId.toTitleCase() %>

	Validate settings
		eg. Check Content Type exists
	
	Record:
		Build the Record Page by using the fields from the Content Type
		
	Create store and load app before we have the data
		then load the data into the store
	
	Add an Entry Record Page and wire this up to the App routes

	Do we need an option for a simple server only project?
		This wouldn't need a number of npm packages
		Like sagas, router and possibly not even redux
	
	Connect router to the store

	redux-devtools https://github.com/reactjs/react-router-redux/blob/master/examples/basic/app.js

	Add Paging to Listing
*/

function log(s) {
	return settings => {
		console.log(s);
		return settings;
	};
}

inquirer.prompt(questions)
	.then(log('Retreiving Content Type Details...'))
	.then(defaults.extend)
	.then(log('Initialising NPM...'))
	.then(npm.init)
	.then(log('Installing NPM dev dependencies...'))
	.then(npm.installDevDependencies)
	.then(log('Installing NPM dependencies...'))
	.then(npm.installDependencies)
	.then(log('Adding NPM scripts...'))
	.then(npm.addScripts)
	.then(log('Creating Project Files...'))
	.then(fileBuilder.copyTemplates)
	.then(log('Setup Complete use npm run start'))
	.catch(e => console.log('ERROR', e));


//	console.log('Setup Complete use npm run start');

//});