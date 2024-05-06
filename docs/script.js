// Define the Player class...
class Player {
    constructor() {
        // Base resources
        this.health = 1;
        this.stamina = 0;
        this.ki = 0;
        this.distance = 0; // Added Distance parameter

        // Maximum resources
        this.max_health = 99 + (1.5 * this.vigor) + (0.5 * this.willpower);
        this.max_stamina = 99 + (0.75 * this.vigor) + this.dexterity + (0.25 * this.willpower);
        this.max_ki = 99 + (0.5 * this.vigor) + (1.5 * this.willpower);

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
        const self = this; // Store reference to the player object
        const restInterval = setInterval(function() {
            if (self.stamina < self.max_stamina) {
                self.stamina += 1;
                self.update_exp("stamina", 1);
            }
            if (self.health < self.max_health) {
                self.health += 1;
                self.update_exp("health", 1);
            }
            if (self.ki < self.max_ki) {
                self.ki += 1;
                self.update_exp("ki", 1);
            }
            updateStats(self); // Update UI
        }, 1000); // 1000 milliseconds interval
    }

    crawl() {
        const self = this; // Store reference to the player object
        const crawlInterval = setInterval(function() {
            if (self.stamina > 0) {
                if (self.distance !== self.targetDistance) {
                    if (self.distance < self.targetDistance) {
                        self.distance += (0.75 * self.dexterity); // Move based on dexterity
                        self.stamina -= 1;
                        self.update_exp("stamina", -1);
                        self.update_exp("vigor", 1); // Gain vigor experience
                        self.update_exp("dexterity", 4); // Gain dexterity experience
                    } else {
                        self.distance -= (0.75 * self.dexterity); // Move based on dexterity
                        self.stamina -= 1;
                        self.update_exp("stamina", -1);
                        self.update_exp("vigor", 1); // Gain vigor experience
                        self.update_exp("dexterity", 4); // Gain dexterity experience
                    }
                } else {
                    clearInterval(crawlInterval); // Stop crawling when target distance reached
                }
            } else {
                clearInterval(crawlInterval); // Stop crawling if no stamina left
            }
            updateStats(self); // Update UI
        }, 1000); // 1000 milliseconds interval
    }

    situp() {
        const self = this; // Store reference to the player object
        const situpInterval = setInterval(function() {
            if (self.stamina > 0) {
                self.stamina -= 1;
                self.update_exp("stamina", -1);
                self.update_exp("vigor", 5); // Gain vigor experience
            } else {
                clearInterval(situpInterval); // Stop sit-ups if no stamina left
            }
            updateStats(self); // Update UI
        }, 1000); // 1000 milliseconds interval
    }

    update_exp(stat, exp) {
        // Update experience and stats based on the action
        if (stat === "stamina" && exp < 0) {
            this.vigor_exp += 1; // Spending stamina increases vigor
            this.dexterity_exp += 2; // Spending stamina increases dexterity
            this.willpower_exp += 1; // Spending stamina increases willpower
        }
        if (stat === "stamina" && exp > 0) {
            this.vigor_exp += 1; // Recovering stamina increases vigor
            this.dexterity_exp += 2; // Recovering stamina increases dexterity
            this.willpower_exp += 1; // Recovering stamina increases willpower
        }
        if (stat === "health" && exp < 0) {
            this.vigor_exp += 3; // Spending health increases vigor
            this.willpower_exp += 1; // Spending health increases willpower
        }
        if (stat === "health" && exp > 0) {
            this.vigor_exp += 2; // Recovering health increases vigor
            this.willpower_exp += 1; // Recovering health increases willpower
        }
        if (stat === "ki" && exp < 0) {
            this.vigor_exp += 1; // Spending ki increases vigor
            this.willpower_exp += 3; // Spending ki increases willpower
        }
        if (stat === "ki" && exp > 0) {
            this.vigor_exp += 1; // Recovering ki increases vigor
            this.willpower_exp += 2; // Recovering ki increases willpower
        }
        // Check for level up
        if (this.vigor_exp >= this.vigor_difficulty) {
            this.vigor_exp -= this.vigor_difficulty;
            this.vigor_difficulty = 75; // Reset the difficulty
            this.vigor += 1; // Increase vigor
        }
        if (this.dexterity_exp >= this.dexterity_difficulty) {
            this.dexterity_exp -= this.dexterity_difficulty;
            this.dexterity_difficulty = 100; // Reset the difficulty
            this.dexterity += 1; // Increase dexterity
        }
        if (this.willpower_exp >= this.ki_difficulty) {
            this.willpower_exp -= this.ki_difficulty;
            this.ki_difficulty = 100; // Reset the difficulty
            this.willpower += 1; // Increase willpower
        }
    }
}

function updateStats(player) {
    // Update the UI with player stats
    document.getElementById("health").innerText = "Health: " + player.health + "/" + player.max_health;
    document.getElementById("stamina").innerText = "Stamina: " + player.stamina + "/" + player.max_stamina;
    document.getElementById("ki").innerText = "Ki: " + player.ki + "/" + player.max_ki;
    document.getElementById("distance").innerText = "Distance: " + player.distance;
    document.getElementById("vigor").innerText = "Vigor: " + player.vigor;
    document.getElementById("vigorBar").value = player.vigor_exp;
    document.getElementById("dexterity").innerText = "Dexterity: " + player.dexterity;
    document.getElementById("dexterityBar").value = player.dexterity_exp;
    document.getElementById("willpower").innerText = "Willpower: " + player.willpower;
    document.getElementById("willpowerBar").value = player.willpower_exp;
}

function setupActions(player) {
    // Set up event listeners for action buttons
    document.getElementById("restBtn").addEventListener("click", function() {
        player.rest();
    });

    document.getElementById("crawlBtn").addEventListener("click", function() {
        // Prompt the user to enter distance
        var distance = parseInt(prompt("Enter distance to crawl:"));
        player.targetDistance = distance; // Store target distance in player object
        player.crawl(); // Execute crawl action
    });

    document.getElementById("situpBtn").addEventListener("click", function() {
        player.situp(); // Execute sit-up action
    });
}

function main() {
    // Initialize player and set up actions
    var player = new Player();
    updateStats(player);
    setupActions(player);
}

main();
