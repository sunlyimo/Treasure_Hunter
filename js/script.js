const mapImg = document.getElementById('map')
const startButton = document.getElementById('start-button')
const gameInfo = document.getElementById('game-info')

const MAX_NB_CLICS = 15

let treasurePos = { x: 0, y: 0 }
let nbClicksLeft = 0;
let gamePlaying = false;

mapImg.addEventListener('click', (evt) => {
    if (!gamePlaying) return;

    const magnitude = Math.abs(treasurePos.x - evt.clientX) + Math.abs(treasurePos.y - evt.clientY);

    if (magnitude < 30) {
        giveHint("Gagné");
        winGame();
        return;
    } else if (magnitude < 60) {
        giveHint("Brûlant!")
    } else if (magnitude < 120) {
        giveHint("Chaud")
    } else if (magnitude < 240) {
        giveHint("Tiède")
    } else {
        giveHint("Glacé")
    }

    nbClicksLeft--;
    if (nbClicksLeft <= 0) {
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
    treasure = document.createElement("label");
    treasure.textContent = '💰';
    treasure.className = 'treasure'
    treasure.x = treasurePos.x;
    treasure.y = treasurePos.y;
    mapImg.appendChild(treasure)

    giveHint('')
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