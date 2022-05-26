const Player = (name, hp) => {
  const powerUps = [];

  return Object.freeze({
    name,
    getStarPowerUp() {
      powerUps.push("star");
    },
    takeDamage() {
      if (!powerUps.includes("star")) {
        hp -= 1;
      }
    },
  });
};

const player = Player("Mario", 2);
player.name = null; // No effect
delete player.name; // No effect
player.newProp = 4; // No effect
console.log(player.name); // Mario
console.log(player.newProp); // undefined
