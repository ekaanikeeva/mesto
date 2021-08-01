import { Popup } from "../components/Popup.js";

export class PopupWithDelete extends Popup {
    constructor (popupElement) {
        super (popupElement);
        
        this.buttonSubmit = popupElement.querySelector('.form__btn-save')
        this._formElement = popupElement.querySelector('.form')
        this.setSubmit = this.setSubmit.bind(this)
        this._handleSubmitCallback = this.setSubmit
    }

    open (id) {
        super.open()

        this._id = id;
    }

    setSubmit(callback) {
        return this._handleSubmitCallback = callback
    }

    setEventListeners () {
        super.setEventListeners();

        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault(); 
            this._handleSubmitCallback(this._id)
        })
    }
}