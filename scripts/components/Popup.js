export class Popup {
    constructor (popupSelector) {
        this._popupSelector = popupSelector;
    }

    // открытие попапа
    activePopup () {
        this._popupSelector.classList.add('popup_opened');

        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt)
        }) 
    }

    // закрытие попапа
    closePopup () {
        this._popupSelector.classList.remove('popup_opened');

        document.removeEventListener('keydown', (evt) => {
            this._handleEscClose(evt)
        })
    }

    // закрытие по Escape
    _handleEscClose (evt) {
        if (evt.key == "Escape") {
            this.closePopup()
        }
    }

    setEventListeners () {
        this._popupSelector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__btn-close')) {
                this.closePopup()
                
            }            
        })
    }
}