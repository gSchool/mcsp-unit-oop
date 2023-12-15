# OOP Assessment

# !challenge

* type: checkbox
* id: 330e2937-cff8-4623-9a91-719ea9bce750
* title: Supported OOP features in JavaScript 
* points: 3

## !question

Which of the following features related to the Object Oriented Programming paradigm does Javascript support?

## !end-question

## !options

* a. inheritance
* b. instance variables
* c. static variables
* d. abstract classes
* e. interfaces
* f. static methods

## !end-options

## !answer

* a. inheritance
* b. instance variables
* c. static variables
* f. static methods

## !end-answer

# !end-challenge
                                                                                            
# !challenge

* type: checkbox
* id: e73ca9d1-5405-461f-9da9-11b9754d441e
* title: Pillars of OOP 
* points: 3

## !question

 Which of the following are considered fundamental pillars of Object Oriented Programming?

## !end-question

## !options

* a. atomicity
* b. encapsulation
* c. interoperability
* d. polymorphism
* e. inheritance

## !end-options

## !answer

* b. encapsulation
* d. polymorphism
* e. inheritance

## !end-answer

# !end-challenge


# !challenge

* type: checkbox
* id: 6cc0bb24-f8de-4e4f-9b7a-c31b52c0bbeb
* title: Child classes in JavaScript
* points: 3

## !question

Which of the following is true about a child class in Javascript?

## !end-question

## !options

* a. All the instance methods declared in the parent class must be overwritten with a specific implementation in the child class
* b. All methods in the parent class are available to the child class by default
* c. Any of the methods in the parent class can be overridden in the child class
* d. All child classes must declare a constructor function
* e. The `super` keyword gives you access to the parent's constructor and instance methods

## !end-options

## !answer

* b. All methods in the parent class are available to the child class by default
* c. Any of the methods in the parent class can be overridden in the child class
* e. The `super` keyword gives you access to the parent's constructor and instance methods

## !end-answer

# !end-challenge


# !challenge

* type: checkbox
* id: 7477a87f-0a40-449a-ad9d-332370500879
* title: JavaScript Class Syntax 
* points: 3

## !question

Which of the following correctly describe JavaScript class syntax?

## !end-question

## !options

* a. It uses the prototype chain to handle inheritance when creating objects
* b. It must include a constructor function
* c. It uses the `this` keyword to refer to an instance of the class
* d. all of the above

## !end-options

## !answer

* a. It uses the prototype chain to handle inheritance when creating objects
* c. It uses the `this` keyword to refer to an instance of the class

## !end-answer

# !end-challenge


# !challenge

* type: multiple-choice
* id: 8f236686-4b6a-4871-b32b-7f48a3b3b3b4
* title: Inherited method signatures
* points: 2

## !question

If a child class overrides a method from a parent class, the function should have the same number of parameters, with the same data types

## !end-question

### !options

* Always 
* Sometimes
* Never

### !end-options
## !answer

Always 

## !end-answer

# !end-challenge


# !challenge

* type: multiple-choice
* id: dac9d472-34f1-40e8-a7d7-1f7803e5c064
* title: OOP Pros
* points: 2

## !question

 What is an advantage of the object oriented paradigm?

## !end-question

## !options

* a. Classes ensure we use the correct data types
* b. Object Oriented code can be compiled more quickly 
* c. State data and function behavior can be encapsulated together
* d. All of the above


## !end-options

## !answer

* c. State data and function behavior can be encapsulated together

## !end-answer

# !end-challenge


# !challenge

* type: checkbox
* id: 95758ab1-da9d-4e0f-a78d-f826fd4d59a8
* title: Reasons for using getter and setter methods in JavaScript
* points: 3

## !question

What are some of the reasons for using getter and setter methods in JavaScript?

## !end-question

## !options

* a. To signal to other developers that a variable should not be altered directly
* b. They are required methods in JavaScript classes
* c. Accessing or changing the value of a “hidden” variable
* d. Ensuring logic is run on setter parameters prior to changing a variable value

## !end-options

## !answer

* a. To signal to other developers that a variable should not be altered directly
* c. Accessing or changing the value of a “hidden” variable
* d. Ensuring logic is run on setter parameters prior to changing a variable value

## !end-answer

# !end-challenge


# !challenge

* type: paragraph
* id: 5a7090cd-3a00-4886-804b-b497ce774088
* title: Use cases for hiding variables
* points: 3

## !question

Can variables be made private to a class in JavaScript, and why would we want to make a variable in a class hidden? 

## !end-question

### !placeholder
Write your answer here
### !end-placeholder

# !end-challenge


# !challenge

* type: code-snippet
* language: javascript18
* id: a236ff39-a637-465e-85e0-d3e79af09c13
* title: Implementing Polymorphism
* points: 5

## !question

Examine the `Monster`, `FireMonster` and `WaterMonster` classes provided:

```js
class Monster {
  constructor(name, attackPower, hp = 10) {
    this.name = name;
    this.hp = hp;
    this.attackPower = attackPower;
  }

  attack(enemy) {
    if (!this.isAlive()) return false;

    enemy.hp -= this.attackPower;
    return true;
  }

  chargePower() {
    // Overriden by children
  }

  heal() {
    this.hp++;
  }

  isAlive() {
    return this.hp > 0 ? true : false;
  }
}

class FireMonster extends Monster {
  constructor(name, firePower, hp = 15) {
    super("Fiery-" + name, firePower, hp);
    this.temperature = 32;
  }

  attack(enemy) {
    if (this.temperature < 100) {
      super.attack(enemy);
    } else if (this.temperature < 200) {
      this.attackPower += 3;
      super.attack(enemy);
      this.attackPower -= 3;
    } else {
      this.attackPower += 5;
      super.attack(enemy);
      this.attackPower -= 5;
    }
  }

  chargePower() {
    super.chargePower();
    super.heal();
    this.temperature *= 2;
  }
}

class WaterMonster extends Monster {
  constructor(name, waterPower, hp = 20) {
    super("Watery-" + name, waterPower, hp);
    this.waterBladderSize = 0;
  }

  attack(enemy) {
    if (this.waterBladderSize < 1) {
      super.attack(enemy);
    } else {
      for (let i = 0; i < this.waterBladderSize; i++) {
        super.attack(enemy);
      }
      this.waterBladderSize = 0;
    }
  }

  chargePower() {
    super.chargePower();
    this.waterBladderSize += Math.floor(Math.random() * 5);
    if (this.waterBladderSize > 5) {
      this.waterBladderSize = 0;
    }
  }
}
```

Write a function `fight` which takes in two parameters:
* `myMonster` - A monster instance.
* `enemies` - An array of monster enemies to be attacked.

This function should call `chargePower` on the given `myMonster` **once** and then have it attack every monster in the `enemies` array.

## !end-question

### !setup

```js
class Monster {
  constructor(name, attackPower, hp = 10) {
    this.name = name;
    this.hp = hp;
    this.attackPower = attackPower;
  }

  attack(enemy) {
    if (!this.isAlive()) return false;

    enemy.hp -= this.attackPower;
    return true;
  }

  chargePower() {
    // Overriden by children
  }

  heal() {
    this.hp++;
  }

  isAlive() {
    return this.hp > 0 ? true : false;
  }
}

class FireMonster extends Monster {
  constructor(name, firePower, hp = 15) {
    super("Fiery-" + name, firePower, hp);
    this.temperature = 32;
  }

  attack(enemy) {
    if (this.temperature < 100) {
      super.attack(enemy);
    } else if (this.temperature < 200) {
      this.attackPower += 3;
      super.attack(enemy);
      this.attackPower -= 3;
    } else {
      this.attackPower += 5;
      super.attack(enemy);
      this.attackPower -= 5;
    }
  }

  chargePower() {
    super.chargePower();
    super.heal();
    this.temperature *= 2;
  }
}

class WaterMonster extends Monster {
  constructor(name, waterPower, hp = 20) {
    super("Watery-" + name, waterPower, hp);
    this.waterBladderSize = 0;
  }

  attack(enemy) {
    if (this.waterBladderSize < 1) {
      super.attack(enemy);
    } else {
      for (let i = 0; i < this.waterBladderSize; i++) {
        super.attack(enemy);
      }
      this.waterBladderSize = 0;
    }
  }

  chargePower() {
    super.chargePower();
    this.waterBladderSize += Math.floor(Math.random() * 5);
    if (this.waterBladderSize > 5) {
      this.waterBladderSize = 0;
    }
  }
}
```

### !end-setup

#### !placeholder

```js
function fight(myMonster, enemies) {
}
```

#### !end-placeholder

### !tests

```js

describe('fight', () => {
  it("is a function", () => {
    expect(fight, "should be a function").to.be.a('function');
  });

  it("calls 'chargePower' on 'myMonster'", () => {
    const monster = new FireMonster("bowser", 20);
    const { hp, temperature } = monster.hp;

    fight(monster, []);

    expect(monster.hp).to.be(startingHp + 1);
    expect(monster.temperature).to.be(temperature * 2);
  });

  it("attacks every monster in the given 'enemies' array", () => {
    const myMonster = new FireMonster("wizzrobe", 8);

    const monster1 = new FireMonster("demon firesage", 4);
    const monster2 = new WaterMonster("cthulhu", 3);

    fight(myMonster, [monster1, monster2]);

    expect(monster1.hp).to.be(7);
    expect(monster2.hp).to.be(12);
  });
});
```

### !end-tests

# !end-challenge
