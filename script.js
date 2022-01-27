'use strict';

//array for all the dices

const dices = [
  'dice-1.png',
  'dice-2.png',
  'dice-3.png',
  'dice-4.png',
  'dice-5.png',
  'dice-6.png',
];

//selectors
const playerOne = document.getElementById('first-player');
const playerTwo = document.getElementById('second-player');
const playerOneScore = document.getElementById('score--0');
const playerTwoScore = document.getElementById('score--1');
const firstCurrentScore = document.getElementById('current--0');
const secondCurrentScore = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const diceRoll = document.querySelector('.btn--roll');
const HoldGame = document.querySelector('.btn--hold');
const players = document.querySelectorAll('.player');
const playerName = document.querySelector('.name');
const winMsg = document.querySelector('.message');
const msgHead = document.querySelector('.text');
let playerOneText = document.querySelector('#name--1');
// functions for all

/* generatng random dice*/

const randomDice = function () {
  const randomValue = Math.floor(Math.random() * 6);

  dice.src = dices[randomValue];
  let activePlayer = null;
  let inactivePlayer = null;

  //defining active player
  players.forEach(player => {
    if (player.classList.contains('player--active')) {
      activePlayer = player;
    } else if (!player.classList.contains('player--active')) {
      inactivePlayer = player;
    }
  });

  // increment current score function

  const incrementCurrentScore = function (number) {
    let x = Number(activePlayer.querySelector('.current-score').textContent);
    x += number;
    activePlayer.querySelector('.current-score').textContent = x;
  };
  //check which dice and increment
  if (dice.src.indexOf('dice-2.png') != -1) {
    incrementCurrentScore(2);
  } else if (dice.src.indexOf('dice-3.png') != -1) {
    incrementCurrentScore(3);
  } else if (dice.src.indexOf('dice-4.png') != -1) {
    incrementCurrentScore(4);
  } else if (dice.src.indexOf('dice-5.png') != -1) {
    incrementCurrentScore(5);
  } else if (dice.src.indexOf('dice-6.png') != -1) {
    incrementCurrentScore(6);
  } else if (dice.src.includes('dice-1.png') != -1) {
    activePlayer.classList.remove('player--active');
    inactivePlayer.classList.add('player--active');
    activePlayer.querySelector('.current-score').textContent = 0;
  }
  let check = document.querySelector('.player-won') || false;
  if (check) {
    document.querySelector('.player-won').remove();
  }
  playerName.style.margin = '0 0 1rem 0';
  playerName.style.transition = 'all 0.5s ease';
  playerOneText.style.margin = '0 0 1rem 0';
};

//function for hold button

const playerHold = function () {
  let currentPlayer = null;
  let unActive = null;
  players.forEach(player => {
    if (player.classList.contains('player--active')) {
      currentPlayer = player;
    } else if (!player.classList.contains('player--active')) {
      unActive = player;
    }
  });
  let unActiveCurrentScore = unActive.querySelector('.current-score');
  let unActiveTScore = unActive.querySelector('.score');
  let currentScore = currentPlayer.querySelector('.current-score');
  let totalScore = currentPlayer.querySelector('.score');
  let scoreTotalAdd =
    Number(currentScore.textContent) + Number(totalScore.textContent);
  totalScore.textContent = scoreTotalAdd;
  currentScore.textContent = 0;
  if (Number(totalScore.textContent) >= 100) {
    let currentName = currentPlayer.querySelector('.name').textContent;
    /////////
    let playerWinName = currentPlayer.querySelector('.name');
    let winPlayer = currentPlayer.querySelector('.text');
    let winplayerMsg = document.createElement('span');
    winPlayer.appendChild(winplayerMsg);
    winplayerMsg.textContent = `Won`;
    winplayerMsg.classList.add('player-won');

    setTimeout(() => {
      winplayerMsg.classList.add('come-smooth');
      playerWinName.style.margin = '0 60px 0 0';
      playerWinName.style.transition = 'all 0.5s ease';
    }, 100);
    ////////

    ///win count
    let wincount = Number(
      currentPlayer.querySelector('.win-count').textContent
    );

    wincount += 1;

    currentPlayer.querySelector('.win-count').textContent = wincount;

    ///////

    currentScore.textContent = 0;
    totalScore.textContent = 0;
    unActiveCurrentScore.textContent = 0;
    unActiveTScore.textContent = 0;
  } else {
    currentPlayer.classList.remove('player--active');

    unActive.classList.add('player--active');
  }
};

/// function for restart the gaim
let reStartGame = function () {
  let check = document.querySelector('.player-won') || false;
  if (check) {
    document.querySelector('.player-won').remove();
  }
  playerName.style.margin = '0 0 1rem 0';
  playerName.style.transition = 'all 0.5s ease';
  playerOneText.style.margin = '0 0 1rem 0';
  let scoreNodeList = document.querySelectorAll('.score');
  let currentNodeList = document.querySelectorAll('.current-score');
  scoreNodeList.forEach(elem => {
    elem.textContent = 0;
  });
  currentNodeList.forEach(elem => {
    elem.textContent = 0;
  });
};
/////////

//event listeners

diceRoll.addEventListener('click', randomDice);
HoldGame.addEventListener('click', playerHold);
newGame.addEventListener('click', reStartGame);
