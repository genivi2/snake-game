// Get the canvas element and its context
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

// Define the size of each square (box) on the canvas
let box = 32;

// Initialize the snake as an array of boxes
let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };

// Set the initial direction of the snake
let direction = "right";

// Place the first food item at a random position on the canvas
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Function to draw the game background
function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Function to draw the snake on the canvas
function createSnake() {
    for(let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Function to draw the food on the canvas
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Listen for arrow key presses to change the direction of the snake
document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

// Main game loop
function startGame() {
    // Check if the snake has hit the canvas border
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    // Check if the snake has hit itself
    for(let i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over!');
        }
    }

    // Draw the game objects
    createBG();
    createSnake();
    drawFood();

    // Move the snake in the current direction
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // Check if the snake has eaten the food
    if(snakeX != food.x || snakeY != food.y) {
        // If not, remove the tail of the snake to keep the same length
        snake.pop();
    } else {
        // If the snake ate the food, generate a new food item at a random position
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    // Create a new head and add it to the beginning of the snake to move it
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

// Start the game loop
let game = setInterval(startGame, 100);