
export class FormValidator {
    constructor (formElement, validationElement) {
        this._formElement = formElement;
        this._formSelector = validationElement.formSelector;
        this._inputSelector = validationElement.inputSelector;
        this._buttonElement = validationElement.buttonSelector;
        this._buttonElementInactiveClass = validationElement.inactiveButtonClass
        this._inputErrorClass = validationElement.inputErrorClass;
        this._errorClass = validationElement.errorClass;

    }

    // добавляет класс с ошибкой
    _showInputError (inputElement, errorMessage) {
        
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass)
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    // убирает класс с ошибкой
    _removeInputError (inputElement) {
    
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass)
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
    }
    

    
    // проверяет валидность инпута
    _inputValidity (inputElement) {
         
        if (!inputElement.validity.valid) {
            
            this._showInputError (inputElement, inputElement.validationMessage);
        } else {
            this._removeInputError(inputElement);
        }
    }

    
    // возвращает true если валидация инпутов пройдена и false если нет
    _hasInvalidInput (inputList) {

        return inputList.some((inputElement) => {
        return !inputElement.validity.valid;

    }) 
}

    // функция для активации кнопки при валидных инпутах
    _toggleBtnCondition (inputList, buttonElement) {
        
        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput(inputList)) {
            // сделать неактивной
            buttonElement.classList.add(this._buttonElementInactiveClass);
            buttonElement.disabled = true;
        } else {
            // иначе - активной
            buttonElement.classList.remove(this._buttonElementInactiveClass);
            buttonElement.disabled = false;
        }
    }

    // принудительное отключение кнопки после добавления карточки на страницу
    inactiveButton(buttonElement) {
        buttonElement.classList.add(this._buttonElementInactiveClass);
        buttonElement.disabled = true;
    }

    // добавляет инпутам и кнопке формы нужные обработчики валидации
    _setEventListeners () {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._buttonElement);
        this._toggleBtnCondition(inputList, buttonElement);
        
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {

                this._inputValidity(inputElement)
                this._toggleBtnCondition(inputList, buttonElement);
            })
        })

        
        this._formElement.addEventListener('reset', () => {
            this.inactiveButton(buttonElement)
            
            inputList.forEach((inputElement) => {
                this._removeInputError(inputElement)  
            })
        });
            
    }

    // включение валидации всех форм
    enableValidation ()  {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        
        this._setEventListeners();
    }
}