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

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click',onFieldClick);
GameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
}); 

popuprefresh.addEventListener('click', ()=> {
    startGame();
    hidePopup();
})

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScroe();
    startGameTimer();
    playsound(bgSound);
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    showPopupWithText('Replay😎');
    playsound(alertSound);
    stopSound(bgSound);
}

function playsound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}

function finishGame(win) {
    started = false;
    hideGameButton();
    if(win) {
        playsound(winSound);
    } else {
        playsound(bugSound);
    }
    stopGameTimer();
    stopSound(bgSound);
    showPopupWithText(win? 'YOU WON😍' : 'YOU LOST👿');
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

function showPopupWithText(text) {
    popuptext.innerText = text;
    popup.classList.remove('pop-up--hide');
}

function hidePopup() {
    popup.classList.add('pop-up--hide');
}

function initGame() {
    score = 0;
    field.innerHTML = '';
    GameScore.innerText = Carrot__count;
    // 벌레와 당근 생성 후 필드에 추가  
    additem('carrot', Carrot__count, 'img/carrot.png');
    additem('bug', Bug__count, 'img/bug.png');
}

function onFieldClick(event) {
    if (!started) {
        return;
    }
    const target = event.target;
    if(target.matches('.carrot')) {
    // 당근!!
    target.remove();
    score++;
    playsound(carrotSound);
    updateScoreBoard();
    if(score === Carrot__count) {
        finishGame(true);
    }
    } else if (target.matches('.bug')) {
    finishGame(false);
    } 
}

function updateScoreBoard() {
    GameScore.innerText = Carrot__count - score;    
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