// добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__info_type_error')
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
}

// убирает класс с ошибкой
const removeInputError = ((formElement, inputElement) => {
    inputElement.classList.remove('form__input_type_error');
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
})
  
  // проверяет валидность инпута
const inputValidity = (formElement, inputElement) => {

    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } 
    else {
      removeInputError(formElement, inputElement);
    }
}

//возвращает true если валидация инпутов пройдена и falce если нет
const hasInvalidInput = (inputList) => {

    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

// функция для активации кнопки при валидных инпутах
const toggleBtnCondition = (inputList, buttonElement) => {

    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        // сделать неактивной
        buttonElement.classList.add('form__btn-save_inactive');
    } else {
        // иначе - активной
        buttonElement.classList.remove('form__btn-save_inactive');
    }
}

// принимает параметром элемент формы и добавляет её полям нужные обработчики
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__info'));
    const buttonElement = formElement.querySelector('.form__btn-save');

    if (formElement.classList.contains('form_add-card'))
    {
        toggleBtnCondition(inputList, buttonElement);
    }
    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            inputValidity(formElement, inputElement)
            console.log(formElement, inputElement)
            toggleBtnCondition(inputList, buttonElement);
        })
    })
}

// включение валидации всех форм
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        setEventListeners(formElement);
    })
}

enableValidation(); 




  
  