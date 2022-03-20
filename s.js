let score = 0;

let config = {
    step: 0,
    maxStep: 8,

    sizeCell: 16,
    sizeBerry: 16 / 4,
}


const snake = {

    x: 160,
    y:160,


    dx: config.sizeCell,
    dy: 0,
    talls: [],
    maxTalls: 3,
}

const berry = {
    x: 0,
    y: 0,
}

const canvas = document.querySelector('#game-canvas');

const context = canvas.getContext('2d');

const scoreBlock = document.querySelector('.game-score .score-count')

function gameLoop() {
    
    requestAnimationFrame( gameLoop);

    if(++config.step < config.maxStep){
        return;
    }
}
requestAnimationFrame( gameLoop );