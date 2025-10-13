const mapImg = document.getElementById('map')
const startButton = document.getElementById('start-button')

let treasurePos = { x: 0, y: 0 }
let nbClicksLeft = 0;

mapImg.addEventListener('click', (evt) => {
    nbClicksLeft--;
    if (nbClicksLeft <= 0) return loseGame();

    const magnitude = Math.abs(treasurePos.x - evt.clientX) + Math.abs(treasurePos.y - evt.clientY);
    if (magnitude < 30) {
        console.log("gagné")
    } else if (magnitude < 60) {
        console.log("brûlant!")
    } else if (magnitude < 120) {
        console.log("chaud")
    } else if (magnitude < 240) {
        console.log("tiède")
    } else {
        console.log("glacé")
    }
});


startButton.addEventListener('click', (evt) => {
    treasurePos.x = mapImg.x + Math.floor(Math.random() * 131864861 % mapImg.clientWidth);
    treasurePos.y = mapImg.y + Math.floor(Math.random() * 764653156 % mapImg.clientHeight);
    nbClicksLeft = 15;
});


function loseGame() {
    console.log("perdu")
}