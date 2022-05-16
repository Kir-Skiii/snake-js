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
randomPositionBerry();

function gameLoop() {
    
    requestAnimationFrame( gameLoop);

    if(++config.step < config.maxStep){
        return;
    }

    config.step = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawSnake();
    drawBerry();
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

    collisionBorder();

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
            incScore();
            randomPositionBerry();
    

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

        for(let i = index + 1; i < snake.talls.length; i++) {

            if(el.x == snake.talls[i].x && el.y == snake.talls[i].y) {
                refreshGame();
            }
        }
    
    })
}


function drawBerry() {

    context.beginPath();
    context.fillStyle = '#A00034';
    context.arc(
        berry.x + (config.sizeCell / 2),
        berry.y + (config.sizeCell / 2),
        config.sizeBerry, 0, 2 * Math.PI);
    context.fill();
}


function randomPositionBerry() {
    berry.x = getRandomInt(0, canvas.width / config.sizeCell) * config.sizeCell;
    berry.y = getRandomInt(0, canvas.height / config.sizeCell) * config.sizeCell;
}



document.addEventListener('keydown', function(e) {
    console.log('Подслушиватель', e);

    if(e.code == 'ArrowUp'){
        snake.dy = -config.sizeCell;
        snake.dx = 0;
    } else if (e.code == 'ArrowLeft') {
        snake.dx = -config.sizeCell;
        snake.dy = 0;
    } else if (e.code == 'ArrowDown') {
        snake.dy = config.sizeCell;
        snake.dx = 0;
    } else if (e.code == 'ArrowRight') {
        snake.dx = config.sizeCell;
        snake.dy = 0;
    }
});

// document.addEventListener('keydown', function(e) {

//     if(e.code == 'KeyY'){
//         snake.dy = -config.sizeCell;
//         snake.dx = 0;
//     } else if (e.code == 'KeyG') {
//         snake.dx = -config.sizeCell;
//         snake.dy = 0;
//     } else if (e.code == 'KeyH') {
//         snake.dy = config.sizeCell;
//         snake.dx = 0;
//     } else if (e.code == 'KeyJ') {
//         snake.dx = config.sizeCell;
//         snake.dy = 0;
//     }
// });

function collisionBorder() {

    if(snake.x < 0) {
        snake.x = canvas.width - config.sizeCell;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - config.sizeCell;
    } else if (snake.y >= canvas.height){
        snake.y = 0;
    }
}

function refreshGame() {
    score = 0;
    drawScore();

    snake.x = 160;
    snake.y = 160;
    snake.talls = [];
    snake.maxTalls = 3;
    snake.dx = config.sizeCell;
    snake.dy = 0;

    randomPositionBerry();
}