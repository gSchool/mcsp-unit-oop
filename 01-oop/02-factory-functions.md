# Factory Functions

In the previous section, we introduced the object-oriented programming paradigm and showed some examples comparing it to procedural programming. Let's take another look at that example now:

_Object-Oriented Introductory Example_

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

This example was great at demonstrating the concept of object-orientation, but what would happen if we wanted to deal with more than one player object? What might that code look like?

```js
const player1 = {
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

const player2 = {
  name: "Luigi",
  powerUps: [],
  hp: 1,
  getStarPowerUp() {
    this.powerUps.push("star");
  },
  takeDamage() {
    if (!this.powerUps.includes("star")) {
      this.hp -= 1;
    }
  },
};
```

This works, but you can see there is a bunch of duplication between the `player1` and `player2` objects. It'd be great to have a way to construct multiple instances of a particular type of object so we didn't have to rely on copy-and-paste. Thankfully, there is a mechanism built into pretty much every programming language to do just that: functions! Let's rewrite the above code using functions to eliminate the duplication.

```js
const Player = (name, hp) => {
  return {
    name,
    powerUps: [],
    hp,
    getStarPowerUp() {
      this.powerUps.push("star");
    },
    takeDamage() {
      if (!this.powerUps.includes("star")) {
        this.hp -= 1;
      }
    },
  };
};

const player1 = Player("Mario", 1);
const player2 = Player("Luigi", 1);
const player3 = Player("Peach", 1);
const player4 = Player("Toad", 1);
```

Much better! What we've done here is created a factory function. A factory function is simply a function which returns an object. We give them a special name because they approximate a constructor function, which is just a special name given to function which creates many instances of a particular type of object. The methods stayed exactly the same, but the `name` and `hp` properties needed to be configurable, so we handled that with regular function parameters.

## Adding Information Hiding

We can improve on this further, however. Let's consider some code which would cause our objects to fail in unexpected ways and see if we can devise a way to prevent that type of abuse of our poor objects.

```js
const player1 = Player("Mario", 2);

player1.powerUps = null;
player1.getStarPowerUp(); // TypeError: Cannot read properties of null (reading 'push')
```

Because the `powerUps` property is exposed to the outside world, anyone can set it to whatever they want. In this case, we set it to `null` which then caused the `getStarPowerUp` to throw an error! You could say "the user of my object simply didn't use it correctly," but the error still originated in _your_ object, so maybe it's worth looking into a way to hide the internal detail of our objects from the outside.

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

const player = Player("Mario", 2);
player.powerUps = null; // Adds a powerUps property to our object, but doesn't break our methods!
console.log(powerUps); // null
player.getStarPowerUp(); // Doesn't throw
player.takeDamage();
console.log(player.hp); // 2
```

There we go!

What we've achieved here is a level of information hiding. Information hiding is exactly what it sounds like: the process of hiding information (or data) internal to the object from being read or modified from outside that object. In this example, we're hiding the `powerUps` property, because it's part of the internal implementation of our `Player` object. Users of `Player` objects don't need to know wether we store power-ups in an array, an object, or any other structure. In fact, they don't need to know about the `powerUps` property at all! They just need to be able to call the `getStarPowerUp` and `takeDamage` methods as the game progresses.

But what about the `name` and `hp` properties? Should we allow those to be mutated from the outside? Probably not, but to properly prevent mutation while still allowing access requires an understanding of getters and setters, which is the topic of the next section. So hold tight.

## Conclusion

When you need a fleet of similar objects, create a factory function which takes of creating instances for you. To hide implementation details, make use of clojure variables which are inaccessible to the outside.
