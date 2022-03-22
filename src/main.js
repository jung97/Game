'use strict';
import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js'; 


const GameBtn = document.querySelector('.Game__button');
const GameTimer = document.querySelector('.Game__timer');
const GameScore = document.querySelector('.Game__score');


const Carrot__count = 6;
const Bug__count = 6;
const Game_Duration_SEC = 5;

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener( ()=> {
    startGame();
});

const GameField = new Field(Carrot__count, Bug__count);
GameField.setClickListener(onItemClick);

function onItemClick(item) {
    if (!started) {
        return;
    }
    if(item === 'carrot') {
    score++;
    updateScoreBoard();
    if(score === Carrot__count) {
        finishGame(true);
    }
    } else if (item ==='bug') {
    finishGame(false);
    } 
}
GameBtn.addEventListener('click', () => {
    if (started) {
    stopGame();
    } else {
    startGame();
    }
}); 

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScroe();
    startGameTimer();
    sound.playBackground();
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    gameFinishBanner.showWithText('Replay😎');
    sound.playAlert();
    sound.stopBackground();
}

function finishGame(win) {
    started = false;
    hideGameButton();
    if(win) {
        sound.playWin();
    } else {
        sound.playBug();
    }
    stopGameTimer();
    stopSound(bgSound);
    gameFinishBanner.showWithText(win? 'YOU WON😍' : 'YOU LOST👿');
}

function stopGameTimer() {
    clearInterval(timer);
}

function startGameTimer() {
    let remainingTimeSec = Game_Duration_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(()=>{
        if(remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(Carrot__count === score);
            return;
        }
        updateTimerText(--remainingTimeSec);
    },1000);
}

function updateTimerText(time) {
    const minutes = Math.floor(time/ 60);
    const seconds = time % 60;
    GameTimer.innerHTML = `${minutes}:${seconds}`;
}

function showStopButton() {
    const icon = GameBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    GameBtn.style.visibility = 'visible';
}

function hideGameButton() {
    GameBtn.style.visibility = 'hidden';
}

function showTimerAndScroe() {
    GameTimer.style.visibility = 'visible';
    GameScore.style.visibility = 'visible';
}

function initGame() {
    score = 0;
    GameScore.innerText = Carrot__count;
    GameField.init();
}

function updateScoreBoard() {
    GameScore.innerText = Carrot__count - score;    
}


