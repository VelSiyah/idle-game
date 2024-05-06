// Define the Player class
class Player {
    constructor() {
        // Base resources
        this.health = 1;
        this.stamina = 0;
        this.ki = 0;
        this.distance = 0;  // Added Distance parameter

        // Maximum resources
        this.max_health = 100;
        this.max_stamina = 100;
        this.max_ki = 100;

        // Base stats
        this.vigor = 1;
        this.dexterity = 1;
        this.willpower = 1;

        // Experience
        this.vigor_exp = 0;
        this.dexterity_exp = 0;
        this.willpower_exp = 0;

        // Race-specific difficulties
        this.vigor_difficulty = 75;
        this.dexterity_difficulty = 100;
        this.ki_difficulty = 100;
    }

    rest() {
        setInterval(() => {
            if (this.stamina < this.max_stamina) {
                this.stamina += 1;
                this.updateExp("stamina", 1);
            }
            if (this.health < this.max_health) {
                this.health += 1;
                this.updateExp("health", 1);
            }
            if (this.ki < this.max_ki) {
                this.ki += 1;
                this.updateExp("ki", 1);
            }
            updateStats(this);
        }, 1000);
    }

    crawl(distance) {
        this.distance = distance;
        setInterval(() => {
            if (this.distance > 0 && this.stamina > 0 && this.health > 0) {
                this.dexterity += 1;
                this.stamina -= 1;
                this.health -= 1;
                this.distance -= 1;
                this.updateExp("dexterity", 2);
                updateStats(this);
            } else {
                clearInterval();
                console.log("You reached your destination!");
            }
        }, 1000);
    }

    situp() {
        setInterval(() => {
            if (this.stamina > 0) {
                this.vigor += 2;
                this.stamina -= 1;
                this.updateExp("vigor", 2);
                updateStats(this);
            }
        }, 1000);
    }

    updateExp(stat, exp) {
        if (stat === "vigor") {
            this.vigor_exp += exp;
            if (this.vigor_exp >= this.vigor_difficulty) {
                this.vigor_exp -= this.vigor_difficulty;
                this.vigor_difficulty = 75;  // No autonomous increase
                this.vigor += 1;
                console.log("Vigor increased!");
            }
        } else if (stat === "dexterity") {
            this.dexterity_exp += exp;
            if (this.dexterity_exp >= this.dexterity_difficulty) {
                this.dexterity_exp -= this.dexterity_difficulty;
                this.dexterity_difficulty = 100;  // No autonomous increase
                this.dexterity += 1;
                console.log("Dexterity increased!");
            }
        } else if (stat === "ki") {
            this.willpower_exp += exp;
            if (this.willpower_exp >= this.ki_difficulty) {
                this.willpower_exp -= this.ki_difficulty;
                this.ki_difficulty = 100;  // No autonomous increase
                this.willpower += 1;
                console.log("Willpower increased!");
            }
        }
    }
}

function updateStats(player) {
    document.getElementById("health").innerText = "Health: " + player.health;
    document.getElementById("stamina").innerText = "Stamina: " + player.stamina;
    document.getElementById("ki").innerText = "Ki: " + player.ki;
    document.getElementById("distance").innerText = "Distance: " + player.distance;
}

function setupActions(player) {
    document.getElementById("restBtn").addEventListener("click", function() {
        player.rest();
    });

    document.getElementById("crawlBtn").addEventListener("click", function() {
        var distance = parseInt(prompt("Enter distance to crawl:"));
        player.crawl(distance);
    });

    document.getElementById("situpBtn").addEventListener("click", function() {
        player.situp();
    });
}

function main() {
    var player = new Player();
    updateStats(player);
    setupActions(player);
}

main();
