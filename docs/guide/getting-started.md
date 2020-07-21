# Getting Started

## Quickstart

Navigate to the project where you want to add clivate.
```sh
# Install clivate globally
yarn global add clivate

# Initialize your project
clivate init
```

Follow the prompts to set up clivate for your project. See the [init command](/api/init-command) documentation for more information.

## Using Plugins
You can add CLIvate compatible plugins to extend the commands in your project.

```sh
# Install the plugin
clivate add [custom-plugin-package]
```
This will install the plugin and add it to your config file.

## Using Project Specific commands
`clivate init` gives you the option to add a commands folder to your project. Follow the prompts and see [init command](/api/init-command), [writing commands](), and [running commands]() for more information.

## Creating a Publishable Command
`clivate init` gives you the option to scaffold a new custom command project.

For CLIvate plugins and project specific commands, `clivate` is used to run things. If your goal is to create a command with a different name that can be published to NPM, see [creating a custom command]().

## Creating Plugins
`clivate init` gives you the option to scaffold a new plugin project.

If your goal is to publish new commands for use with `clivate` or a custom command package see [creating a plugin]() for more information.
