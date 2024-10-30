"use strict";
const foodSupply = {
    grass: 100,
    grains: 100,
    meat: 50,
    junk: 30,
};
class Animal {
    constructor(name, type, sound, foodType, foodAmount) {
        this.name = name;
        this.type = type;
        this.sound = sound;
        this.foodType = foodType;
        this.foodAmount = foodAmount;
    }
    singSong() {
        return `Old MacDonald had a farm, E-I-E-I-O, and on his farm he had a ${this.type}, E-I-E-I-O,
         with a ${this.sound}-${this.sound} here and a ${this.sound}-${this.sound} there,
          here a ${this.sound}, there a ${this.sound}, everywhere a ${this.sound}-${this.sound},
          Old MacDonald had a farm, E-I-E-I-O!`;
    }
    eat() {
        if (foodSupply[this.foodType] >= this.foodAmount) {
            foodSupply[this.foodType] -= this.foodAmount;
            return `${this.name} the ${this.type} ate ${this.foodAmount} units of ${this.foodType}.`;
        }
        else {
            return `Not enough ${this.foodType} for ${this.name} the ${this.type}. They gon die!`;
        }
    }
}
// Creating Animals
const animals = [
    new Animal("Q", "Cow", "Moo", "grass", 15),
    new Animal("Donald", "Duck", "Quack", "grains", 5),
    new Animal("Dogmeat", "Dog", "Woof", "meat", 5),
    new Animal("Arthur", "Horse", "Neigh", "grass", 20),
    new Animal("Splinkus", "Pig", "Oink", "junk", 10),
    new Animal("Quandale", "Capybara", "Squeak", "grass", 5),
];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function simulateDay() {
    const output = document.getElementById("farm-output");
    output.innerHTML = `<h2>Day Simulation</h2>`;
    animals.forEach(animal => {
        const song = animal.singSong();
        const eatingStatus = animal.eat();
        const foodLeft = `Remaining ${animal.foodType}: ${foodSupply[animal.foodType]}`;
        output.innerHTML += `<h3>${animal.name} the ${animal.type}</h3>`;
        output.innerHTML += `<p>${song}</p>`;
        output.innerHTML += `<p>${eatingStatus}</p>`;
        output.innerHTML += `<p>${foodLeft}</p><hr>`;
    });
}
//# sourceMappingURL=MccesFarm.js.map