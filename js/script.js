// Initialize vars
let board = document.querySelector('#board');
let score = 0;
// Snake dir var
let inputDir = {
    x: 0,
    y: 0
};
// Snake loc list
let snakeArr = [
    {
        x: 10,
        y: 10
    }
];
// Food loc var
let foodArr = {
    x: 7,
    y: 14
};

// Audio vars
const foodAudio = new Audio('food.wav');
const gameOverAudio = new Audio('game-over.wav');
const moveAudio = new Audio('move.wav');

// Frame update vars
let frameSpeed = 5;
let lastFrame = 0;



// Game logic
function main(currentFrame) {
    // Update frame
    window.requestAnimationFrame(main);
    //console.log(currentFrame);

    // Update frame every 0.5 sec
    if (((currentFrame - lastFrame) / 1000) < 1 / frameSpeed) return;

    lastFrame = currentFrame;
   
    // Game engine
    gameEngine();
}

function gameEngine() {
    // Update
    // If snake collapse
    if (didCollide(snakeArr)) {
        gameOverAudio.play();
        inputDir = {
            x: 0,
            y: 0
        };

        alert('Game Over. Press any key to try again!');
        
        snakeArr = [
            {
                x: 10,
                y: 10
            }
        ];
        score = 0;
    }

    // If reached food
    if (snakeArr[0].x === foodArr.x && snakeArr[0].y === foodArr.y) {
        foodAudio.play();
        // Increment size
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        // Random foor loc b/w: a and b
        let a = 2, b = 18;
        foodArr = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // Body Movement
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        
        snakeArr[i + 1] = {...snakeArr[i]};
        
    }
    // Head movement
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Render
    // Render snake
    board.innerHTML = '';
    snakeArr.forEach((snakeLoc, index) => {
        let snake = document.createElement('div');
        snake.style.gridRowStart = snakeLoc.y;
        snake.style.gridColumnStart = snakeLoc.x;

        if (index === 0) 
            snake.classList.add('head');
        else
            snake.classList.add('snake');

        board.appendChild(snake);
    });

    // Render food
    let food = document.createElement('div');
    food.style.gridRowStart = foodArr.y;
    food.style.gridColumnStart = foodArr.x;
    food.classList.add('food');
    board.appendChild(food);
    
}

// Collision
function didCollide(snakeArr) {
    // If self collision
    for (let i = 0; i < snakeArr.length - 1; i++) {
        if (snakeArr[0].x === snakeArr[i + 1].x && snakeArr[0].y === snakeArr[i + 1].y)
            return true
    }
    // If collision with wall
    if (snakeArr[0].x >= 20 || snakeArr[0].x <= 0 || snakeArr[0].y >= 20 || snakeArr[0].y <= 0)
        return true

    return false;
}



// Main logic
window.requestAnimationFrame(main);

window.addEventListener('keydown', (e) => {
    // Start the game
    inputDir = {
        x: 0,
        y: 1
    }

    moveAudio.play();

    // Check which arrow key pressed
    switch (e.key) {
        // Up
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        // Down
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        // Left
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        // Right
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }

});