# init command

Initialize the project using the `clivate` command.
```sh
clivate init
```
The command will ask several questions about your project setup:

**What type of project do you want to create?** <br/>
- Add clivate config to only use plugins - Adds a config file for registering and using plugins from NPM.
- Add custom commands to my project - Scaffolds a commands folder for writing custom commands in your project.
- Create a new command package - Creates a new project folder for writing and deploying custom commands.
- Create a plugin package - Creates a new project folder for writing and deploying plugins.

**Generate a commands folder for custom project commands?**

- Enter `Yes(default)` to generate a folder for your custom commands.
- Enter `No` to skip commands folder generation and only create the config file.

**Provide a location for the custom commands folder**

Enter a path relative to your project root where the `./commands/ (default)` folder will be generated.

**Is the commands folder contained within an existing TypeScript src folder?**

- Enter `No (default)` to treat the commands folder as an independent TypeScript folder.
- Enter `Yes` to skip generating a `tsconfig` file and compilation for the commands folder. If the commands folder is already in a TypesScript src folder, you can rely on your normal project build step with extra configuration. see TODO for more information.

**Specify the folder where the custom commands will be built**
TODO