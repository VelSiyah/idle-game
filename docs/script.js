let age = 0;
let resources = 0;

function updateStats() {
    document.getElementById('age').innerText = age;
    document.getElementById('resources').innerText = resources;
}

function logMessage(message) {
    const log = document.getElementById('log');
    const p = document.createElement('p');
    p.innerText = message;
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
}

function meditate() {
    resources += 1;
    logMessage(`Meditated and gained 1 resource. Total resources: ${resources}`);
    updateStats();
}

function ageCharacter() {
    age += 1;
    resources += age;  // Example mechanic: gain resources based on age
    logMessage(`Aged 1 year. Age: ${age}, Total resources: ${resources}`);
    updateStats();
}

document.getElementById('meditateButton').addEventListener('click', meditate);

setInterval(ageCharacter, 10000); // Age the character every 10 seconds

updateStats();
