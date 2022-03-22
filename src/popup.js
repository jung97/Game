'use strict';

export default class PopUp {
    constructor() {
        this.popup = document.querySelector('.pop-up');
        this.popuptext = document.querySelector('.pop-up__message');
        this.popuprefresh = document.querySelector('.pop-up__refresh');
        this.popuprefresh.addEventListener('click', ()=> {
            this.onClick && this.onClick();
            this.hide();

        });
    }


    setClickListener(onClick) {
        this.onClick = onClick;
    }

    showWithText(text) {
        this.popuptext.innerText = text;
        this.popup.classList.remove('pop-up--hide');
    }


    hide() {
        this.popup.classList.add('pop-up--hide');
    }
}
