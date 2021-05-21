let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');
let form = document.querySelector('.form');
let openPopupBtn = profile.querySelector('.profile__edit-btn');
let savePopupBtn = form.querySelector('.form__btn-save');
let closePopupBtn = popup.querySelector('.popup__btn-close');

let profileName = document.getElementById('profile__name');
let popupName = document.getElementById('popup__name');
let profileStatus = document.getElementById('profile__status');
let popupStatus = document.getElementById('popup__status');
    

//открытие попап и отправка данных из профиля в форму
function activePopup () {
    popupName.value = profileName.textContent;
    popupStatus.value = profileStatus.textContent;
    popup.classList.add('popup_opened');
}


//закрытие попап
function closePopupForm () {
    popup.classList.remove('popup_opened');
}

//сохраняет изменения popup
function savePopupChanges (submit) {
    submit.preventDefault();
    profileName.textContent = popupName.value;
    profileStatus.textContent = popupStatus.value;
    closePopupForm();
}


openPopupBtn.addEventListener('click', activePopup);
closePopupBtn.addEventListener('click', closePopupForm);
form.addEventListener('submit', savePopupChanges);