'use strict';

//selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const name0 = document.querySelector('#name--0');
const name1 = document.querySelector('#name--1');

const modal = document.querySelector('.modal');
let finalScore = [],
  currentScore,
  activePlayer,
  playing;
const initialization = function () {
  //starting conditions
  finalScore = [0, 0];
  currentScore = 0;
  //0 if active player = 0, 1 if active player = 1
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  dice.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  name0.textContent = 'Player 1';
  name1.textContent = 'player 2';
};

initialization();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generate random dice no
    let diceNo = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNo);

    //2.Display dice
    dice.classList.remove('hidden');
    dice.src = `dice-${diceNo}.png`;

    //3.check for rolled
    if (diceNo !== 1) {
      //Add dice to current score
      currentScore += diceNo;
      //Display Score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

//Hold
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.add current score to acrive players score

    finalScore[activePlayer] += currentScore;
    //finalScore[1] = finalScore[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      finalScore[activePlayer];
    //2. check score is atleast 100
    if (finalScore[activePlayer] >= 20) {
      // if true finish game
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.querySelector(`#name--${activePlayer}`).textContent = `player ${
        activePlayer + 1
      } wins`;
    } else {
      //else switch player
      switchPlayer();
    }
  }
});

//New Game
btnNew.addEventListener('click', initialization);

wrapper.addEventListener('click', () => {
  wrapper.classList.add('hidden');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    wrapper.classList.add('hidden');
  }
});
