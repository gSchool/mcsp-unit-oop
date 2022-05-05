const player = {
  powerUps: [],
  getStarPowerUp() {
    console.log(this);
    this.powerUps.push("star");
  },
};

const myFn = player.getStarPowerUp;
myFn();
