// Define the Resource class
class Resource {
    constructor(name, initialAmount = 0) {
        this.name = name;
        this.amount = initialAmount;
    }
}

// Define the Loop class
class Loop {
    constructor(name, outputResource, inputResources = []) {
        this.name = name;
        this.outputResource = outputResource;
        this.inputResources = inputResources;
    }
}

// Define the Player class
class Player {
    constructor() {
        this.resources = {};
        this.loops = [];
    }

    // Method to add a resource to the player's inventory
    addResource(resource) {
        this.resources[resource.name] = resource;
    }

    // Method to add a loop to the player's inventory
    addLoop(loop) {
        this.loops.push(loop);
    }

    // Method to produce resources based on the player's loops
    produce() {
        this.loops.forEach(loop => {
            let inputMet = true;
            loop.inputResources.forEach(input => {
                if (this.resources[input.name].amount < input.amount) {
                    inputMet = false;
                }
            });

            if (inputMet) {
                loop.inputResources.forEach(input => {
                    this.resources[input.name].amount -= input.amount;
                });
                this.resources[loop.outputResource.name].amount++;
            }
        });
    }
}

// Example usage:
const player = new Player();
player.addResource(new Resource("Wood"));
player.addResource(new Resource("Stone"));
player.addLoop(new Loop("Woodcutter", new Resource("Wood"), [new Resource("Stone", 5)]));

// Production loop (simulate producing resources every second)
setInterval(() => {
    player.produce();
}, 1000);
