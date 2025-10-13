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

    const magnitude = Math.abs(treasurePos.x - evt.clientX) + Math.abs(treasurePos.y - evt.clientY);

    if (magnitude < 30) { // Le click est assé proche du trésors, on gagne.
        addEmojiOnMap(treasurePos, '💰');
        giveHint("Gagné");
        winGame();
        return;
    } else if (magnitude < 60) {
        addEmojiOnMap({ x: evt.clientX, y: evt.clientY }, '🔥');
        giveHint("Brûlant!")
    } else if (magnitude < 120) {
        addEmojiOnMap({ x: evt.clientX, y: evt.clientY }, '🌡️');
        giveHint("Chaud")
    } else if (magnitude < 240) {
        addEmojiOnMap({ x: evt.clientX, y: evt.clientY }, '🗿');
        giveHint("Tiède")
    } else {
        addEmojiOnMap({ x: evt.clientX, y: evt.clientY }, '🧊');
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


startButton.addEventListener('click', () => {
    treasurePos.x = mapImg.x + Math.floor(Math.random() * 131864861 % mapImg.clientWidth);
    treasurePos.y = mapImg.y + Math.floor(Math.random() * 764653156 % mapImg.clientHeight);
    nbClicksLeft = MAX_NB_CLICS;
    gamePlaying = true;
    removeEmojisOnMap();
    giveHint('');
});


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
    newLabel.style.pointerEvents = 'none';
    newLabel.style.userSelect = 'none';
    mapDiv.appendChild(newLabel)
    newLabel.style.position = 'absolute';
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
