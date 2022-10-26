# Factory Functions

### !callout-

### Learning Objectives

By the end of the lesson, you should be able to:

- Explain the purpose of a factory function.
- Write a factory function from scratch.

### !end-callout

In a previous section, we introduced the object-oriented programming paradigm and showed some examples comparing it to procedural programming. 

<details>
<summary>Key Terms</summary>

- Factory Function
- Constructor Function
- Instances
- Information Hiding / Internal Implementation
- Mutate

</details>


Let's take another look at that example now:

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

This example demonstrates a single object with state and behavior well enough, but what would happen if we wanted to deal with more than one player object? What might that code look like?

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
```

Much better! What we've done here is created a factory function. A factory function is simply a function which returns an object. We give them a special name because they approximate a **constructor function**, which is just a special name given to function which creates many instances of a particular type of object. The methods stayed exactly the same, but the `name` and `hp` properties needed to be configurable, so we handled that with regular function parameters.

### !challenge

* type: code-snippet
* id: 5ebeec45-1e4d-4354-8f71-9dad3a41453e
* language: javascript
* title: Factory Functions

### !question

Write a factory function named `Printer` which returns an object with the following specifications:

Properties (Should be configurable via parameters):

- `name` - A `String` representing the name of the printer, e.g. 'Canon WiFi.
- `sheetCount` - A `Number` representing the number of sheets in the printer. (Defaults to zero if not provided.)

Methods:

- `addSheets` - Takes number a parameter and adds that number to the `sheetCount` property.
- `printJob` - Takes two parameters (name: `String`, size: `Number`) as parameters, and prints a message to the console for each page in the job following the format `Printing [jobName] - page [currentPage] of [pageCount]` and subtracts that number from the `sheetCount` property. If the number of pages in the job exceeds `sheetCount`, throw an `Error` with a message of `Job failed: please refill paper tray!`.

### !end-question

### !placeholder

```js
const Printer = () => {};
```

### !end-placeholder

### !tests

```js
const sinon = require('sinon');

describe("Printer", () => {
  it("`name` property is configurable via parameters", () => {
    const subject = Printer("Canon Wifi");
    expect(subject.name).to.equal("Canon Wifi");
  });

  it("`sheetCount` property is configurable via parameters", () => {
    const subject = Printer("Canon Wifi", 45);
    expect(subject.sheetCount).to.equal(45);
  });

  it("defaults `sheetCount` property to 0 if none provided", () => {
    const subject = Printer("Canon Wifi");
    expect(subject.sheetCount).to.equal(0);
  });

  it("`.addSheets` method updates `sheetCount`", () => {
    const subject = Printer("Canon Wifi", 20);
    subject.addSheets(15);
    expect(subject.sheetCount).to.equal(35);
  });

  it("`.printJob` method prints a message for each page in the job ", () => {
    const subject = Printer("Canon Wifi", 5);
    const logStub = sinon.stub(console, "log");

    subject.printJob("Essay.docx", 3);
    logStub.restore();

    const logCalls = logStub.getCalls();
    expect(logCalls[0].args[0]).to.equal("Printing Essay.docx - page 1 of 3");
    expect(logCalls[1].args[0]).to.equal("Printing Essay.docx - page 2 of 3");
    expect(logCalls[2].args[0]).to.equal("Printing Essay.docx - page 3 of 3");
  });

  it("`.printJob` method subtracts the job size from `sheetCount`", () => {
    const subject = Printer("Canon Wifi", 50);
    const logStub = sinon.stub(console, "log");

    subject.printJob("Term Paper.docx", 25);
    logStub.restore();
    expect(subject.sheetCount).to.equal(25);
  });

  it("`.printJob` method throws an error if the job size exceeds the `sheetCount`", () => {
    const subject = Printer("Canon Wifi", 4);
    const logStub = sinon.stub(console, "log");

    try {
      expect(() => subject.printJob("Court Proceedings.pdf", 10)).to.throw(
        "Job failed: please refill paper tray!"
      );
      logStub.restore();
    } catch(err) {
      logStub.restore();
      throw err;
    }
  });
});
```

### !end-tests

### !end-challenge

## Adding Information Hiding

We can improve on this pattern further, however. Let's consider some code which would cause our objects to fail in unexpected ways and see if we can devise a way to prevent that type of abuse of our poor objects.

```js
const player1 = Player("Mario", 2);

player1.powerUps = null;
player1.getStarPowerUp(); // TypeError: Cannot read properties of null (reading 'push')
```

Because the `powerUps` property is exposed to the outside world, anyone can set it to whatever they want. In this case, we set it to `null` which then caused the `getStarPowerUp` to throw an error! If this happened in practice, you could say to yourself, "Well, the user of my object simply didn't use it correctly!" but the error still originated in _your_ object, so it's worth looking into a way to hide the internal detail of our objects from the outside.

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
console.log(player.powerUps); // null
player.getStarPowerUp(); // Doesn't throw
player.takeDamage();
console.log(player.hp); // 2
```

There we go!

What we've achieved here is a level of information hiding. Information hiding is exactly what it sounds like: the process of hiding information (i.e. data) internal to the object from being read or modified from outside that object. In this example, we're hiding the `powerUps` property, because it's part of the **internal implementation** of our `Player` object. Users of `Player` objects don't need to know whether we store power-ups in an array, an object, or any other structure. In fact, they don't need to know about the `powerUps` property at all! They just need to be able to call the `getStarPowerUp` and `takeDamage` methods as the game progresses.

Hiding internal details not only prevents strange errors like the one displayed above, but also makes your objects more flexible. For example, after implementing information hiding, if you wanted to change to storing power-ups in a `Set` instead of an array, you can do so without fear, since consumers can't access that property directly, but in the previous example, you may have to be careful as other code may be relying on the fact that power-ups are stored in an array, and changing it to a `Set` would constitute a breaking change.

Now, what about the `name` and `hp` properties? Should we allow those to be **mutated** from the outside? Probably not, but to properly prevent mutation while still allowing access requires an understanding of getters and setters, which is the topic of the next section, so hold tight.

## Conclusion

When you need a fleet of similar objects, create a factory function which takes of creating instances for you. To hide implementation details, make use of [closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) variables which are inaccessible to the outside.
