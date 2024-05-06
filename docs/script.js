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
        // Same as before
    }
}

function updateStats(player) {
    // Same as before
}

function setupActions(player) {
    // Same as before
}

function main() {
    // Same as before
}

main();
