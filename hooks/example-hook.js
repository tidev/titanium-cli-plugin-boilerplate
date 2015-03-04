/**
 * This hook is an example.
 *
 * @copyright
 * Copyright (c) 2015 by YOUR NAME. All Rights Reserved.
 */

'use strict';

/** The plugin's identifier */
exports.id = 'com.example.hook';

/** The Titanium CLI version that this hook is compatible with */
exports.cliVersion = '>=3.2';

/**
 * Initialize the hook.
 *
 * @param {Object} logger - The logger instance
 * @param {Object} config - The CLI config object
 * @param {CLI} cli - The CLI instance
 * @param {Object} appc - The node-appc library
 */
exports.init = function init(logger, config, cli, appc) {
	cli.on('cli:post-execute', function () {
		console.info('command finished');
	});
};