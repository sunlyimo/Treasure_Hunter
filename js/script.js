const mapImg = document.getElementById('map')
const mapDiv = document.getElementById('map-container')
const startButton = document.getElementById('start-button')
const gameInfo = document.getElementById('game-info')

const MAX_NB_CLICS = 15

let treasurePos = { x: 0, y: 0 }
let nbClicksLeft = 0;
let gamePlaying = false;

mapImg.addEventListener('click', (evt) => {
    if (!gamePlaying) return;
    const rect = mapImg.getBoundingClientRect();

    // Calcule les coordonnées relatives à l'image
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;

    // Utilise ces coordonnées pour la logique du jeu
    const magnitude = Math.abs(treasurePos.x - x) + Math.abs(treasurePos.y - y);
    if (magnitude < 30) { // Le click est assé proche du trésors, on gagne.
        addEmojiOnMap(treasurePos, '💰');
        giveHint("Gagné");
        winGame();
        return;
    } else if (magnitude < 60) {
        addEmojiOnMap({ x: x, y: y }, '🔥');
        giveHint("Brûlant!")
    } else if (magnitude < 120) {
        addEmojiOnMap({ x: x, y: y }, '🌡️');
        giveHint("Chaud")
    } else if (magnitude < 240) {
        addEmojiOnMap({ x: x, y: y }, '🗿');
        giveHint("Tiède")
    } else if (magnitude < 300) {
        addEmojiOnMap({ x: x, y: y }, '🍨');
        giveHint("Froid")
    } else {
        addEmojiOnMap({ x: x, y: y }, '🧊');
        giveHint("Glacé")
    }

    nbClicksLeft--;
    if (nbClicksLeft <= 0) {
        addEmojiOnMap(treasurePos, '💰');
        giveHint("Perdu");
        loseGame();
        return;
    }
});

function startGame() {
    treasurePos.x = Math.floor(Math.random() * 131864861 % mapImg.clientWidth);
    treasurePos.y = Math.floor(Math.random() * 764653156 % mapImg.clientHeight);
    nbClicksLeft = MAX_NB_CLICS;
    gamePlaying = true;
    removeEmojisOnMap();
    giveHint('Trouvez le trésors...');
}


startButton.addEventListener('click', startGame);


function giveHint(hint) {

    gameInfo.textContent = hint;
}

function winGame() {
    gamePlaying = false;
    gameInfo.textContent += ` en ${MAX_NB_CLICS - nbClicksLeft} clics`
}

function loseGame() {
    gamePlaying = false;
}

function addEmojiOnMap(pos, emoji) {
    newLabel = document.createElement("label");
    newLabel.textContent = emoji;
    mapImg.style.position = 'relative';
    newLabel.className = "treasure";
    mapDiv.appendChild(newLabel)
    newLabel.style.left = `${pos.x - newLabel.offsetWidth / 2}px`;
    newLabel.style.top = `${pos.y - newLabel.offsetHeight / 2}px`;
}

function removeEmojisOnMap() {
    const children = mapDiv.children

    for (let i = children.length - 1; i >= 0; i--) {
        if (children[i] === mapImg) continue; // Ne pas supprimer la carte
        mapDiv.removeChild(children[i]);
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    startGame();
});