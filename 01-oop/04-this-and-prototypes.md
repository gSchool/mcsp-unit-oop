# This Keyword and Prototype Chains

In the previous sections, we used the `this` keyword in our methods but never dove into how it works and what it's used for. We'll explore that in more depth, as well as talking about the prototype chain, a concept fairly unique to JavaScript.

## `this` Keyword

Let's start by taking a look at one of the first examples we showed to demonstrate object-oriented programming.

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

Notice that we use the `this` keyword in the `getStarPowerUp` and `takeDamage` methods. At it's most basic level, the `this` keyword is an implicit parameter passed to object methods which refers to the object instance in which a method is contained. The JavaScript interpreter sets the value of `this` by looking at what came before the `.` in the method call. To understand why this is needed, let's compare a procedural example with an object-oriented one.

_Procedural_

```js
const player = {
  powerUps: [],
};

const getStarPowerUp = (player) => {
  player.powerUps.push("star");
};
```

_Object-Oriented_

```js
const player = {
  powerUps: [],
  getStarPowerUp() {
    this.powerUps.push("star");
  },
};
```

In the procedural example, the object instance is passed _explicitly_ to the `getStarPowerUp` function, but in the object-oriented example, it is passed _implicitly_. Without this behavior, we would have to do something like the following.

```js
const player = {
  powerUps: [],
  getStarPowerUp(instance) {
    instance.powerUps.push("star");
  },
};

player.getStarPowerUp(player);
```

Passing the instance explicitly with `player.getStarPowerUp(player)` looks pretty silly and sort negates the benefit of object-oriented programming entirely. So although the implicit passing of `this` may be confusing at first, it helps us to write more readable code. Now that we have a better understanding of the behavior of `this`, let's take a look at some edge-cases and gotchas.

## Lost Context - Call, Bind and Apply

In most cases, this implicit parameter passing works fine, but there are times when it doesn't work the way you expect. To demonstrate this, let's assume that rather than calling the `getStarPowerUp` method immediately, you may want to queue it up to happen at a later time using `setTimeout`. Our first approach may look something like this: `setTimeout(player.getStarPowerUp, 1000)`. However, when we run that code, we get: `TypeError: Cannot read properties of undefined (reading 'push')`. Take some time to consider what might be happening and then continue on.

If we put a `console.log(this)` inside the `getStarPowerUp` method, we see that it is set to a `Timeout` object, and not the `player` object like we expected. What's going on!? Well, if you remember, we said that the JavaScript interpreter figures out how to set the `this` keyword by looking at the context in which it was called, namely what object preceeded the `.`. So when you call `player.getStarPowerUp()`, it sets `this` inside that method to the object which preceeded it (i.e. `player`). However, in the `setTimeout` example, we are not calling the method directly, but rather _extracting_ the function from the player object, so by the time it is executed, the interpreter no longer has any context. As far as it is concerned, it is just a plain old function. We can demonstrate this more simply with the following code:

```js
const myFn = player.getStarPowerUp;
myFn(); // TypeError: Cannot read properties of undefined (reading 'push')
```

Call/Bind/Apply
Prototype chains and Object.create
Arrow Function behavior
