class Monster {
  constructor(name, attackPower, hp = 10) {
    this.name = name;
    this.hp = hp;
    this.attackPower = attackPower;
  }

  attack(enemy) {
    if (!this.isAlive()) {
      console.log(`${this.name} took too much damage to attack`);
      return false;
    }

    console.log(
      `${this.name} attacks ${enemy.name} at level ${this.attackPower}`
    );
    enemy.hp -= this.attackPower;
    if (enemy.hp <= 0) {
      console.log(`${enemy.name} has died.`);
    }
    return true;
  }

  chargePower() {
    console.log(`${this.name} charges up to attack`);
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
    console.log(
      `And now you will burn from my fire at ${this.temperature} degrees!`
    );
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
    console.log(
      `${this.name} took a magma bath and increased temperature to ${this.temperature} degrees!`
    );
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
      console.log(
        `${this.name} will use their bladder to attack multiple times`
      );
      for (let i = 0; i < this.waterBladderSize; i++) {
        super.attack(enemy);
      }
      this.waterBladderSize = 0;
    }
    console.log("And now you will be soaking wet!");
  }

  chargePower() {
    super.chargePower();
    this.waterBladderSize += 2;
    if (this.waterBladderSize > 5) {
      console.log(`${this.name} took in too much water`);
      this.waterBladderSize = 0;
    }
    console.log(
      `${this.name} now has their bladder filled with ${this.waterBladderSize} L water.`
    );
  }
}

function fight(monster, enemies) {
  monster.chargePower();

  for (let enemy of enemies) {
    monster.attack(enemy);
  }
}

const myMonster = new FireMonster("wizzrobe", 8);
const monster1 = new FireMonster("demon firesage", 4);
const monster2 = new WaterMonster("cthulhu", 3);

fight(myMonster, [monster1, monster2]);
console.log(monster1);
console.log(monster2);
