const promisify = require('./promisify');
const childProcess = require('child_process');
const fs = require('fs');


function executeNpmScript(settings, npmScript) {
	return promisify.toPromise(settings, cb => {
		let child = childProcess.exec(npmScript, {
			stdio: 'inherit'
		}, cb);

		child.stderr.on('data', function(data) {
			console.error(data);
		});

		child.stdout.on('data', function(data) {
			console.log(data);
		});
	});
}


exports.init = function (settings) {
	return executeNpmScript(settings, 'npm init -y');
};

exports.installDevDependencies = function (settings) {
	return executeNpmScript(settings, 'npm install --save-dev ' + settings.devDependencies.join(' '));
};

exports.installDependencies = function (settings) {
	return executeNpmScript(settings, 'npm install --save ' + settings.dependencies.join(' '));
};

exports.addScripts = function (settings) {
	return promisify.toPromiseAndReturn(cb => {
			console.log('reading');
			fs.readFile('package.json', cb);
		})
		.then(contents => { 
			console.log('parsing');
			return JSON.parse(contents); 
		})
		.then(pkg => {
			console.log('extending');
			return Object.assign({}, pkg, {
				scripts: {
					"start": "webpack-dev-server --open",
					"build": "webpack --config webpack.prod.config.js",
					"sync": "gulp sync-contensis",
					"lint": "eslint -- ./src",
					"lint:fix": "npm run lint --fix"
				}
			});
		})
		.then(pkg => {
			console.log('stringyfying');
			return JSON.stringify(pkg, null, '\t');
		})
		.then(contents => {
			console.log('writing');
			return promisify.toPromise(settings, cb => fs.writeFile('package.json', contents, cb));
		})
		.then(x => {
			console.log('done');
			return x;
		});;
};