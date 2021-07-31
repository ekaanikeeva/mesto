import { Popup } from "../components/Popup.js";

export class PopupWithDelete extends Popup {
    constructor (popupElement) {
        super (popupElement);
        

        this._formElement = popupElement.querySelector('.form')
        this.setSubmit = this.setSubmit.bind(this)
        this._handleSubmitCallback = this.setSubmit
    }

    setSubmit(callback) {
        return this._handleSubmitCallback = callback
    }

    setEventListeners (id) {
        super.setEventListeners();

        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault(); 
            this._handleSubmitCallback(id)
        })
    }
}