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

const bike = new Bike(23);
bike.move();
console.log(bike.position);
