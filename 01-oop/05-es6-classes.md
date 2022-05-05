# ES6 Classes

In the previous sections, we've learned how to create fleets of objects using factory functions. But there is another way. With the release of ES6, JavaScript now has the `class` construct which can be used to create objects. A class is a term used in the context of oop to refer to a blueprint for creating objects. It's a little more formalized version of a factory function with some special features built-in. Let's take a look at our factory-function example and convert it to an ES6 class.

_Factory Function Example_

```js
const Player = (newName, newHp) => {
  const powerUps = [];
  let hp = newHp;
  const name = newName;

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

_ES6 Class Example_

```js
class Player {
  constructor(name, hp) {
    this.name = name;
    this.hp = hp;
    this.powerUps = [];
  }

  get name() {
    return this.name;
  }

  getStarPowerUp() {
    this.powerUps.push("star)
  }

  takeDamage() {
    if(!this.powerUps.includes('star')) {
      this.hp -= 1;
    }
  }
}
```
