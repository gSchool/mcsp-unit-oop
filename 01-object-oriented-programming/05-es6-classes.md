# ES6 Classes

### !callout

<details>
  <summary>Learning Objectives</summary>

  By the end of the lesson, you should be able to:
  - Use ES6 class syntax to create classes.
  - Explain the purpose of the constructor function.
  - Create instances of classes with the `new` keyword.
  - Understand the relationship between a class and an instance.
</details>

### !end-callout

In the previous sections, we learned how to create fleets of objects using factory functions. But there is another way. With the release of ES6, JavaScript now has the `class` construct which formalizes certain OOP patterns. A class is a term used in the context of OOP to refer to a blueprint for creating objects. It's a little more formalized version of a factory function with some special features built-in.

To declare a new class, you use the `class` keyword followed by the name of the class (conventionally capitalized). Everything inside the curly braces is known as the class body. It's important to note that these curly braces do not denote a code block as is the case with `if`, `function`, `while`, etc. nor do they follow the same rules as the curly braces in an object definition. Instead, they simply encloses all parts of the class body.

## Class Parts

A class definition consists of: an (optional) `constructor`, method declarations, and instance/static field declarations.

### Constructor

Let's begin with the constructor. A constructor is a special function which is called when a new instance of a class is created via the `new` keyword. This is typically where you initialize all internal fields and do any one-time setup which may be necessary.

```js
class Car {
  constructor(color, model) {
    this.color = color;
    this.model = model;
    this.pos = 0;
  }
}

const car = new Car("blue", "charger");
console.log(car.color); // blue
console.log(car.model); // charger
console.log(car.pos); // 0
```

### Methods

Next comes the method declarations. They are the behavior of your object. Compared to the factory function example, nothing has changed, except for the fact that you don't separate methods with commas the way you do inside an object definition.

```js
class Car {
  // ...
  drive() {
    this.pos++;
  }

  printInfo() {
    console.log(`This car is a ${this.color} ${this.model}`);
  }
}
```

### Instance Fields

Next up, there are instance fields. Fields are the state of your object. They are accessed/set using the `this` keyword and are created for every instance of a class. In our example, we have three instance fields: `name`, `hp`, and `powerUps`.

Although not part of the original ES6 specification, later versions added a shorthand syntax for defining and initializing fields, which would allow us to write our `Car` constructor like so:

```js
class Car {
  pos = 0;

  constructor(color, model) {
    this.color = color;
    this.model = model;
  }
}
```

Additionally, we can use this same syntax to declare private fields by simply prepending a `#` onto the field name. Any property beginning with a `#` will only be accessible within the body of the class and will be inaccessible from the outside. Private fields are the way to achieve information hiding in the context of ES6 classes.

<details>
<summary>Private Instance Variables Gotcha</summary>

Note that in order to use a private instance field, you must declare it with the shorthand syntax ahead of time, even if you don't give it a value immediately. If you get a message like: `SyntaxError: Private field '#color' must be declared in an enclosing class` it means you have tried to use a priavate instance field without declaring it first, as in the example below:

```js
class Person {
  constructor(name) {
    this.#name = name;
  }
}
```

To fix this, we simply need to declare the `#name` field like so:

```js
class Person {
  #name;

  constructor(name) {
    this.#name = name;
  }
}
```

</details>

```js
class Car {
  #pos = 0;

  constructor(color, model) {
    this.color = color;
    this.model = model;
  }
}

const car = new Car();
console.log(car.#pos); // SyntaxError: Private field '#pos' must be declared in an enclosing class
```

<details>
<summary>Using New JavaScript Features Safely</summary>

Make sure your target environment (e.g. node version and browser type/versions) supports newer JavaScript features before using them in production. In general, anything included in ES6 is safe to use across modern browsers and in node, but before using newer features (like private instance fields) you should refer to a chart like [caniuse](https://caniuse.com/?search=class%20fields) before using them in production.

<details>

### Static Fields

Although not as common, sometimes you may want to store some data on a class itself, rather than on every instance. They are often used for defining constants and are declared using the `static` keyword. An example of a static field is `Math.PI`. It doesn't make sense to store data this as an instance field, since it never changes. So, we could define it as a static field like so:

```js
class Math {
  static PI = 3.1459; //...
}
```

Note: You can declare private static fields by appending a `#` to the field name, just like you do with private instance fields, but this is seldom useful.

## Factory-Function to ES6

Now that we've covered the basics of ES6 classes, let's return to our factory-function example and convert it to an ES6 class.

_Factory Function_

```js
const Player = (name, hp) => {
  const powerUps = [];

  return {
    get name() {
      return name;
    },
    getStarPowerUp() {
      powerUps.push("star");
    },
    takeDamage() {
      if (!powerUps.includes("star")) {
        hp -= 1;
      }
    },
  };
};
```

_ES6 Class_

```js
class Player {
  #powerUps = [];
  #name;
  #hp;

  constructor(name, hp) {
    this.#name = name;
    this.#hp = hp;
  }

  get name() {
    return this.#name;
  }

  getStarPowerUp() {
    this.#powerUps.push("star");
  }

  takeDamage() {
    if (!this.#powerUps.includes("star")) {
      this.#hp -= 1;
    }
  }
}
```

Nice! As you can see, ES6 classes aren't too terribly difficult to learn if you're already familiar with OOP concepts. It's just a matter of learning some new syntax and making some translation. However, there's one feature of ES6 classes that we omitted in this discussion: inheritence. Inheritence is a big concept, so we'll leave that for the next section.
