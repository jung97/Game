'use strict';

const field = document.querySelector('.Game__field');
const fieldRect = field.getBoundingClientRect();
const GameBtn = document.querySelector('.Game__button');
const GameTimer = document.querySelector('.Game__timer');
const GameScore = document.querySelector('.Game__score');

const popup = document.querySelector('.pop-up');
const popuptext = document.querySelector('.pop-up__message');
const popuprefresh = document.querySelector('.pop-up__refresh');

const Carrot__Size = 80;
const Carrot__count = 6;
const Bug__count = 6;
const Game_Duration_SEC = 5;

let started = false;
let score = 0;
let timer = undefined;

GameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
}); 

function startGame() {
    initGame();
    showStopButton();
    showTimerAndScroe();
    startGameTimer();
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


function stopGame() {
    stopGameTimer();
    hideGameButton();
    showPopupWithText('Replay😎');
}

function showStopButton() {
    const icon = GameBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function hideGameButton() {
    GameBtn.style.visibility = 'hidden';
}

function showTimerAndScroe() {
    GameTimer.style.visibility = 'visible';
    GameScore.style.visibility = 'visible';
}

function showPopupWithText(text) {
    popuptext.innerText = text;
    popup.classList.remove('pop-up--hide');
}

function initGame() {
    field.innerHTML = '';
    GameScore.innerText = Carrot__count;
    // 벌레와 당근 생성 후 필드에 추가  
    additem('carrot', Carrot__count, 'img/carrot.png');
    additem('bug', Bug__count, 'img/bug.png');
}

function additem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - Carrot__Size;
    const y2 = fieldRect.height - Carrot__Size;
    for (let i = 0 ; i < count ; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}