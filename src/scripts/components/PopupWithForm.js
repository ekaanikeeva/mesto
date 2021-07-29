import { Popup } from "../components/Popup.js";


export class PopupWithForm extends Popup {
    constructor ({popupElement, submitCallback}) {
        super (popupElement);

        this._submitCallback = submitCallback;
        this._formElement = popupElement.querySelector('.form')
        
    }

    _getInputValues () {
        this._inputList = this._formElement.querySelectorAll('.form__info')
        this.inputValue = {}
        this._inputList.forEach(inputElement => {
            this.inputValue[inputElement.name] = inputElement.value;
        });
        
        return this.inputValue;
    }

    setEventListeners () {
        super.setEventListeners();

        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            
            this._submitCallback(this._getInputValues ())
        })
    }

    close () {
        super.close();

        this._formElement.reset()
    }

}