const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const boxSize = 20;
const canvasSize = canvas.width / boxSize;
const snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let powerUp = { x: 15, y: 15 };
let speed = 150;
let direction = 'right';
let score = 0;
let isPowerUpActive = false;
let obstacles = [{ x: 3, y: 3 }];

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
    });

    // Draw Food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);

    // Draw PowerUp
    if (isPowerUpActive) {
        ctx.fillStyle = 'purple';
        ctx.fillRect(powerUp.x * boxSize, powerUp.y * boxSize, boxSize, boxSize);
    }

    // Draw Obstacles
    ctx.fillStyle = 'gray';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x * boxSize, obstacle.y * boxSize, boxSize, boxSize);
    });
}

function update() {
    const head = { ...snake[0] };

    // Update snake's head position based on direction
    switch (direction) {
        case 'up':
            head.y -= 1;
            break;
        case 'down':
            head.y += 1;
            break;
        case 'left':
            head.x -= 1;
            break;
        case 'right':
            head.x += 1;
            break;
    }

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
        score++;
        if (isPowerUpActive) {
            score += 2; // Power-up doubles the score
            isPowerUpActive = false;
        }
        food = {
            x: Math.floor(Math.random() * canvasSize),
            y: Math.floor(Math.random() * canvasSize)
        };
        // Spawn a new obstacle when food is eaten
        obstacles.push({
            x: Math.floor(Math.random() * canvasSize),
            y: Math.floor(Math.random() * canvasSize)
        });
    } else {
        // Remove the last segment of the snake if no food is eaten
        snake.pop();
    }

    // Check for collision with power-up
    if (head.x === powerUp.x && head.y === powerUp.y) {
        isPowerUpActive = true;
        setTimeout(() => {
            isPowerUpActive = false;
        }, 5000); // Power-up lasts for 5 seconds
        powerUp = {
            x: Math.floor(Math.random() * canvasSize),
            y: Math.floor(Math.random() * canvasSize)
        };
    }

    // Check for collision with obstacles
    if (obstacles.some(obstacle => obstacle.x === head.x && obstacle.y === head.y)) {
        gameOver();
        return;
    }

    snake.unshift(head);

    // Check for collision with canvas walls
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        gameOver();
    }
}

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, speed);
}

function gameOver() {
    alert(`Game Over! Your score is ${score}`);
    snake.length = 1;
    score = 0;
    speed = 120;
    obstacles = [{ x: 3, y: 3 }];
    direction = 'right';
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

gameLoop();
