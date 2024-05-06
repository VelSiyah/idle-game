// Define the Player class...
// Paste the JavaScript code for the game here

// JavaScript code for the game
class Player {
    constructor() {
        // Base resources
        this.health = 1;
        this.stamina = 0;
        this.ki = 0;
        this.distance = 0; // Added Distance parameter

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
        while (true) {
            if (this.stamina < this.max_stamina) {
                this.stamina += 1;
                this.update_exp("stamina", 1);
            }
            if (this.health < this.max_health) {
                this.health += 1;
                this.update_exp("health", 1);
            }
            if (this.ki < this.max_ki) {
                this.ki += 1;
                this.update_exp("ki", 1);
            }
            setTimeout(() => {}, 1000);
        }
    }

    crawl() {
        while (this.distance > 0) {
            if (this.stamina > 0 && this.health > 0) {
                this.dexterity += 1;
                this.stamina -= 1;
                this.health -= 1;
                this.distance -= 1;
                this.update_exp("dexterity", 2);
                setTimeout(() => {}, 1000);
            }
        }
        console.log("You reached your destination!");
    }

    situp() {
        while (true) {
            if (this.stamina > 0) {
                this.vigor += 2;
                this.stamina -= 1;
                this.update_exp("vigor", 2);
                setTimeout(() => {}, 1000);
            }
        }
    }

    update_exp(stat, exp) {
        if (stat == "vigor") {
            this.vigor_exp += exp;
            if (this.vigor_exp >= this.vigor_difficulty) {
                this.vigor_exp -= this.vigor_difficulty;
                this.vigor_difficulty = 75; // No autonomous increase
                this.vigor += 1;
                console.log("Vigor increased!");
            }
        } else if (stat == "dexterity") {
            this.dexterity_exp += exp;
            if (this.dexterity_exp >= this.dexterity_difficulty) {
                this.dexterity_exp -= this.dexterity_difficulty;
                this.dexterity_difficulty = 100; // No autonomous increase
                this.dexterity += 1;
                console.log("Dexterity increased!");
            }
        } else if (stat == "ki") {
            this.willpower_exp += exp;
            if (this.willpower_exp >= this.ki_difficulty) {
                this.willpower_exp -= this.ki_difficulty;
                this.ki_difficulty = 100; // No autonomous increase
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
    document.getElementById("vigor").innerText = "Vigor: " + player.vigor;
    document.getElementById("vigorBar").value = player.vigor_exp;
    document.getElementById("dexterity").innerText = "Dexterity: " + player.dexterity;
    document.getElementById("dexterityBar").value = player.dexterity_exp;
    document.getElementById("willpower").innerText = "Willpower: " + player.willpower;
    document.getElementById("willpowerBar").value = player.willpower_exp;
}

function setupActions(player) {
    document.getElementById("restBtn").addEventListener("click", function() {
        // Execute rest action
        var rest_thread = new Worker(function() {
            player.rest();
        });
        rest_thread.start();
    });

    document.getElementById("crawlBtn").addEventListener("click", function() {
        // Prompt the user to enter distance
        var distance = parseInt(prompt("Enter distance to crawl:"));
        player.distance = distance;

        // Execute crawl action
        var crawl_thread = new Worker(function() {
            player.crawl();
        });
        crawl_thread.start();
    });

    document.getElementById("situpBtn").addEventListener("click", function() {
        // Execute sit-up action
        var situp_thread = new Worker(function() {
            player.situp();
        });
        situp_thread.start();
    });
}

function main() {
    var player = new Player();
    updateStats(player);
    setupActions(player);
}

main();
