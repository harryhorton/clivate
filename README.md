# CLIvate (WARNING - this project is not yet ready for production)
CLIvate - a typescript CLI tool generator

## Installation
```bash
yarn add --dev clivate
```

## Usage

### Custom project commands

- create config ts/json
- specify search pattern
- how to call (yarn clivate (command))

### Package with bin
- import clivate
- register commands
- build and publish

#### Adding package extensions
- requires ts-node, don't prebuild
- parse a config

### Writing commands
```typescript
import { CommandDescription, CommandName, CommandPrompts } from "clivate";

@CommandName("test")
@CommandDescription("a test command")
@CommandPrompts([{
  name:'prompt1',
  type:'confirm'
}])
class TestCommand extends Command {
  handler() {
    console.log("running test");
    run = true;
  }
```

- command name
- description
- prompts
- command args
- handler
- conditional prompts
- calling another command
- Non-root internal commands
- Loading asynchronous prompt data.