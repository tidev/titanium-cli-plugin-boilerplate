/**
 * Packages up a Titanium CLI plugin for distribution.
 *
 * Modify this file as you see fit.
 */

'use strict';

console.info('Titanium CLI Plugin Packager\n');

var ignoreFiles = /^(\.DS_Store|\._.*|\.gitignore|npm-debug\.log|package\.js|.*\.zip)$/,
	ignoreDirs = /^(\.git)$/;

var fs = require('fs'),
	path = require('path'),
	spawn = require('child_process').spawn;

if (process.platform === 'win32') {
	console.error('Sorry, Windows not supported\n');
	process.exit(1);
}

var packageJson = path.join(__dirname, 'package.json');

if (!fs.existsSync(packageJson)) {
	console.error('package.json does not exist!');
	console.error('Aborting\n');
	process.exit(1);
}

try {
	packageJson = JSON.parse(fs.readFileSync(packageJson));
} catch (ex) {
	console.error('Error parsing package.json:');
	console.error(ex);
	console.log();
	process.exit(1);
}

if (!packageJson.name) {
	console.error('package.json missing "name"\n');
	process.exit(1);
}

if (!packageJson.version) {
	console.error('package.json missing "version"\n');
	process.exit(1);
}

// find all files
var srcFiles = [];
(function walk(dir) {
	fs.readdirSync(dir).forEach(function (name) {
		var file = path.join(dir, name);
		if (fs.statSync(file).isDirectory()) {
			!ignoreDirs.test(name) && walk(file);
		} else {
			!ignoreFiles.test(name) && srcFiles.push(file);
		}
	});
}(__dirname));

function nukeDir(dir) {
	if (fs.existsSync(dir)) {
		fs.readdirSync(dir).forEach(function (name) {
			var file = path.join(dir, name);
			if (fs.lstatSync(file).isDirectory()) {
				nukeDir(file);
			} else {
				fs.unlinkSync(file);
			}
		});
		fs.rmdirSync(dir);
	}
}

function makeDir(dir) {
	if (!fs.existsSync(dir)) {
		try {
			fs.mkdirSync(dir);
		} catch (ex) {
			makeDir(path.dirname(dir));
			fs.mkdirSync(dir);
		}
	}
}

// create the temp directory
var tmpDir = path.join(__dirname, 'tmp_' + String(Math.round(Math.random() * 10000000000))),
	destDir = path.join(tmpDir, 'plugins', packageJson.name, packageJson.version);

fs.existsSync(tmpDir) && nukeDir(tmpDir);
makeDir(destDir);

// copy the files
srcFiles.forEach(function (file) {
	var rel = file.replace(__dirname + '/', ''),
		dest = path.join(destDir, rel);
	makeDir(path.dirname(dest));
	fs.writeFileSync(dest, fs.readFileSync(file));
});

var filename = packageJson.name + '-' + packageJson.version + '.zip',
	outFile = path.join(__dirname, filename),
	relPath = packageJson.name + '/' + packageJson.version;

fs.existsSync(outFile) && fs.unlinkSync(outFile);

if (packageJson.dependencies) {
	console.info('Running npm install');
	var npm = spawn('npm', ['install'], { cwd: destDir });
	npm.stdout.on('data', function () {});
	npm.stderr.on('data', function () {});
	npm.on('close', function () {
		zipFiles();
	});
} else {
	console.log('Skipping npm install');
	zipFiles();
}

function zipFiles() {
	console.info('Zipping files');
	var zip = spawn('zip', ['-X', '-r', outFile, 'plugins'], { cwd: tmpDir });
	zip.stdout.on('data', function () {});
	zip.stderr.on('data', function () {});
	zip.on('close', function () {
		nukeDir(tmpDir);
		console.info('Packaged plugin: %s\n', filename);
	});
}