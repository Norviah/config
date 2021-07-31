**[@norviah/config](README.md)**

> [Globals](globals.md)

The purpose of `config` is to allow using JSON files for storing configuration values in tandem with TypeScript. As TypeScript can't determine types at runtime, this package aims to solve this problem by importing JSON objects and ensuring types at runtime.

### Installation

```
npm i @norviah/config
```

### Usage

In order to use `config`, you must first initialize an interface declaring the keys and values you desire within the config file, then, you must initialize an object instance of <code><a href="./src/types/typings.ts">Typings</a></code>. This object is how `config` is able to determine types at runtime, for this new object, assign the type you desire for that specific key, additionally, `config` supports typings for deep-nested properties as well. For every key, assign a value within the union type <code><a href="./src/types/types.ts">Types</a></code>.

Thanks to TypeScript, the typings object is forced to have the same structure as the desired interface, with the values as one of the string types of `Types`.

Available types are:
- `string`
- `number`
- `boolean`
- `string[]`
- `number[]`
- `boolean[]`
- `undefined`: This type determines if the key is optional and doesn't have to be set within the config file.

Available options are:
- path `string`: The absolute path for the config file, this **must** end in `.json`. Defaults to `config/config.json` within the project's root directory.
- default `T`: An instance of the interface used as default values, if a user doesn't have a config file set, this property is saved in the config's path.

The main function of `config` is <code><a href="./src/util/load.ts">load</a></code>, which is the main function that imports the config file. The template for `load` is:

```TypeScript
load<T>(typings: Typings<T>, options?: { /** options */ });
// => returns an instance of T, based off of the config file saved to disk
```

### Example

As an example, let's say you would like a user to save a config file describing themself, here's how `config` can be used"

`index.ts`

```TypeScript
import { load, Typings } from '@norviah/config';

// First, initialize an interface.
interface Person {
  /**
   * The name of the person.
   */
  name: string;

  /**
   * Determines if the person is atleast 18 years old.
   */
  ofAge: boolean;

  /**
   * The person's age.
   */
  age: number;

  /**
   * Represents the person's favorite numbers.
   */
  favoriteNumbers: number[];

  /**
   * Represents information regarding the person's job.
   */
  job: {
    name: string | undefined;
  }
}

// Next, we'll have to create an object representing the desired types for each key. As
// TypeScript can't determine types at runtime, config uses an object to determine this,
// and thanks to TypeScript, this object is forced to have the same structure as the given interface.
const typings: Typings<Person> = {
  // Simply set each key to the desired type, all desired types are listed above.
  name: 'string',
  ofAge: 'boolean',
  age: 'number',
  favoriteNumbers: 'number[]',

  // If you would like a key to have multiple types, use an array.
  job: {
    name: ['string', 'undefined']
  }
};
```

`config.json`

```JSON
{
  "name": "norviah",
  "ofAge": true,
  "age": 1,
  "favoriteNumbers": [1, 2, 3, 4, 5],
  "job": {
    "name": "GitHub"
  }
}
```

Once an inteface and an object referencing the desired keys is initialized, we can use `load` to import the config file saved to disk. If a config file doesn't exist, `config` saves the given typings object to the config's path, or, you can provide a default object instead.

```TypeScript
const config: Person = load<Person>(typings);

// Now that the config has been imported, you can use it as you normally would.
config.name; // => "norviah"
config.job.name; // => "GitHub"

// As config works in tandem with TypeScript, types for properties works as normal as well.
config.invalidKey; // => Error: Property 'invalidKey' does not exist on type 'Person'.
```

If an incorrect type is set, let's say a `number` for the key `name`, for example:

```JSON
{
  "name": 1,
  "ofAge": true,
  "age": 1,
  "favoriteNumbers": [1, 2, 3, 4, 5],
  "job": {
    "name": "GitHub"
  }
}
```

An error is thrown informing the user of the incorrect type for the key `name`:

```
[[CONFIG ERROR] InvalidType: The key 'name' within the config file should be of type `string`, please fix this value and run this program again.]
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
  const config: Person = load<Person>(typings);
} catch (e) {
  if (e instanceof AbsentError) {
    /** do something */
  }
}
```
