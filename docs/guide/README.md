# Introduction

ClIvate (pronounced CLI-vate or salivate) is a TypeScript powered framework for building command-line applications. It provides a consistent structure for building commands in a project, for a custom publishable command, or as a reusable plugin.

CLIvate doesn't try to reinvent the wheel. It uses [Commander (for terminal commands)](https://www.npmjs.com/package/commander) and [Inquirer (for interactive prompts)](https://www.npmjs.com/package/inquirer) under the hood. Consider using those packages if you want more control.

CLIvate provides:

- A unified interface for combining command arguments and prompts.
- A `clivate` command to help with scaffolding and running project commands.
- Templates and scaffolding helpers.
- Tooling for building publishable CLI applications
- A plugin system for creating reusable commands.


