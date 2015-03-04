# Titanium CLI Plugin Boilerplate

This is boilerplate for creating a Titanium CLI plugin. You should feel free to
change whatever you want.

## Installation

To always load the plugin, you need to add the `commands` and `hooks` directories
to the Titanium CLI's paths configuration:

```
ti config -a paths.commands /path/to/plugin/commands
ti config -a paths.hooks /path/to/plugin/hooks
```

Alternatively, you may extract the plugin to the global Titanium installation
folder or project directory, then enable it in the `tiapp.xml`:

```
<?xml version="1.0" encoding="UTF-8"?>
<ti:app xmlns:ti="http://ti.appcelerator.org">
	<plugins>
		<plugin version="1.0">PLUGIN_NAME</plugin>
	</plugins>
</ti:app>
```

## package.json

If your Titanium CLI plugin includes Node.js dependencies, then they will be
installed while packaging the plugin for distribution.

## Packaging for Distribution

To package the plugin, run:

```
node build.js
```
