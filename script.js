let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let monsterHealth;
let fighting;
let inventory = ["Kitchen knife"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const xpText = document.querySelector("#xp-text");
const healthText = document.querySelector("#health-text");
const monsterStats = document.querySelector(".monster");
const goldText = document.querySelector("#gold-text");
const monsterName = document.querySelector("#monster-name");
const monsterHealthEl = document.querySelector("#monster-health");
const text = document.querySelector("#text");
const weapons = [
  { name: "Kitchen knife", power: 5 },
  { name: "Baseball bat", power: 10 },
  { name: "dagger", power: 20 },
  { name: "sword", power: 30 },
];
const monsters = [
  { name: "slime", level: 1, health: 20 },
  { name: "Flying skull", level: 5, health: 100 },
  { name: "Dragon", level: 10, health: 300 },
];
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'You are in town square, you see a sign that says "store" ',
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store",
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight flying skull", "run"],
    "button functions": [fightSlime, fightSkull, goTown],
    text: "You enter the cave. You see some monsters",
  },
  {
    name: "fight",
    "button text": ["attack", "dodge", "run"],
    "button functions": [attack, dodge, goTown],
    text: "Oh no there's a monster! Attack? dodge? run?",
  },
  {
    name: "kill monster",
    "button text": [
      "Go to town square",
      "Go to town square",
      "Go to town square",
    ],
    "button functions": [goTown, goTown, goTown],
    text: "You killed the monster. Good job warrior! You can go back now.",
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "BOO! You lose!",
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "Congratulations! you defeated the dragon",
  },
];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
  console.log("gotown");
}

function goStore() {
  update(locations[1]);
  console.log("gostore");
}

function goCave() {
  update(locations[2]);
  console.log("gocave");
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You don't have enough money to buy health potion";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      inventory.push(newWeapon);
      text.innerText = `You now have a ${newWeapon}.`;
      text.innerText += `In your inventory you have: ${inventory}`;
    } else {
      text.innerText = "You don't have enough money to buy a new weapon";
    }
  } else {
    text.innerText = "You already have the most powerful weapon";
    button2.innerText = "sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = `You sold a ${currentWeapon}.`;
    text.innerText = ` In your inventory you have: ${inventory}`;
  } else {
    text.innerText = "You can't sell your only weapon";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightSkull() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthEl.innerText = monsterHealth;
  console.log("gofight");
}

function attack() {
  text.innerText = `The ${monsters[fighting].name} attacks you.`;
  text.innerText = `You attack them with your ${inventory[currentWeapon]}`;
  // health -= getMonsterAttackValue(monsters[fighting].level);
  // if (monsterHit()) {
  //   monsterHealth -=
  //     weapons[currentWeapon].power * Math.floor(Math.random() * xp) + 1;
  // } else {
  //   text.innerText = "You miss";
  // }
  health -= monsters[fighting].level * 5;
  monsterHealth -= weapons[currentWeapon].power;
  monsterHealthEl.innerText = monsterHealth;
  healthText.innerText = health;

  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatedMonster();
    }
  }

  if (Math.random > 0.8 && inventory.length <= 1) {
    text.innerText = `You ${inventory.pop()} breaks`;
    currentWeapon--;
  }
  console.log("attack");
  console.log(monsterHealth);
}

// function getMonsterAttackValue(level) {
//   const hit = level * 5 - Math.floor(Math.random() * xp);
//   return hit > 0 ? hit : 0;
// }

// function monsterHit() {
//   return Math.random() > 0.2 || health < 20;
// }

function dodge() {
  text.innerText = `You dodge the attack from ${monsters[fighting].name}`;
}

function defeatedMonster() {
  update(locations[4]);
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  health = 100;
  xp = 0;
  gold = 50;
  currentWeapon = 0;
  inventory = ["Kitchen knife"];
  healthText.innerText = health;
  xpText.innerText = xp;
  goldText.innerText = gold;
  goTown();
}
