
export class Popup {
    constructor (popupElement) {
        this._popupElement = popupElement;
        this._handleEscClose = this._handleEscClose.bind(this)
    }


    // открытие попапа
    open () {
        this._popupElement.classList.add('popup_opened');

        document.addEventListener('keydown', this._handleEscClose) 
    }

    // закрытие попапа
    close () {
        this._popupElement.classList.remove('popup_opened');

        document.removeEventListener('keydown', this._handleEscClose)
    }

    // закрытие по Escape
    _handleEscClose (evt) {
        if (evt.key === "Escape") {
            console.log('escape')
            this.close()
        } else console.log("слушатель не снялся")
    }

    setEventListeners () {
        this._popupElement.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__btn-close')) {
                this.close()
                
            }            
        })
    }
}