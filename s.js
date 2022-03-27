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

drawScore();

function gameLoop() {
    
    requestAnimationFrame( gameLoop);

    if(++config.step < config.maxStep){
        return;
    }

    config.step = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawSnake();
}
requestAnimationFrame( gameLoop );

function incScore() {
    score++
    drawScore();
}

function drawScore(){
    scoreBlock.innerHTML = score;
}

function getRandomInt(min,max){
    return Math.floor(Math.random() * (max-min)+ min);
}

function drawSnake(){
    snake.x += snake.dx;
    snake.y += snake.dy;

    snake.talls.unshift( {x: snake.x, y: snake.y});

    if( snake.talls.length > snake.maxTalls){
        snake.talls.pop();
    }


    snake.talls.forEach( function(el, index) {
        if (index == 0 ) {
            context.fillStyle = '#c90234';
        } else {
            context.fillStyle = '#ab02c9';
        }
        context.fillRect( el.x, el.y, config.sizeCell, config.sizeCell);
    



        if(el.x === berry.x && el.y === berry.y) {
            snake.maxTalls++;
    

            if( score === 10) {
                config.maxStep = 7;
            }else if (score === 20) {
                config.maxStep = 6;
            }else if (score === 30) {
                config.maxStep = 5;
            }else if (score === 40) {
                config.maxStep = 4;
            }
        }
    
    })
}
    