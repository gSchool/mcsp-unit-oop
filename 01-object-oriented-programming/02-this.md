# this Keyword

### !callout-

### Learning Objectives

By the end of the lesson, you should be able to:
- Explain the purpose of using the `this` keyword in the context of OOP.
- Understand the how `this` is setup when calling a method of an object.
- Recognize and fix cases where `this` does not refer to the correct object.

### !end-callout

In the previous section, we used the `this` keyword in our methods but never dove into how it works. In this section, we'll explore the `this` keyword in depth. Let's start by taking a look at one of the first examples we showed to demonstrate object-oriented programming.

```js
const player = {
  name: "Mario",
  powerUps: [],
  hp: 2,
  getStarPowerUp() {
    this.powerUps.push("star");
  },
  takeDamage() {
    if (!this.powerUps.includes("star")) {
      this.hp -= 1;
    }
  },
};

player.getStarPowerUp();
player.takeDamage();
console.log(player.hp); // 2
```

Notice that we use the `this` keyword in the `getStarPowerUp` and `takeDamage` methods. At it's most basic level, the `this` keyword is an implicit parameter passed to object methods which refers to the object instance in which a method is contained. The JavaScript interpreter sets the value of `this` by looking at what came before the `.` in the method call. To understand why this is useful, let's compare a procedural example with an object-oriented one.

_Procedural_

```js
const player = {
  powerUps: [],
};

const getStarPowerUp = (player) => {
  player.powerUps.push("star");
};

getStarPowerUp(player);
```

_Object-Oriented_

```js
const player = {
  powerUps: [],
  getStarPowerUp() {
    this.powerUps.push("star");
  },
};

player.getStarPowerUp();
```

In the procedural example, the object instance is passed _explicitly_ to the `getStarPowerUp` function, but in the object-oriented example, it is passed _implicitly_ via `this`. Without this behavior, we would have to do something like the following:

```js
const player = {
  powerUps: [],
  getStarPowerUp(instance) {
    instance.powerUps.push("star");
  },
};

player.getStarPowerUp(player);
```

In addition to looking silly, passing the instance explicitly with `player.getStarPowerUp(player)` also negates one of the fatures of OOP known as polymorphism. So although the implicit passing of `this` may be confusing at first, it helps us to write more readable code. Now that we have a better understanding of the behavior of `this`, let's take a look at some gotchas when using it.

### !challenge

* type: checkbox
* id: ff1e3ceb-fb62-4157-af7d-a10956de7dc6
* title: This

### !question

In JavaScript, `this` is (select all that apply):

### !end-question

### !options

* A keyword
* A mechanism for facilitating object-oriented programming in JavaScript
* A function which caches parameters passed to a method
* An implicit parameter passed to methods which refers to the object in which that method is contained

### !end-options

### !answer

* A keyword
* A mechanism for facilitating object-oriented programming in JavaScript
* An implicit parameter passed to methods which refers to the object in which that method is contained

### !end-answer

### !end-challenge

## Gotchas

### Gotcha 1: Arrow Functions

Let's return to our example but define the method to use arrow functions.

```js
const player = {
  powerUps: [],
  getStarPowerUp: () => {
    this.powerUps.push("star");
  },
};

player.getStarPowerUp(); // TypeError: Cannot read properties of undefined (reading 'push')
```

As you can see, `this` was not set properly. The reason for this is because arrow functions do not define their own execution context (i.e. they do not allow changing the `this` keyword). Instead, they inherit the context from the outer scope. Although this may seem like a limitation, we'll see in the next section that this behavior actually comes in handy.

### Gotcha 2: Nested Functions

Sometimes you may want to define a helper function within a method, like in the following example:

```js
const person = {
  firstName: "Shigeru",
  lastName: "Miyamoto",
  age: 69,
  printBio() {
    function fullName() {
      return `${this.firstName} ${this.lastName}`;
    }

    console.log(`${fullName()}, age: ${this.age}`);
  },
};

person.printBio(); // undefined undefined, age: 69
```

However, the output shows that the `fullName` method does not work. The reason for this is that _every function has its own execution context_ and thus, its own value for `this`. In older code, you may see a workaround like the following:

```js
const person = {
  firstName: "Shigeru",
  lastName: "Miyamoto",
  age: 69,
  printBio() {
    const that = this;
    function fullName() {
      return `${that.firstName} ${that.lastName}`;
    }

    console.log(`${fullName()}, age: ${this.age}`);
  },
};

person.printBio(); // Shigeru Miyamoto, age: 69
```

What we're doing here is saving the value of `this` within the method, and then using that saved value inside the `fullName` helper function. Nowadays, thankfully, we don't need this hacky approach anymore, because arrow functions do not create a new execution context, and will preseve the value of `this` within its lexical scope. So our code would simply become:

```js
const person = {
  firstName: "Shigeru",
  lastName: "Miyamoto",
  age: 69,
  printBio() {
    const fullName = () => `${this.firstName} ${this.lastName}`;

    console.log(`${fullName()}, age: ${this.age}`);
  },
};

person.printBio(); // Shigeru Miyamoto, age: 69
```

### Gotcha 3: Lost Context (`call`, `bind` and `apply`)

In most cases, this implicit parameter passing works fine, but there are times when it doesn't work the way you expect. To demonstrate this, let's assume that rather than calling the `getStarPowerUp` method immediately, you may want to queue it up to happen at a later time using `setTimeout`. Our first approach may look something like this: `setTimeout(player.getStarPowerUp, 1000)`. However, when we run that code, we get: `TypeError: Cannot read properties of undefined (reading 'push')`. Take some time to consider what might be happening and then continue on.

If we put a `console.log(this)` inside the `getStarPowerUp` method, we see that it is set to a `Timeout` object, and not the `player` object like we expected. What's going on!? Well, if you remember, we said that the JavaScript interpreter figures out how to set the `this` keyword by looking at the context in which it was called, namely what object preceeded the `.`. So when you call `player.getStarPowerUp()`, it sets `this` inside that method to the object which preceeded it (i.e. `player`). However, in the `setTimeout` example, we are not calling the method directly, but rather _extracting_ the function from the player object, so by the time it is executed, the interpreter no longer has any context. As far as the interpreter is concerned, it's dealing with a plain old function. We can demonstrate this more simply with the following code:

```js
player.getStarPowerUp(); // Works fine

const myFn = player.getStarPowerUp;
myFn(); // TypeError: Cannot read properties of undefined (reading 'push')
```

To fix this, we have a few options. Intuitively, we could just create a new function to the `setTimeout` method and call the `getStarPowserUp` method inside of that. Here's how that would look:

```js
setTimeout(() => player.getStarPowerUp(), 1000);
```

The reason this works, is because rather than extracting the `getStarPowerUp` function from the player object, we are deferring that execution until after the time has elapsed and then calling the method directly, allowing JavaScript to use the context to set the `this` implicit parameter to the `player` object. This works great! But there are a few other methods for manipulating the `this` keyword which you should be aware of.

## Bind, Call, and Apply

The first is called `bind`. `bind` creates a new function with a given object set as it's context. To use it in our `setTimeout` example, we would do the following:

```js
setTimeout(player.getStarPowerUp.bind(player), 1000);
```

This may look a little silly, but it does work! Anytime you want to pass a method as an argument to another function, `bind` can come in handy. Two other methods for manipulating the `this` keyword are `call` and `apply`. Rather than returning a new function with a given context, they execute a function immediately with a given context. They only differ in how they pass additional arguments. `call` passes this one at a time, and `apply` passes them as an array. Let's start by looking at `apply`:

```js
const array = ["a", "b"];
const elements = [0, 1];
array.push.apply(array, elements);
console.log(array); // ["a", "b", 0, 1]
```

However, with the advent of the spread operator, we would probably write this code like so:

```js
const array = ["a", "b"];
const elements = [0, 1];
array.push(array, ...elements);
console.log(array); // ["a", "b", 0, 1]
```

`call` is used most frequently for setting up inheritence hierarchies:

```js
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = "food";
}

console.log(new Food("cheese", 5)); // { name: "cheese", price: 5, category: "food" }
```

This pattern has fallen out of favor with the advent of es6 classes (which we'll be covering in an upcoming section). So, although you won't see many uses of `call` and `apply` in modern codebases, these methods are still important to know about, particularly when working in legacy codebases.

### !challenge

* type: code-snippet
* id: 7e6d2900-32d0-4fde-824a-a27292901576
* language: javascript
* title: Bind, Call and Apply

### !question

Using the `.call` method, write an implementation of the `.bind` method.

NOTE: Do not use the `.bind` method.

### !end-question

### !placeholder

```js
const bind = (fn, context) => {
  // Write code here.
}
```

### !end-placeholder

### !tests

```js
describe('bind', () => {
  it('returns a new function whose `this` value is bound to the given context', () => {
    const context = {};
    function testFn() {
      expect(this).to.equal(context);
    }
    bind(testFn, context)();
  });

  it('returns a new function which passes arguments through to original function', () => {
    const context = {};
    function testFn(arg1, arg2, arg3) {
      expect(arg1).to.equal(1);
      expect(arg2).to.equal(2);
      expect(arg3).to.equal(3);
    }

    bind(testFn, context)(1, 2, 3);
  });

  it('returns a new function which returns values from original function', () => {
    const context = {};
    function testFn() {
      return 12;
    }

    const result = bind(testFn, context)();
    expect(result).to.equal(12);
  });
})
```

### !end-tests

### !hint

1. Review ES6 [rest/spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) to handle variable arguments.
1. Remember that functions can provide functions as return values.

### !end-hint

### !end-challenge
