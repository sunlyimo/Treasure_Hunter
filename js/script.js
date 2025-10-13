const mapImg = document.getElementById('map')
const startButton = document.getElementById('start-button')
const gameInfo = document.getElementById('game-info')

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


startButton.addEventListener('click', (evt) => {
    treasurePos.x = mapImg.x + Math.floor(Math.random() * 131864861 % mapImg.clientWidth);
    treasurePos.y = mapImg.y + Math.floor(Math.random() * 764653156 % mapImg.clientHeight);
    nbClicksLeft = 15;
    gamePlaying = true;
    giveHint('')
});


function giveHint(hint) {
    gameInfo.textContent = hint;
}

function winGame() {
    gamePlaying = false;
}

function loseGame() {
    gamePlaying = false;
}