'use strict';
var player;



//Character Constructor and Prototypes
function Character(name) {
  //fighter
  this.name = name;
  this.hitPoints = 0;
  this.maxHitPoints = 0;
  this.race = '';
  this.class = 'warrior';
  this.statArray = [0, 0, 0, 0, 0, 0];
  this.modArray = [0, 0, 0, 0, 0, 0];
  //this.skillsArray = [0, 0, 0, 0, 0, 0];
  this.proficiencyBonus = 2;
  this.proficiencyArray = ['intimidate', 'perception', 'str-save', 'con-sav']; //set for Fighter
  this.armor = 8;
  this.weaponName = '';
  this.weapon = 5;
  this.useTenSided = false;
  this.equipment = [100]; // GOLD
  this.equipmentName = ['Gold'];
  this.speed;
  this.didWin = false;

}

Character.prototype.generateAllStats = function () {
  for (var i = 0; i < this.statArray.length; i++) {
    // TO-DO: USE FOUR DICE AND DROP LOWEST NUMBER
    var diceVal = [diceValue(6), diceValue(6), diceValue(6)];

    // var diceValue = rollDice();
    console.log(diceVal);
    // Getting sum of numbers
    var sum = sumArray(diceVal);
    console.log(sum); // Prints: 15
    this.statArray[i] = sum;
  }
  console.log(this.statArray);
};

Character.prototype.modifierCalc = function () {

  for (var i = 0; i < this.statArray.length; i++) {
    this.modArray[i] = Math.floor((this.statArray[i] - 10) / 2);

  }
  console.log(this.modArray);
};
//Enemy Constructor and Prototypes

function Enemy(name, hitPoints = 200) {
  this.name = name;
  this.hitPoints = hitPoints;
  this.armor;
  this.usedFireBreath = false;
  this.saveThrow = 1;
  this.initiative = 2;
  this.str = 4;
}



function sumArray(array) {
  var sum = array.reduce(function (a, b) {
    return a + b;
  }, 0);
  return sum;
}

//Storage Functions
function retrieveCharacter(storageKey = 'character') { //Normally 'character'
  var characterFromLocalStorage = localStorage.getItem(storageKey);

  if (characterFromLocalStorage) {
    player = rebuildInstanceForObjLiteral(JSON.parse(characterFromLocalStorage));
    console.log('Retrieved Player: ' + player.name);
    // } else {
    //   //Re run character information through constructor
    //   player = new Character(parsedCharacter[0].name, parsedCharacter.hitPoints);
    //   //TODO: What to do if it can't find the object data in storage
  }
  return player;
}



function saveCharacter(charObj, storageKey = 'character') {

  var stringifyArray = JSON.stringify(charObj);
  localStorage.setItem(storageKey, stringifyArray);
  console.log(`Saved Character ${charObj.name} to Storage`);
}

function rebuildInstanceForObjLiteral(parsedObj) {
  player = new Character(parsedObj.name);
  player.name = parsedObj.name;
  player.hitPoints = parsedObj.hitPoints;
  player.maxHitPoints = parsedObj.maxHitPoints;
  player.race = parsedObj.race;
  player.class = parsedObj.class;
  player.statArray = parsedObj.statArray;
  player.modArray = parsedObj.modArray;
  player.proficiencyBonus = parsedObj.proficiencyBonus;
  player.proficiencyArray = parsedObj.proficiencyArray;
  player.armor = parsedObj.armor;
  player.weaponName = parsedObj.weaponName;
  player.weapon = parsedObj.weapon;
  player.useTenSided = parsedObj.useTenSided;
  player.equipment = parsedObj.equipment; // GOLD
  player.equipmentName = parsedObj.equipmentName;
  player.speed = parsedObj.speed;
  player.didWin = parsedObj.didWin;
  return player;
}
function diceValue(sides) {
  return Math.floor((Math.random() * sides)) + 1;
}

function calcRoll(stat, baseNumber, prof = 'zero') { //stat: array index of the modifier we need, die: max for rollDice function, prof: name of skill used
  // var baseRoll = dieRoll;
  var finalRoll;
  var withMod = baseNumber + player.modArray[stat];

  if (player.proficiencyArray.includes(prof)) {
    //profBool = true;
    finalRoll = withMod + player.proficiencyBonus;
  }
  else {
    finalRoll = withMod;
  }
  return finalRoll;
}
