const field = document.querySelector('.Game__field');
const fieldRect = field.getBoundingClientRect();
const Carrot__Size = 80;

function initGame() {
    // 벌레와 당근 생성 후 필드에 추가
    console.log(fieldRect);
    additem('carrot', 6, 'img/carrot.png');
    additem('bug', 6, 'img/bug.png');
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

initGame();
