import { Popup } from "../components/Popup.js";

export class PopupWithDelete extends Popup {
    constructor ({popupElement, submitCallback}) {
        super (popupElement);

        this.submitCallback = submitCallback;

        this._formElement = popupElement.querySelector('.form')
    }


    setEventListeners (id) {
        super.setEventListeners();

        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.submitCallback(id)

        })
    }
}