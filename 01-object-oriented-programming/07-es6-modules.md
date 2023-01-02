# ES6 Modules

### !callout-

### Learning Objectives

By the end of the lesson, you should be able to:

- Use ES6 modules in Node and the browser.
- Explain what module system is.
- Understand the difference between default and named exports.
- Understand the major differences between CommonJS and ES6 module systems.

### !end-callout

## Introduction

When programming in JavaScript (or any language for that matter), you eventually encounter the need to split your application into many files. To facilitate this, languages implement what is called a _module system_. Although the syntax varies from language to language, the idea is the same: to allow code contained in one file to be used by code in another.

Node.js ships with its own module system (known as CommonJS), which uses the `module.exports` and `require` keywords. Here's an example of that in use:

```js
// file1.js
const add = (a, b) => a + b;

module.exports = add;
```

```js
// file2.js
const add = require("./file1.js");
```

Although this works fine, this system is not part of JavaScript's language specification, and it does not work in the browser. However, with the release of ES6, JavaScript now has a standard module system which works in Node.js and browsers! This system is called ES6 modules or "ESM" and will be the default for most new code, so let's dig in to how it works.

## Named Exports

First off, what is a module in ESM? Well, a module is simply a file containing JS code. By default, everything declared inside a module is local to that module. But if you want to reference something in that module from another, you can use the `export` keyword. Let's pause to take a look at an example:

```js
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
```

<details>
<summary>Alternative Form</summary>

In the previous example, we could have also declared functions and exported them later like so:

```js
// math.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

export { add, subtract };
```

</details>

What we've done here is exposed two functions, `add` and `subtract`, from `math.js` so that it can be referenced in another module (i.e. file). We do so using the `import` keyword:

```js
// main.js
import { add, subtract } from "./math.js";
```

The curly-brace syntax denotes destructing, only instead of extracting particular values from an object, we're extracting particular exports from a file. Although this syntax follows slightly different rules from destructuring, as we'll see shortly, it can be a useful analogy for understanding the semantics of that syntax.

### !challenge

* type: multiple-choice
* id: 43ed52bb-425b-4f66-82c6-a604008a6a14
* title: ES6 Named Imports

#### !question

Given the following code written in a file named "util.js," which of the following is a valid way to import the `flip` function? (Assume you are in the same directory as `util.js`.)

```js
// util.js
export const flip = (pair) => [pair[1], pair[0]];
```

#### !end-question

#### !options

a|
```js
import flip from "./util.js";
```
b|
```js
import { flip } from "./util.js";
```
c|
```js
import flip from "./util";
```

#### !end-options

#### !answer

b|

#### !end-answer

### !end-challenge

## Default Exports

The exports we've been working with so far are what's known as _named exports_. However, there is another type of export known as a _default export_. A default export is useful when a module has something you want to designate as its main export.

```js
// person.js
export default class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  printInfo() {
    console.log(`My name is ${this.name} and I am ${this.age} years old.`);
  }
}
```

<details>
<summary>Alternative Form</summary>

Just like with named exports, we can declare something and export it later, like so:

```js
// person.js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  printInfo() {
    console.log(`My name is ${this.name} and I am ${this.age} years old.`);
  }
}

export default Person;
```

</details>

In person.js, we export a single thing, the `Person` class. To import this class from another file, we again use the `import` keyword, but instead of putting the import inside curly braces, we import it outright, and give it a name (which generally matches the name of the thing exported, but not neccessarliy so).

```js
// main.js

// Works
import Person from "./person.js";

// Also works
import MyPerson from "./person.js";
```

It's important to note that a module can expose named exports and a default export at the same time. The syntax for that would look like the following:

```js
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export default 3.145;
```

And importing:

```js
// main.js
import PI, { add, subtract } from "./math.js";
```

### !challenge

* type: checkbox
* id: 40a2aaa8-91a8-46be-8cd4-576ab3d746ac
* title: ES6 Default Imports

#### !question

Given the following code, in `./dog.js`, which of the following are valid ways to import the `Dog` class?

```js
class Dog {
  constructor(breed) {
    this.breed = breed;
  }

  speak() {
    console.log(`The ${this.breed} says "Woof!"`);
  }
}

export default Dog;
```

#### !end-question

#### !options

a|
```js
import Dog from "./dog.js";
```
b|
```js
import * as Dog from "./dog.js";
```
c|
```js
import Doggy from "./dog.js";
```
d|
```js
import { Dog } from "./dog.js";
```

#### !end-options

#### !answer

a|
c|

#### !end-answer

### !end-challenge

### !challenge

* type: checkbox
* id: c388ddd0-833b-4706-a134-702f2b4e1fa1
* title: ES6 Default Imports

#### !question

Given the following code, how would you export the `add` and `subtract` functions as named exports?

```js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
```

#### !end-question

#### !options

a|
```js
export { add, subtract };
```
b|
```js
export default { add, subtract };
```
c|
```js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
```

#### !end-options

#### !answer

a|
c|

#### !end-answer

### !end-challenge

## Renaming Imports/Exports

Occasionally when writing code, you may encounter a situation where two modules export something with the same name.

```js
import { parse } from "html-parser";
import { parse } from "xml-parser";
// Uh oh, naming conflict!
```

To solve this, you can use the `as` keyword.

```js
import { parse as parseHTML } from "html-parser";
import { parse as parseXML } from "xml-parser";

parseHTML(/* HTML here */);
parseXML(/* XML here */);
```

You can also rename exports with the same syntax, although this is not as common.

## Aggregating Modules (e.g. Namespace Imports)

Occasionally, we might want to import all named exports from a module as a single object (this is also sometimes necessary for backwards compatability with node modules which use the CommonJS module format).

```js
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
```

```js
// main.js
import * as math from "./math.js";

math.add(1, 2);
math.subtract(5, 4);
```

## Differences Between CommonJS and ES6 Modules

As mentioned before, Node developed its own module format (CommonJS) before one was added to the JavaScript specification. Node has great support for ES6 modules now, and the vast majority of new code uses ES6, but there are still some differences between to two to be aware of.

<details>
<summary>1. `require` can be used anywhere in your code, while `import`s must be at the top-level.</summary>

```js
// Fine.
if (process.platform === "win32") {
  require("lib-win32");
} else {
  require("lib-linux");
}

// Error!
if (process.platform === "win32") {
  import "lib-win32";
} else {
  import "lib-linux";
}
```

To accomplish conditional loading with ES6, you must use [dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import):

```js
if (process.platform === "win32") {
  await import("lib-win32");
} else {
  await import("lib-linux");
}
```

</details>

<details>
<summary>2. `require` will accept relative paths with the extension omitted, whereas `import` will fail.</summary>

```js
// Works.
require("./setup");

// Error!
import "./setup";

// Works.
import "./setup.js";
```

</details>

<details>
<summary>3. `require` treats `index.js` files specially. `import` does not.</summary>

With the Node module system, you often end up with a directory structure which looks like the following:

```
- src
  - util
    - math.js
    - dates.js
    - index.js
```

where `index.js` would re-export all exports from the files in the `util` directory. In CommonJS, if you want to import something from the `util` directory, you can do it by just specifying the directory in the module specifier.

```js
// This shorthand is interpreted as require("./util/index.js")
const { add, addDate } = require("./util");
```

However, since ES6 modules always require you to fully specify the file path, including the extension, you have to include `index.js` if you want to use this directory index pattern.

```js
// Error!
import { add, addDate } from "./util";

// Works.
import { add, addDate } from "./util/index.js";
```

</details>

## Using ES6 Modules in Node and the Browser

### In Node

Since version 12, Node has shipped with support for ES6 modules. However, since it still has to support CommonJS (e.g. `module.exports`/`require`), you have to opt-in to ES6 module syntax so Node knows which module system to use to load your files. If you try to use `import` and/or `export` in Node without additional configuration, you will get `SyntaxError: Cannot use import statement outside a module`. To fix this, you have two options:

1. Name ES6 module files with a `.mjs` extension. This is useful when the majority of your project is using CommonJS modules, but you want to use ES6 modules for select files.
1. Set ["type"](https://nodejs.org/api/packages.html#type) field to be "module" in your package.json file. This is the best option when you want your entire project to use ES6 modules.

### !callout-info

You can name files with a `.cjs` extension to denote them as CommonJS modules.

### !end-callout

### In the Browser

To use ES6 modules, all you need to do is add a [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-type) attribute to the `script` tag used to load your JS files. They will now be treated as ES6 modules, so you can `import`/`export` things inside of them. Note that you can only use URLs and relative paths to import things which are hosted on the same host as the originally-loaded ES6 module, and you can't `import` things from node_modules the way you can in Node. Importing npm packages is typically solved by using a module bundler, but that's a topic for another day...

## Conclusion

- ES6 modules (ESM) is the de-facto mechanism for sharing code between files (i.e. modules) in JavaScript.
- CommonJS (`require`/`export`) is the mechanism Node.js used to accomplish the same thing, but will be subsumed by ESM in the future.
- You can export named and default exports from a module..
- To use ESM in the browser, add `type="module"` to your `script` tags.
- To use ESM in node, add `"type": "module"` to your `package.json` file.

## Additional Reading

1. [ES6 Modules in Depth](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/)
1. [Node ES6 Module Docs](https://nodejs.org/api/esm.html#resolution-algorithm)
