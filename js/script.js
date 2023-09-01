const chicken = document.querySelector('.chicken');
const tree = document.querySelector('.tree');
const birdOne = document.querySelector('.bird');
const birdTwo = document.querySelector('.bird-two');
const barn = document.querySelector('.barn');
const sun = document.querySelector('.sun');
const playButton = document.getElementById('play-button');
const scoreDisplay = document.getElementById('score');
const hightScoreDisplay = document.getElementById('highScore')

let score = 0;
let highScore = 0;
let intervalId;
let isJumping = false;
let isAlive;

//função do pulo
const jump = () => {
  chicken.classList.add('jump');

  if (!isJumping) {
    isJumping = true;
    score += 10;
    scoreDisplay.innerHTML = `Score: ${score}`;
    setTimeout(() => {
      chicken.classList.remove('jump');
      cooldownJump();
    }, 600)
    return;
  }
}

function cooldownJump() {
  isJumping = false;

}

//funções relacionadas ao jogo diretamente
function cleanGame() {
  score = 0;
  scoreDisplay.innerHTML = `Score: ${score}`;

  chicken.style = null;
  chicken.src = './sprites/spr_chicken.gif';

  tree.style.right = null;
  tree.style.left = null;

  birdOne.style.right = null;
  birdOne.style.left = null;

  birdTwo.style.right = null;
  birdTwo.style.left = null;

  barn.style.right = null;
  barn.style.left = null;

  sun.style.right = null;
  sun.style.left = null;

  clearInterval(intervalId);
}


function resetGame() {
  playButton.style.display = 'block';
  playButton.innerHTML = 'Reset';
  hightScoreDisplay.innerHTML = `High Score: ${highScore}`;

  playButton.addEventListener('click', startGame);

}


function startGame() {
  isAlive = true;

  cleanGame();

  score = 0;
  scoreDisplay.innerHTML = `Score: ${score}`;

  tree.classList.add('tree-animation');
  birdOne.classList.add('bird-animation');
  birdTwo.classList.add('bird-animation');
  barn.classList.add('barn-animation');
  sun.classList.add('sun-animation');
  chicken.src = './sprites/spr_chicken.gif';

  playButton.style.display = 'none';
}

function stopGame(treePosition, chickenPosition, birdOnePosition, birdTwoPosition, barnPosition, sunPosition, fencePosition, fenceTwoPosition) {
  tree.style.left = `${treePosition}px`;
  tree.classList.remove('tree-animation');

  chicken.style.bottom = `${chickenPosition}px`;
  chicken.classList.remove('jump');
  chicken.src = './sprites/spr_death.png';
  isAlive = false;

  birdOne.style.left = `${birdOnePosition}px`;
  birdOne.classList.remove('bird-animation');

  birdTwo.style.left = `${birdTwoPosition}px`;
  birdTwo.classList.remove('bird-animation');

  barn.style.left = `${barnPosition}px`;
  barn.classList.remove('barn-animation');

  sun.style.left = `${sunPosition}px`;
  sun.classList.remove('sun-animation');

  if (score > highScore) {
    highScore = score;

  }
  clearInterval(intervalId)
}

playButton.addEventListener('click', startGame);
playButton.addEventListener('click', () => {

  //validar se o chicken encostou na árvore
  setInterval(() => {
    const treePosition = tree.offsetLeft;
    const chickenPosition = +window.getComputedStyle(chicken).bottom.replace('px', '');
    const birdOnePosition = birdOne.offsetLeft;
    const birdTwoPosition = birdTwo.offsetLeft;
    const barnPosition = barn.offsetLeft;
    const sunPosition = sun.offsetLeft;

    if (treePosition <= 70 && treePosition > 0 && chickenPosition < 61) {
      stopGame(treePosition, chickenPosition, birdOnePosition, birdTwoPosition, barnPosition, sunPosition);

      resetGame();

      clearInterval(intervalId);

    }

  }, 10);

});

// Adiciona o listener de evento para o espaço do teclado
document.addEventListener("keydown", function (event) {

  if (event.code === "Space") {
    if (isAlive) {
      jump();

    }

  }

});

// Adiciona o listener de evento para o toque na tela
document.addEventListener("touchstart", function (event) {
  if (isAlive) {
    jump();

  }

});


window.addEventListener('keydown', function (e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

function redirectToAboutGame() {
  const aboutElement = document.querySelector('.about');

  // Redireciona para a seção "Sobre o Jogo" usando scrollIntoView
  aboutElement.scrollIntoView({
    behavior: 'smooth'
  });
}


