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

    // Rest of the Player class methods...
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
    var ui = `
        <h1>Idle Game</h1>
        <div id="stats">
            <p id="health">Health: </p>
            <p id="stamina">Stamina: </p>
            <p id="ki">Ki: </p>
            <p id="distance">Distance: </p>
        </div>
        <div id="actions">
            <button id="restBtn">Rest</button>
            <button id="crawlBtn">Crawl</button>
            <button id="situpBtn">Situp</button>
        </div>
    `;
    document.body.innerHTML = ui; // Replace entire HTML content with the generated UI
    updateStats(player);
    setupActions(player);
}

main();
