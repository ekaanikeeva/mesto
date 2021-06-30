
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initial-cards.js";


const popups = document.querySelector('.popups');
const profile = document.querySelector('.profile');
const popupList = Array.from(popups.querySelectorAll('.popup'))
const figures = document.querySelector('.figures');
const openEditPopupBtn = profile.querySelector('.profile__edit-btn');
const popupEdit = document.querySelector('.popup_type_edit');
const openAddPopupBtn = profile.querySelector('.profile__add-btn');
const popupAdd = document.querySelector('.popup_type_add-card');
export const popupImg = document.querySelector('.popup_type_photo');
const closePopupButtons = Array.from(popups.querySelectorAll('.popup__btn-close'));

export const popupImgPicture = popups.querySelector('.popup__img');
export const popupImgName = popups.querySelector('.popup__name');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

// поиск форм и инпутов форм через "name"
const formEdit = document.forms.edit;
const formAdd = document.forms.add;
const popupName = formEdit.elements.name;
const popupStatus = formEdit.elements.status;
const popupSaveName = formAdd.elements.title;
const popupSaveLink = formAdd.elements.link;

const validationElement = {
    formSelector: '.form',
    inputSelector: '.form__info',
    buttonSelector: '.form__btn-save',
    inactiveButtonClass: 'form__btn-save_inactive',
    inputErrorClass: 'form__info_type_error',
    errorClass: '.form__input-error_active'
}

const editFormValidator = new FormValidator (formEdit, validationElement);
const addFormValidator = new FormValidator (formAdd, validationElement);
editFormValidator.enableValidation();
addFormValidator.enableValidation();



// добавление фотокарточек на страницу
initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, '#photo-card');
    const photo = card.createPhotoCard();
    figures.append(photo);
})

// открытие попап
export function activePopup (popup) { 
    popup.classList.add('popup_opened');

    document.addEventListener('keydown', closePopupKey)
}

// закрытие попап
function closePopup (popup) {
    popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', closePopupKey)
}

// параметры, передаваемые при открытии попапа редактирования
function openEditPopupForm () {
    popupName.value = profileName.textContent;
    popupStatus.value = profileStatus.textContent;
}

// сохранение изменений попапа редактирования
function saveEditPopupChanges (submit) {
    submit.preventDefault();

    profileName.textContent = popupName.value;
    profileStatus.textContent = popupStatus.value;

    closePopup(popupEdit);
}

// сохранение изменений попапа добавления
function saveAddPopupChanges (submit) {
    submit.preventDefault();

    const cardAdd = new Card (popupSaveName.value, popupSaveLink.value, '#photo-card');
    const photo = cardAdd.createPhotoCard();
    figures.prepend(photo);

    popupSaveName.value = ""; 
    popupSaveLink.value = ""; 
 
    const savePopupBtn = popupAdd.querySelector('.form__btn-save');
    savePopupBtn.classList.add('form__btn-save_inactive');
    savePopupBtn.disabled = true;
    closePopup(popupAdd);
}

// закрытие попапа при нажатии Esc
function closePopupKey (evt) {
    if (evt.key == "Escape") {
        const popupOpened = popups.querySelector('.popup_opened')
        closePopup(popupOpened)
    }
}

// ищет ближайший попап и закрывает его
function findAndClosePopup (evt) {
    const namePopup = evt.target.closest(".popup");
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__btn-close')) {
        closePopup(namePopup);
      }
}

openEditPopupBtn.addEventListener('click', () => {
    editFormValidator.enableValidation()
    openEditPopupForm();
    activePopup(popupEdit);
});

openAddPopupBtn.addEventListener('click', () => {
    activePopup(popupAdd);
 });

formEdit.addEventListener('submit', saveEditPopupChanges)

formAdd.addEventListener('submit', saveAddPopupChanges)

closePopupButtons.forEach((element) => {
    element.addEventListener('click', findAndClosePopup)
})

popupList.forEach((element) => {
    element.addEventListener('mousedown', findAndClosePopup)
})
