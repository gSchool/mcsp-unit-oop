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

console.log(car);
