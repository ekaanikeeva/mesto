import { Popup } from "../components/Popup.js";


export class PopupWithForm extends Popup {
    constructor ({popupElement, submitCallback}) {
        super (popupElement);

        this.buttonSubmit = popupElement.querySelector('.form__btn-save')
        this._submitCallback = submitCallback;
        this._formElement = popupElement.querySelector('.form')
        this.buttonSubmitChangeText = this.buttonSubmitChangeText.bind(this)
        
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

    buttonSubmitChangeText () {
        console.log(this._buttonSubmit)
        this._buttonSubmit.textcontent = "Сохранение..."
    }


    close () {
        super.close();
        this._formElement.reset()
    }

}