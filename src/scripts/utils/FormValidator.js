
export class FormValidator {
    constructor (formElement, validationElement) {
        this.formElement = formElement;
        this.formSelector = validationElement.formSelector;
        this.inputSelector = validationElement.inputSelector;
        this.buttonElement = validationElement.buttonSelector;
        this.buttonElementInactiveClass = validationElement.inactiveButtonClass
        this.inputErrorClass = validationElement.inputErrorClass;
        this.errorClass = validationElement.errorClass;

    }

    // добавляет класс с ошибкой
    __showInputError (inputElement, errorMessage) {
        
        const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.inputErrorClass)
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.errorClass);
    }

    // убирает класс с ошибкой
    __removeInputError (inputElement) {
    
        const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.inputErrorClass)
        errorElement.textContent = '';
        errorElement.classList.remove(this.errorClass);
    }
    

    
    // проверяет валидность инпута
    __inputValidity (inputElement) {
         
        if (!inputElement.validity.valid) {
            
            this.__showInputError (inputElement, inputElement.validationMessage);
        } else {
            this.__removeInputError(inputElement);
        }
    }

    
    // возвращает true если валидация инпутов пройдена и false если нет
    __hasInvalidInput (inputList) {

        return inputList.some((inputElement) => {
        return !inputElement.validity.valid;

    }) 
}

    // функция для активации кнопки при валидных инпутах
    __toggleBtnCondition (inputList, buttonElement) {
        
        // Если есть хотя бы один невалидный инпут
        if (this.__hasInvalidInput(inputList)) {
            // сделать неактивной
            buttonElement.classList.add(this.buttonElementInactiveClass);
            buttonElement.disabled = true;
        } else {
            // иначе - активной
            buttonElement.classList.remove(this.buttonElementInactiveClass);
            buttonElement.disabled = false;
        }
    }

    // принудительное отключение кнопки после добавления карточки на страницу
    inactiveButton(buttonElement) {
        buttonElement.classList.add(this.buttonElementInactiveClass);
        buttonElement.disabled = true;
    }

    // добавляет инпутам и кнопке формы нужные обработчики валидации
    __setEventListeners () {
        const inputList = Array.from(this.formElement.querySelectorAll(this.inputSelector));
        const buttonElement = this.formElement.querySelector(this.buttonElement);

        if (this.formElement.classList.contains('form_add-card'))
        {
            this.__toggleBtnCondition(inputList, buttonElement);
        }
        
        
        inputList.forEach((inputElement) => {
            if(this.formElement.classList.contains('form_edit'))
            {
                this.__removeInputError (inputElement);
                buttonElement.classList.remove(this.buttonElementInactiveClass);
                buttonElement.disabled = false;
            }
            
            inputElement.addEventListener('input', () => {

                this.__inputValidity(inputElement)
                this.__toggleBtnCondition(inputList, buttonElement);
            })
        })
    }

    // включение валидации всех форм
    enableValidation ()  {
        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        
        this.__setEventListeners();
    }
}