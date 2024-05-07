class Game {
    constructor() {
        this.resource = 0;
        this.resourcePerSecond = 1;
        this.upgradeCost = 10;
        this.upgradeMultiplier = 2;
        this.running = false;
    }

    start() {
        this.running = true;
        this.generateResources();
    }

    stop() {
        this.running = false;
    }

    upgrade() {
        if (this.resource >= this.upgradeCost) {
            this.resource -= this.upgradeCost;
            this.upgradeCost *= this.upgradeMultiplier;
            this.resourcePerSecond *= this.upgradeMultiplier;
            document.getElementById("upgradeCost").textContent = `Upgrade Cost: ${this.upgradeCost}`;
        }
    }

    generateResources() {
        setInterval(() => {
            if (this.running) {
                this.resource += this.resourcePerSecond;
                document.getElementById("resource").textContent = `Resources: ${this.resource}`;
            }
        }, 1000);
    }
}

const game = new Game();
