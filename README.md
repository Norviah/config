## @norviah/config

Simplifies working with JSON files in tandem with TypeScript. `config` is a
package that allows you to import JSON files against a TypeScript interface,
validating the structure of the JSON file.

### Installation

```bash
npm install @norviah/config
```

### Usage

To use `config`, you must first create an inteface that defines the desired
structure for the JSON file, if desired, this interface can be infinitely deep.
From this interface, you must then define a 
<a href="./src/types/Structure"><code>Structure</code></a> instance for the
interface. `Structure` defines an interaface that is essentially a mapping of
each key within the desired interface, each key must be set to an object that
defines important properties for that key.

`config` exports the <a href="./src/structs/Config"><code>Config</code></a>
class, which contains various useful methods for parsing JSON files. `Import`is
the main entry point for the package, this is the method that you will use to
import JSON files:

```ts
Config.Import<T>(structure: Structure<T>, options: Options): T;
```

Defining the `Structure` for the interface is the essential part of the package,
here is where you can map a JSON value into any desired type you wish. As 
previously said, `Structure` represents important information about each key,
as each key will represent a 
<a href="./src/types/Structure"><code>KeyOptions</code></a> instance. The most
important property is `type`, which defines the type of the key, which takes one
of the following values:

  - a string, or
  - a function

If a function is specified, the function will act as the constructor for the 
key, the return value of the function will be treated as the final value for the
key. If the provided value is invalid, the function should return `null` to
indicate this.

If you specify functions, it can be tedious to provide a function for various
primitive types, therefore, you can provide a string instead. If the desired
type of the key is a primitive type, `config` will parse and validate the value
accordingly, and return the value as the final value for the key. The following
are the supported primitive types:

  - `string`
  - `number`
  - `boolean`
  - `null`

### Example

As an example, let's say we want to load a JSON file for our Discord bot. The
config file will hold two values: `token` and `prefix`, both of which are
strings. 

`config.json`

```json
{
  "token": "[token]",
  "prefix": "!"
}
```

`main.ts`

```ts
import { load } from '@norviah/config';

interface Config {
  token: string;
  prefix: string;
}

// Note that you can provide the `type` property as the direct value for the 
// key, as a shortcut for `{ type: "string" }`.
const config: Config = load<Config>(
  {
    token: "string", 
    prefix: "string"
  },
  { path: "[path]" },
);

// Once imported, you can use the config as you would any other object.
console.log(config.token);
```

Of course, this is a rather simple example, but it demonstrates the basic usage
of `config`. For more examples and information, please refer to the documentation
[here](./docs/classes/structs_Config.Config.md).