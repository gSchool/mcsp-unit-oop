# Inheritence and the Prototype Chain

### !callout-

### Learning Objectives

By the end of the lesson, you should be able to:

- Explain the purpose of inheritance and how it is used.
- Explain the purpose of the `super` keyword.
- Call a parent method inside of a child class.
- Explain the relationship between a subclass and a superclass.
- Understand the purpose of the prototype chain.
- Traverse a prototype chain programmatically.

### !end-callout

In the last section, we introduced ES6 classes and their various components (the constructor, methods, and fields). However, we omitted one important feature: inheritence and the `extends` keyword. Before diving into the code, let's briefly explore the topic of inheritence in the context of OOP generally.

Along with encapsulation, inheritence is one of the major pillars of OOP. It refers to the ability of some classes to adopt state and behaviors from other classes, in order to facilitate code re-use and to model hierachical relationships. For example, if you were building a game where you could drive multiple types of vehicles (e.g. cars, boats, and bikes) you might start by creating a class for each type of vehicle.

```js
class Car {
  position = 0;

  constructor(speed) {
    this.speed = speed;
  }

  move() {
    this.position += this.speed;
  }

  honk() {
    console.log("beep beep");
  }
}

class Boat {
  position = 0;

  constructor(speed) {
    this.speed = speed;
  }

  move() {
    this.position += this.speed;
  }

  honk() {
    console.log("*foghorn sounds*");
  }
}

class Bike {
  position = 0;

  constructor(speed) {
    this.speed = speed;
  }

  move() {
    this.position += this.speed;
  }

  honk() {
    console.log("ding ding");
  }
}
```

However, you'll quickly notice that while some parts of these classes are distinct, there is some functionality which is common among them, mainly the code involving the `position` and `speed` fields. Let's use inheritence to share that code.

```js
class Vehicle {
  position = 0;

  constructor(speed) {
    this.speed = speed;
  }

  move() {
    this.position += this.speed;
  }
}

class Car extends Vehicle {
  honk() {
    console.log("beep beep");
  }
}

class Boat extends Vehicle {
  honk() {
    console.log("*foghorn sounds*");
  }
}

class Bike extends Vehicle {
  honk() {
    console.log("ding ding");
  }
}
```

As you can see, we use the `extends` keyword to inherit data and methods from our parent, which means that instances of `Car`, `Boat`, and `Bike` will have a `position` and `speed` field as well as a `move` method. In this scenerio, we would call `Car`, `Boat`, and `Bike` subclasses of the `Vehicle` superclass. You may have also noticed that we omitted the `constructor` from all three classes. By default, if a subclass does not define a constructor function, it will delegate to its parent's constructor function. If we did need to do some initialization logic specific to a certain subclass, we could define a `constructor`, but we have to be careful to call our parent's constructor before accessing `this`. You can call your parent's constructor by using the `super` keyword.

```js
class Bike extends Vehicle {
  constructor(speed, brand) {
    super(speed);
    this.brand = brand;
  }
  // ...
}
```

You can also use the `super` keyword to call parent methods.

```js
class Car extends Vehicle {
  move() {
    super.move();
    console.log("vroom vroom");
  }
}
```

Now that we have a basic understanding of how inheritence and the `extends` keyword works conceptually, let's briefly explore how this feature works behind the scenes. To understand that, we must first understand an important feature of JavaScript: the prototype chain.

## Prototype Chain

To get a conceptual understanding of the prototype chain, read through the following slides.

<iframe src="https://docs.google.com/presentation/d/1gyey71qGoK2jt0vf3Wivw0s8GneijoRY2XHJnBYdj8Q/embed?slide=id.g37369c667_21408" width="100%" height="800" frameborder="0" allowfullscreen title="prototype-chain"></iframe>

From those slides, we learned that the prototype chain is a special field defined on all objects used to share data and/or methods between them rather than copying them. This is the mechanism which the `extends` keyword uses under the hood to facilitate inheritence between superclasses and subclasses. To demonstrate this, let's write some code to approximate what the `extends` keyword is doing for us. To achieve this we can use `Object.create` which creates a new object which delegates to another using the prototype chain.

```js
const vehicle = {
  position: 0,
  speed: 5,
  move() {
    this.position += 5;
  },
};

const car = Object.create(vehicle);
car.honk = function () {
  console.log("beep beep");
};

console.log(car.position); // 0
console.log(car.speed); // 5
car.honk(); // beep beep
```

As you can see, our `car` object has it's own method, `honk`, but since it delegates to the `vehicle` object, it also allows us to access the properties/methods defined on the `car` object. The implementation of `extends` is slightly more complicated than this, but this gives you an idea of how it works. Now, let's see what happens when we log our car object to the console. We get: `{ honk: [Function (anonymous)] }`. By default, logging an object to the console will only display that object's own properties/methods, not those inherited from the prototype chain. If we want to see inherited properties/methods, we need to inspect the prototype directly. We can access an object's prototype using `__proto__` or, more safely, with `Object.getPrototypeOf`.
