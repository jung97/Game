const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

export function playCarrot() {
    playsound(carrotSound);
}

export function playBug() {
    playsound(bugSound);
}

export function playAlert() {
    playsound(alertSound);
}

export function playWin() {
    playsound(winSound);
}

export function playBackground() {
    playsound(bgSound);
}

export function stopBackground() {
    stopSound(bgSound);
}


function playsound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}