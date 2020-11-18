## @norviah/config

The purpose of `config` is to allow using JSON files for storing configuration tokens in tandem with Typescript. As TypeScript can't determine types at runtime, this package aims to solve this problem by importing JSON objects and ensuring types at runtime.

### Installation

```
npm i @norviah/config
```

### Usage

To use `config`, you must first initialize an interface declaring the keys and values you desire within the config file, then, initialize a new object referencing each key within the interface and the desired type. The desired type must be one of values within the union type <code><a href="./src/types/types.ts">Types</a></code>, as this type represents the various types of values that is supported through JSON, minus objects.

Available types are:
- `string`
- `number`
- `boolean`
- `array<string>`
- `array<number>`
- `array<boolean>`
- `undefined`: This type simply determines if a key is optional and doesn't have to be set within the config file.


Available `option`s are:
- path `string`: The absolute path for the config file, this **must** end in `.json`, defaults to `config/config.json` within the project's root directory.
- default `T`: An instance of the interface you would like to base the config off of, if a config file doesn't exist, this object will be saved to the given path.

The main function of `config` is <code><a href="./src/util/load.ts">load</a></code>, which is the function that imports the config file. The template for `load` is:

```TypeScript
load<T>(typings: { [key in keyof Required<T>]: Types | Types[] }, options?: { /** options */ });
// => returns an instance of T, based off of the config file saved to disk
```

### Example

As an example, let's say we're working on a Discord bot, here's how `config` can be used:

`config.json`

```TypeScript
{
  "token": "[token]",
  "id": ["[id]", "[id]"]
}
```

`index.ts`

```TypeScript
import { load, Types } from '@norviah/config';

// First, an interface must be initialized to represent the desired
// keys and values for TypeScript and he config file.
interface Config {
  /**
   * Represents the bot's token value.
   */
  token: string;

  /**
   * Represents the ID(s) of Discord users that own the client.
   */
  id: string | string[];
};

// As TypeScript values can't be determine at runtime, we'll initialize
// a new object to contain the desired type(s) for each key within the interface.
// Each value must be an instance of the 'Types' union type.

// In addition, the type of this object must be explicitly stated as TypeScript
// can't accurately call the correct type of this object implicitly.
const typings: { [key in keyof Required<Config>]: Types | Types[] } = {
  // Simply set the desired type for the key.
  token: "string",

  // If multiple types is desired, use an array to represent them.
  id: ["string", "array<string>"],
};
```

Once an interface is initialized, and an object representing each key within the interface and the desired type, we can use `load` to import the config file saved to disk as an instance of the interface.

If a config file doesn't exist, an example config file is created using the object that represents the types for each key, in this example, `typings` is that object. Instead, an instance of the interface could be created and passed as `options.default` and will be saved as an example if a config file couldn't be found.

In addition, a path can be passed in the `options` parameter as `options.path`, this represents where the config file should be located, and where one will be created if a config file doesn't exist, note that this value **must** end in `.json`. If a value isn't provided, `config/config.json` within the project's root directory will be used as the default path.

```TypeScript
const defaultConfig: Config = { token: "[token]", id: ["id"] };

// Don't forget to provide the interface as a generic argument.
const config: Config = load<Config>(typings, { default: defaultConfig });

// Now that the config is imported, you can use it as you normally would.
config.token; // => "[token]"
config.id; // => ["[id]", "[id]"]

// As 'config' works in tandem with TypeScript, types for the object exists as well.
config.invalidKey; // => Error: Property 'invalidKey' does not exist on type 'Config'.
```

If an incorrect type is given within the config file, let's say a `number` for the key `id`, for example:

```TypeScript
{
  "token": "[token]",
  "id": 1
}
```

An error would be thrown informing the user of the incorrect type for the key `id`:

```
[[CONFIG ERROR] InvalidType: The key 'id' within the config file should be of type 'string or an array of string(s)', please fix this value and run this program again.]
```

Of course, if wanted, you can catch the error and handle it in your own way. There are four types of errors that can be thrown from `config`:
- `AbsentError`: Represents that a config file hasn't been found, note that you don't have to create a config file, as `config` creates one.
- `InvalidError`: Represents that the path exists and points to a file, but, that file isn't a JSON file.
- `InvalidTypeError`: Represents when a user sets an incorrect type for a key within a value.
- `MissingError`: Represents when a user doesn't set a value for a required key within the config.

Each of this errors are exported and can be used to do a specific thing on a specific error:

```TypeScript
/** continuing off of the example above */
import { AbsentError } from '@norviah/config';

try {
  const config: Config = load<Config>(typings);
} catch (e) {
  if (e instanceof AbsentError) {
    /** do something */
  }
}
```
