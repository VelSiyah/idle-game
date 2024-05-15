let age = 20; // Starting age
let resources = 0;
let isQueueRunning = false;
let queue = [];

function updateStats() {
    document.getElementById('age').innerText = age;
    document.getElementById('resources').innerText = resources;
    document.getElementById('queueStatus').innerText = isQueueRunning ? 'Running' : 'Stopped';
}

function logMessage(message) {
    const log = document.getElementById('log');
    const p = document.createElement('p');
    p.innerText = message;
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
}

function meditate() {
    queue.push(() => {
        resources += 1;
        logMessage(`Meditated and gained 1 resource. Total resources: ${resources}`);
        updateStats();
    });
}

function cultivate() {
    queue.push(() => {
        resources += 10; // Example: Cultivation increases resources
        logMessage(`Cultivated and gained 10 resources. Total resources: ${resources}`);
        updateStats();
    });
}

function toggleQueue() {
    isQueueRunning = !isQueueRunning;
    if (isQueueRunning) {
        document.getElementById('toggleQueueButton').innerText = 'Stop Queue';
        executeQueue();
    } else {
        document.getElementById('toggleQueueButton').innerText = 'Start Queue';
    }
}

function executeQueue() {
    if (queue.length === 0) {
        toggleQueue();
        return;
    }
    const action = queue.shift();
    action();
    if (isQueueRunning) {
        setTimeout(executeQueue, 1000); // Execute next action after 1 second
    }
}

document.getElementById('meditateButton').addEventListener('click', meditate);
document.getElementById('cultivateButton').addEventListener('click', cultivate);
document.getElementById('toggleQueueButton').addEventListener('click', toggleQueue);

updateStats();
