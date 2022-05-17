# Getters and Setters

As we saw at the end of the last section, there are times we want to hide internal data from being accessed _or_ mutated from outside the object (e.g. the `powerUps` array). But what do we do when we want a property to be accessible but not mutable? This is where getters step in. A getter is special type of function defined on an object which allows read-only access to a property. Additionally, they allow you to be alerted when a property is accessed, in case some other type of work needs to be done in that case. Here's a simple example of a getter at work.

```js
let myName = "Jay";
const obj = {
  get name() {
    return myName;
  },
};

console.log(obj.name); // Jay
obj.name = "Marcus";
console.log(obj.name); // Jay
```

A getter is defined with the `get` keyword and although it looks like a normal method, it is not invoked through the usual `()` syntax. It is actually invoked when you access a property normally with the dot syntax, as can be seen in the above example.

On the flip side, if you want to allow a property to be mutable, you can use a setter. Here's an example of that:

```js
let myName = "Jay";
const obj = {
  get name() {
    return myName;
  },
  set name(name) {
    myName = name;
  },
};

console.log(obj.name); // Jay
obj.name = "Anjali";
console.log(obj.name); // Anjali
```

Now you may be asking yourself how a getter/setter pair is better than just defining a normal property. If you allow access and mutation of a property, why not just expose it on the object? Well, one added benefit of the getter/setter is that we have more control over how properties are set and accessed. What if we wanted to keep track of every time a property is accessed or perform validation before accepting a property mutation? With a normal property, there's no way for us to hook into access/mutation, but with a getter/setter pair, we can just add some additional logic to our getter/setter functions like so:

```js
let myName = "Jay";
let timesAccessed = 0;
const obj = {
  get name() {
    timesAccessed++;
    return myName;
  },
  set name(name) {
    if (typeof name !== "string") {
      throw new Error("Invalid name given");
    }
    myName = name;
  },
};

obj.name;
obj.name;
console.log(timesAccessed); // 2
obj.name = 4; // Error: Invalid name given
```

Now that we have a basic understanding of getters and setters, let's return to the example we ended with in the previous section:

```js
const Player = (name, hp) => {
  const powerUps = [];

  return {
    name,
    hp,
    getStarPowerUp() {
      powerUps.push("star");
    },
    takeDamage() {
      if (!powerUps.includes("star")) {
        this.hp -= 1;
      }
    },
  };
};
```

We've already hidden some information, by moving the `powerUps` property to a closure variable, but what about the `name` and `age` properties? Should we hide those as well?

The answer is, it depends. Part of object-oriented design is separating an interface (those parts externally accessable) from its implementation (those parts internal to the object). The `name` property should certainly be readable from the outside, as we're not doing anything else with it, but probably not writable.

As for the `hp` property, do you want users of your object to be able to read the `hp` property directly, or just alert them when `hp` goes to zero? Although there's no clear answer to that question (it depends on your design) one thing that's certain is we that don't want to give arbitrary write access to this property and only allow it to be updated in pre-defined ways (e.g. `takeDamage` and `getMushroom`).

For our example, let's say that we don't want to expose the `hp` property at all, and only expose the read-only `name` property. To do the latter, we can make use of a getter:

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

const player = Player("Mario", 2);
player.name = "Luigi";
console.log(player.name); // Mario
```

Great! We've hidden all the internal details and only exposed the parts needed by the outside. As a side-benefit, we've also eliminated any use of `this` which can be confusing for beginners, thus making our code slightly more readable. Our interface now consists of three things:

- A `name` property (read-only)
- A `getStarPowerUp` method
- A `takeDamage` method

If more properties/methods are needed later on, or we decide to expose an existing property, we can do that, but it's best to keep your interfaces to the bare minimum as it reduces the amount we expose to the outside, and thus the amount we're responsible for maintaining. In a small codebase, exposing extra information may not be such a big deal, but as your project grows, the objects you create may be used in hundreds of different places, and if those places relied on mutating the `powerUps` property, for example, and you change it later on, you'll break those usages.

> If we were really paranoid, we could `freeze` our object to ensure no one added properties to or removed properties from it.
>
> ```js
> const Player = (name, hp) => {
>   const powerUps = [];
>
>   return Object.freeze({
>     get name() {
>       return name;
>     },
>     getStarPowerUp() {
>       powerUps.push("star");
>     },
>     takeDamage() {
>       if (!powerUps.includes("star")) {
>         hp -= 1;
>       }
>     },
>   });
> };
>
> const player = Player("Mario", 2);
> player.powerUps = null; // No effect
> console.log(player.powerUps); // undefined
> ```
