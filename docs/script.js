class Action {
    constructor(name, cost, effect) {
        this.name = name;
        this.cost = cost;
        this.effect = effect;
    }
}

class Game {
    constructor() {
        this.resources = 0;
        this.resourcePerSecond = 1;
        this.upgradeCost = 10;
        this.upgradeMultiplier = 2;
        this.running = false;
        this.actionQueue = [];
    }

    start() {
        this.running = true;
        this.generateResources();
    }

    stop() {
        this.running = false;
    }

    upgrade() {
        if (this.resources >= this.upgradeCost) {
            this.resources -= this.upgradeCost;
            this.upgradeCost *= this.upgradeMultiplier;
            this.resourcePerSecond += 1;
            document.getElementById("upgradeCost").textContent = `Upgrade Cost: ${this.upgradeCost}`;
            document.getElementById("resourcePerSecond").textContent = `Resource per second: ${this.resourcePerSecond}`;
            document.getElementById("resources").textContent = `Resources: ${this.resources}`;
        }
    }

    addAction(action) {
        if (this.resources >= action.cost) {
            this.resources -= action.cost;
            this.actionQueue.push(action);
            this.executeActionQueue();
        }
    }

    executeActionQueue() {
        if (this.actionQueue.length > 0) {
            const action = this.actionQueue.shift();
            action.effect();
            this.executeActionQueue();
        }
    }

    generateResources() {
        setInterval(() => {
            if (this.running) {
                this.resources += this.resourcePerSecond;
                document.getElementById("resources").textContent = `Resources: ${this.resources}`;
            }
        }, 1000);
    }
}

const game = new Game();

// Define actions
const gatherWood = new Action("Gather Wood", 5, () => {
    game.resources += 10;
    document.getElementById("resources").textContent = `Resources: ${game.resources}`;
});

const mineStone = new Action("Mine Stone", 10, () => {
    game.resources += 20;
    document.getElementById("resources").textContent = `Resources: ${game.resources}`;
});
