// Initialize vars
let direction = {x: 0, y: 0};
const foodAudio = new Audio('food.mp3');
const gameOverAudio = new Audio('game-over.mp3');
const moveAudio = new Audio('move.mp3');
const bgMusic = new Audio('bg-music.mp3');

// Game logic
function main(currentTime) {
    // Constantly update frame
    window.requestAnimationFrame(main);

    console.log(currentTime);
}



// Initializing frame
window.requestAnimationFrame(main);