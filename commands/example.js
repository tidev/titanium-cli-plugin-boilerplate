/**
 * This hook is an command.
 *
 * @copyright
 * Copyright (c) 2015 by YOUR NAME. All Rights Reserved.
 */

'use strict';

/** The command description */
exports.desc = 'An example command';

/** An extended description that is display on the help screen */
exports.extendedDesc = 'This is an example command. It\'s intended to show off the common components of a Titanium CLI command.';

/**
 * Returns the command's configuration.
 *
 * @param {Object} logger - The logger instance
 * @param {Object} config - The CLI config object
 * @param {CLI} cli - The CLI instance
 *
 * @returns {Object|Function} The command's configuration or an async callback
 */
exports.config = function config(logger, config, cli) {
	return {
		/** Suppress the banner including the version and copyright */
		skipBanner: true,

		/** When true, does not force the user to login to the Appcelerator Network */
		noAuth: true,

		/** Disables sending Titanium CLI analytics to Appcelerator */
		skipSendingAnalytics: true,

		/** Flags */
		flags: {
			'apple': {
				abbr: 'a',
				callback: function (value) {
					// the --apple flag was just detected
				},
				desc: 'apples are red'
			},
			'orange': {
				abbr: 'r',
				desc: 'oranges are not red',
				hideDefault: true,
				negate: true
			}
		},

		/** Options */
		options: {
			'favorite-color': {
				abbr: 't',
				desc: 'your favorite color',
				hint: 'color',
				order: 110,
				values: ['red', 'green', 'blue']
			},
			'name': {
				abbr: 'n',
				desc: 'your name',
				order: 100,
				required: true
			}
		},
		args: [
			{
				name: 'key',
				desc: 'the key to get or set'
			},
			{
				name: 'value',
				desc: 'the value to set the specified key'
			}
		]
	};

	/*
	You can also return a function if you need to perform any async oprations to
	compute the config:

	return function (finished) {
		finished({
			//
		});
	};
	*/
};

/**
 * Allows the command to validate the state including the passed in arguments.
 *
 * @param {Object} logger - The logger instance
 * @param {Object} config - The CLI config object
 * @param {CLI} cli - The CLI instance
 *
 * @returns {Boolean|Function} An async callback that performs the validation
 */
exports.validate = function validate(logger, config, cli) {
	// Perform the validation here. If things look good, simply return true. If
	// something looks funky, you can return anything falsey, or just process.exit(1).

	if (cli.argv.name.length < 2) {
		logger.error('The name must be at least 2 characters');
		logger.error('Rerun the command\n');
		return false;
	}

	return true;

	/*
	When you need to run async operations, simply return a function that will be
	called.

	return function (finished) {
		// perform validation here

		finished(true);
	};
	*/
};

/**
 * Allows the command to validate the state including the passed in arguments.
 *
 * @param {Object} logger - The logger instance
 * @param {Object} config - The CLI config object
 * @param {CLI} cli - The CLI instance
 * @param {Function} [finished(Error, *)] - A callback to fire when the command completes
 *
 * @returns {Boolean|Function} An async callback that performs the validation
 */
exports.run = function run(logger, config, cli, finished) {
	// perform the command's logic

	logger.info('Your name is "%s"', cli.argv.name);
	logger.log();

	// if the command fails, you can pass an Error to the finished() callback
	finished();
};