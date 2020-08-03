const bird = document.querySelector(".bird");
const gameDisplay = document.querySelector(".game-container");
const ground = document.querySelector("ground");

let birdLeft = 220;
let birdBottom = 100;
let gravity = 2;
let isGameOver = false;
let gap = 450;

function startGame() {
  birdBottom -= gravity;
  bird.style.bottom = birdBottom + "px";
  bird.style.left = birdLeft + "px";
}

let gameTimerId = setInterval(startGame, 20);

function control(e) {
  if (e.keyCode === 32) {
    jump();
  }
}

function jump() {
  if (birdBottom < 490) {
    birdBottom += 50;
    console.log(birdBottom);
    bird.style.bottom = birdBottom;
  }
}
document.addEventListener("keyup", control);

function generateObstacle() {
  let obstacleLeft = 500;
  let randomHeight = Math.random() * 60;
  let obstacleBottom = randomHeight;
  const obstacle = document.createElement("div");
  const topObstacle = document.createElement("div");
  if (!isGameOver) {
    obstacle.classList.add("obstacle");
    topObstacle.classList.add("obstacle");
  }
  gameDisplay.appendChild(obstacle);
  gameDisplay.appendChild(topObstacle);
  obstacle.style.left = obstacleLeft + "px";
  obstacle.style.bottom = obstacleBottom + "px";
  topObstacle.style.left = obstacleLeft + "px";
  topObstacle.style.bottom = obstacleBottom + gap + "px";

  function moveObstacle() {
    obstacleLeft -= 2;
    obstacle.style.left = obstacleLeft + "px";
    topObstacle.style.left = obstacleLeft + "px";

    //Remove obstacle from screen if it reaches left most edge
    if (obstacleLeft === -60) {
      clearInterval(timerId);
      gameDisplay.removeChild(obstacle);
      gameDisplay.removeChild(topObstacle);
    }

    //Gameover conditions
    if (
      (obstacleLeft < 280 &&
        obstacleLeft > 160 &&
        birdLeft === 220 &&
        (birdBottom < obstacleBottom + 160 ||
          birdBottom > obstacleBottom + gap - 190)) ||
      birdBottom === 0
    ) {
      gameOver();
      clearInterval(timerId); //Stop obstacle from moving
    }
  }

  let timerId = setInterval(moveObstacle, 20);
  if (!isGameOver) setTimeout(generateObstacle, 3000); //generate new obstacle every 3 seconds
}

generateObstacle();

function gameOver() {
  clearInterval(gameTimerId);
  isGameOver = true;
  document.removeEventListener("keyup", control);
}
