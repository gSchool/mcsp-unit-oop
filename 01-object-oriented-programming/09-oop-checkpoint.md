---
Type: Checkpoint
UID: e6c2cab1-6529-4161-b489-ab3024d81a10
Autoscore: false
---

# OOP Assessment

### !callout-



### !end-callout



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
* e. abstraction

## !end-options

## !answer

* b. encapsulation
* d. polymorphism
* e. abstraction

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

* a. All the instance methods declared in the parent class must declare a specific implementation in the child class
* b. All methods in the parent class are available to the child class by default
* c. Any of the methods in the parent class can be overridden in the child class
* d. All child classes must declare a constructor function
* e. The `super` keyword refers to the parent class’s method

## !end-options

## !answer

* b. All methods in the parent class are available to the child class by default
* c. Any of the methods in the parent class can be overridden in the child class
* e. The `super` keyword refers to the parent class’s method

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

* a. It uses prototypes to handle inheritance when creating objects
* b. It can be mixed with the prototype syntax
* c. It must include a constructor function
* d. It uses the `this` keyword to refer to an instance of the class
* e. all of the above

## !end-options

## !answer

* a. It uses prototypes to handle inheritance when creating objects
* b. It can be mixed with the prototype syntax
* d. It uses the `this` keyword to refer to an instance of the class

## !end-answer

# !end-challenge


# !challenge

* type: multiple-choice
* id: 8f236686-4b6a-4871-b32b-7f48a3b3b3b4
* title: Inherited method signatures
* points: 2

## !question

If a child class override a method from a parent class, the function parameters should have the same number of parameters, with the same data types

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

d. All of the above

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

Can variables be made private to a class in JavaScript, and why would we want to make a variable in a class private? 

## !end-question

### !placeholder
Write your answer here
### !end-placeholder

# !end-challenge


# !challenge

* type: paragraph
* id: a236ff39-a637-465e-85e0-d3e79af09c13
* language: javascript
* title: Implementing Polymorphism
* points: 10


## !question

Examine the Monster, FireMonster and WaterMonster classes provided

```js
class Monster {

    static color = "red";

    constructor(name, ability, hp=10){
        this.name = name;
        this.hp = hp;
        this.attackTries = 3;
        this.attackPower = 1;
        this.ability = ability;
    }

    attack(enemy){
        if (!this.isAlive()){
            console.log(`${this.name} took too much damage to attack`);
            return false;
        }

        if (this.attackTries > 0){
            this.attackTries--;
            console.log(`${this.name} attacks ${enemy.name} with the power ${this.ability} at level ${this.attackPower}`);
            enemy.hp -= this.attackPower;
            if (enemy.hp <= 0){
                console.log(`${enemy.name} has died.`)
            }
            console.log(`${this.name} has ${this.attackTries} attacks left`);
            return true;
        } else {
            console.log(`${this.name} is out of attacks`);
            return false;
        }
    }

    chargePower(){
        console.log(`${this.name} charges up to attack`);
    }

    heal(){
        this.hp++;
    }

    isAlive(){
        return (this.hp > 0) ? true : false;
    }

    static displayColor(){
        console.log(`All monsters are ${Monster.color}!!!`);
    }
}


class FireMonster extends Monster {
    constructor(name, firePower, hp=15){
        super(name, "fire", hp); 
        this.name = "Fiery-" + name;
        this.attackPower = firePower;
        this.temperature = 32;
    }

    attack(enemy){
       console.log(`And now you will burn from my fire at ${this.temperature} degrees!`);
       if (this.temperature < 100){
            super.attack(enemy); 
       } else if (this.temperature < 200){
            this.attackPower += 3;
            super.attack(enemy)
            this.attackPower -=3;
       } else {
            this.attackPower += 5;
            super.attack(enemy);
            this.attackPower -= 5;
       } 
    }

    chargePower(){
        super.heal();
        this.temperature *= 2;
        console.log(`${this.name} took a magma bath and increased temperature to ${this.temperature} degrees!`);
    }
}


class WaterMonster extends Monster {
    constructor(name, waterPower, hp=20){
        super(name, "water", hp); 
        this.name = "Watery-" + name;
        this.attackPower = waterPower;
        this.waterBladderSize = 0;
    }

    attack(enemy){

        if (this.waterBladderSize < 1){
            super.attack(enemy);
        } else {
            console.log(`${this.name} will use their bladder to attack multiple times`);
            for (let i = 0; i < this.waterBladderSize; i++){
                super.attack(enemy);
            }
            this.waterBladderSize = 0;
        }
        console.log("And now you will be soaking wet!");
    }

    chargePower(){
        super.chargePower();
        console.log(`Trying to pull in water...`);
        this.waterBladderSize += Math.floor(Math.random()*5);
        if (this.waterBladderSize > 5 ){
            console.log(`${this.name} took in too much water`);
            this.waterBladderSize = 0;
        }
        console.log(`${this.name} now has their bladder filled with ${this.waterBladderSize} L water.`);
    }
}
```
Use the above classes to write a function `fight` that does the following:
* Create 3 different FireMonster and 3 WaterMonster objects, and put them in an `enemies` array
* Create a FireMonster and WaterMonster object
* Use polymorphism to have the FireMonster and WaterMonster attack all the Monsters in the `enemies` array by invoking the `.chargePower` and `.attack` methods 

## !end-question

#### !placeholder

```js
function fight() {
// Use the Monster classes to simulate a 2 x 6 battle by using polymorphism

}
```

#### !end-placeholder

# !end-challenge