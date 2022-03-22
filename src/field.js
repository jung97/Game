'use strict';

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const Carrot__Size = 80;


export default class field {
    constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount; 
    this.field = document.querySelector('.Game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);
    }
    
    init() {
        field.innerHTML = '';
    this._additem('carrot', this.carrotCount, 'img/carrot.png');
    this._additem('bug', this.bugCount, 'img/bug.png');
    }

    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }

    _additem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - Carrot__Size;
        const y2 = this.fieldRect.height - Carrot__Size;
        for (let i = 0 ; i < count ; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }
    

    onClick(event) {
        const target = event.target;
        if  (target.matches('.carrot')) {
            target.remove();
            playsound(carrotSound);
            this.onItemClick && this.onItemClick('carrot');
        }   else if (target.matches('.bug')) {
            this.onItemClick && this.onItemClick('bug');
        } 
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function playsound(sound) {
    sound.currentTime = 0;
    sound.play();
}
