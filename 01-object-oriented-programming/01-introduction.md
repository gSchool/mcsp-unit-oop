# Introduction to Object-Oriented Programming

### !callout-

### Learning Objectives

By the end of the lesson, you should be able to:
- Explain the problem that OOP solves and how it can be used to model the real world.
- Identify and distinguish between state and behavior.
- Explain what a programming paradigm is and distinguish between code written in a procedural and object-oriented style.

### !end-callout

In this section, we'll introduce the topic of object-oriented programming (aka OOP). It's a big topic! But the core concepts are simple, as we'll discover below. We'll start by going through the core concepts of object-oriented programming, discuss its benefits and drawbacks, and briefly discuss its history.

## Core Concepts

The central idea of object-oriented programming is to package state and behaviors together into a singular entity called an object. The state comes in the form of fields or properties and the behaviors are typically called methods. The process of bundling state and behvaiors is known as encapsulation<sup id="1">[1](#f1)</sup> and is one of the pillars of OOP. One way to conceptualize this style of programming is to think of objects like cells in a biological system. Rather than each cell being able directly modify the internals of other cells, each cell encapsulates its internals inside a nucleus and other cells communicate with it by sending chemical messages. In this way, each cell can remain relatively simple and self-contained, but through collaboration with other cells, they compose a complex, self-correcting system which is greater than the sum of its parts. In fact, this is the guiding analogy used by the person who is known for developing OOP, Alan Kay, who had a background in biology before entering the field of computer science.

## Programming Paradigms

It's important to note that object-oriented programming is not specific to JavaScript or any other language. Rather, it is a programming paradigm, or high-level way of designing and structuring programs. Other types of programming paradigms include: functional, logic, event-driven, and procedural, among many others. Most paradigms are not mutually exclusive and in fact JavaScript has support for progrmaming in a functional, event-driven, procedural, and object-oriented paradigm!

## Procedural vs OOP

Up until this point, we've mainly been programming in the procedural paradigm. In this paradigm, state and behaviors are separate, and our program works by passing global state through functions which modify that state. Let's take a look at a simple procedural program and compare it to the same program written in an object-oriented style.

```js
const player = {
  name: "Mario",
  powerUps: [],
  hp: 2,
};

const getStarPowerUp = (entity) => {
  entity.powerUps.push("star");
};

const takeDamage = (entity) => {
  if (!entity.powerUps.includes("star")) {
    entity.hp -= 1;
  }
};

getStarPowerUp(player);
takeDamage(player);
console.log(player.hp); // 2
```

In this example, our state is contained in the top-level `player` variable and includes a `name`, a `powerUps` array, and an `hp` counter. Our program operates by passing this variable into the `getStarPowerUp` and `takeDamage` functions or "procedures." This is procedural programming 101. Now let's take a look at the same program written in an object-oriented style:

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

All we did between these two code snippets is moved the behaviors (functions) into the object as methods. At first glance, this may seem like a superficial change, but let's think about the consequences of this change, not only in the code itself, but also in how we model problems and design solutions.

The first thing you may notice is that, in the oop example, the methods take no parameters. The reason for this is that since they are contained in an object, we can access and modify the encapsulated state (i.e. properties) through the `this` keyword. We'll go more in depth as to how `this` works, but for now, think of it as an implicit parameter which is passed to object methods which refers to the object in which those methods are defined. The way `this` gets set is by looking at whatever comes before the dot when invoking the method. In this case, both `getStarPowerUp` and `takeDamage` are invoked on the `player` object, so that is what `this` will refer to inside those methods.

So, that covers the ramifications to our code, but what difference does it make when designing software? Well, in the procedural example, our program is a collection of global data and various functions for operating on that data. It's up to the programmer to connect the two. In the oop example, we have an entity which contains data and methods for _updating itself_. In oop, you are thinking about entities interacting with one another by passing messages to (i.e. calling methods on) one another rather than various functions transforming global state.

In reality, most programs written in an OOP style still make use of procedural programming in some parts. It doesn't always make sense to make everything an object. Sometimes all you need is a general-purpose function which doesn't really fit into any particular type of entity or object.

### !challenge

* type: checkbox
* id: 5cef4cd7-464e-4e0c-adb5-3371170d9b51
* title: State and Behaviors 1

### !question

Given the following piece of code, identify the _state_ of the `person` object:

```js
const AGE = 45;

const person = {
  firstName: "Stefano",
  lastName: "Ghisolfi",
  fullName() {
    return [this.firstName, this.lastName].join(" ");
  },
  greet() {
    console.log(`Hello! My name is ${this.fullName()}, and I am ${AGE} years old.`);
  }
};
```

### !end-question

### !options

* `firstName`
* `lastName`
* `fullName`
* `greet`
* `AGE`

### !end-options

### !answer

* `firstName`
* `lastName`

### !end-answer

### !explanation

The state of an object consists of it's properties (in this case `firstName` and `lastName`). Although the `AGE` constant is _used_ in the `person` object, it is not a part of that object's state, since it is not encapsulated in the object as a property.

### !end-explanation

### !end-challenge

### !challenge

* type: checkbox
* id: eaf9158f-77cc-4de8-8698-04c391337513
* title: State and Behaviors 2

### !question

Given the following piece of code, identify the _behavior_ of the `person` object:

```js
const AGE = 45;

const person = {
  firstName: "Stefano",
  lastName: "Ghisolfi",
  fullName() {
    return [this.firstName, this.lastName].join(" ");
  },
  greet() {
    console.log(`Hello! My name is ${this.fullName()}, and I am ${AGE} years old.`);
  }
};
```

### !end-question

### !options

* `firstName`
* `lastName`
* `fullName`
* `greet`
* `AGE`

### !end-options

### !answer

* `fullName`
* `greet`

### !end-answer

### !explanation

The behavior of an object consists of it's methods (in this case `fullName` and `greet`).

### !end-explanation

### !end-challenge

### !challenge

* type: multiple-choice
* id: e8bc28ae-f09d-4261-b9ce-61d41797aab1
* title: OOP Basics

### !question

The following code snippet is written in an object-orientated style:

```js
const person = {
  name: "Marcus",
  age: 2,
};

const grow = (person) => {
  person.age++;
};

grow(person);
console.log(person.age); // 3
```

### !end-question

### !options

* True
* False

### !end-options

### !answer

False

### !end-answer

### !explanation

This is an example of proceduaral programming, because the data (the `person` object) and the function (or procedure) for operating on that data (the `grow` function) are separate. In an object-oriented style, these would be encapsulated into an object like so:

```js
const person = {
  name: "Marcus",
  age: 2,
  grow(person) {
    this.age++;
  },
};

person.grow();
console.log(person.age); // 3
```

### !end-explanation

### !end-challenge

## Brief History

To better understand the motivation behind oop and the types of problems OOP was designed to solve, it's helpful to take a brief look at its history. During the early 60's, programs were becoming more complex and interactive. They were being used for more than scientific and mathematical calculations. They needed to support the use of graphical user interfaces (GUIs). One of the first well-known programs to succeed in this area was called Sketchpad, written by Ivan Sutherland in 1963. Besides being a pioneer in human-computer interaction (HCI) and the ancestor of modern computer-aided design (CAD), Sketchpad was also one of the first programs ever written in an object-oriented style. This program allowed you to draw lines and curves and connect them in various ways. One of its most powerful features was the ability to clone these shapes and change their size and orientation. The drawings you cloned were called masters, and the cloned drawings were called occurances. This corresponds very well to the idea of classes and instances in modern object-oriented programming, concepts we'll explore in a later section. Take a look at this short video demonstration of this concept [here](https://youtu.be/hB3jQKGrJo0?t=422).

## Conclusion

1. Object-Oriented Programming (OOP) is a programming paradigm where state and behavior are bundled together in an object.
2. A programming paradigm is a language-agnostic style of programming.

<sup id="f1">[1](#1) Depending on who you ask, encapsulation also includes the idea of separating the internals of an object from its external interface, but most people refer to that property as information hiding.</sup>
