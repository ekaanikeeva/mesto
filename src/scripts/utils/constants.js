export const popups = document.querySelector('.popups');
export const profile = document.querySelector('.profile');
export const popupList = Array.from(popups.querySelectorAll('.popup'))
export const figures = document.querySelector('.figures');
export const openEditPopupBtn = profile.querySelector('.profile__edit-btn');
export const popupEdit = document.querySelector('.popup_type_edit');
export const openAddPopupBtn = profile.querySelector('.profile__add-btn');
export const popupAdd = document.querySelector('.popup_type_add-card');
export const popupImg = document.querySelector('.popup_type_photo');
export const closePopupButtons = Array.from(popups.querySelectorAll('.popup__btn-close'));
export const savePopupBtn = popupAdd.querySelector('.form__btn-save');

export const popupImgPicture = popups.querySelector('.popup__img');
export const popupImgName = popups.querySelector('.popup__name');
export const profileName = document.querySelector('.profile__name');
export const profileStatus = document.querySelector('.profile__status');
export const templateCard = document.querySelector('#photo-card')

// поиск форм и инпутов форм через "name"
export const formEdit = document.forms.edit;
export const formAdd = document.forms.add;
export const popupName = formEdit.elements.name;
export const popupStatus = formEdit.elements.status;
export const popupSaveName = formAdd.elements.title;
export const popupSaveLink = formAdd.elements.link;

export const validationElement = {
    formSelector: '.form',
    inputSelector: '.form__info',
    buttonSelector: '.form__btn-save',
    inactiveButtonClass: 'form__btn-save_inactive',
    inputErrorClass: 'form__info_type_error',
    errorClass: '.form__input-error_active'
}