
import { Card } from "../components/Card.js";
import { FormValidator } from "../utils/FormValidator.js";
import { initialCards } from "../utils/initial-cards.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js"
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import { 
    figures,
    openEditPopupBtn,
    openAddPopupBtn,
    popupEdit,
    popupAdd,
    profileStatus,
    profileName,
    formEdit,
    formAdd,
    popupName,
    popupStatus,
    validationElement,
    popupImg
} from "../utils/constants.js"

import "../../pages/index.css"

// включение валидации форм
const editFormValidator = new FormValidator (formEdit, validationElement);
const addFormValidator = new FormValidator (formAdd, validationElement);
editFormValidator.enableValidation();
addFormValidator.enableValidation();


// попап открытия фото
const photoCardPopup = new PopupWithImage (popupImg)

//  информация пользователя
const user = new UserInfo (profileName, profileStatus)

// сохранение изменения данных пользователя
const popupFormEdit = new PopupWithForm ({
    popupSelector: popupEdit,
    submitCallback: () => {

        user.setUserInfo(popupFormEdit._getInputValues());
        popupFormEdit.closePopup();
    } 

})

// сохранение добавленной из попапа картинки на страницу
const popupFormAdd = new PopupWithForm ({
    popupSelector: popupAdd,
    submitCallback: (item) => {
        const title = item.title;
        const link = item.link;

        const cardAdd = new Card (title, link, '#photo-card', () => {
            photoCardPopup.activePopup({name: title, link: link})
        });
        const photo = cardAdd.createPhotoCard();
        figures.prepend(photo);

        popupFormAdd.closePopup();

        // принудительное отключение кнопки при создании карточки
        const savePopupBtn = popupAdd.querySelector('.form__btn-save');
        savePopupBtn.classList.add('form__btn-save_inactive');
        savePopupBtn.disabled = true;
    }
})

// включение слушателей попапов
popupFormAdd.setEventListeners();
photoCardPopup.setEventListeners();
popupFormEdit.setEventListeners()

// добавление фотокарточек на страницу
const addCards = new Section (
    {
        items: initialCards,
        renderer: (item) => {
            const name = item.name;
            const link = item.link;

            const card = new Card (name, link, '#photo-card', () => {
                photoCardPopup.activePopup({name: name, link: link})
            }  )
            const photo = card.createPhotoCard()

            addCards.addItem(photo)
        }

    }, figures)

addCards.renderItems();


// слушатель кнопки "edit"
openEditPopupBtn.addEventListener('click', () => {
    editFormValidator.enableValidation()

    popupFormEdit.activePopup()
    popupName.value = user.getUserInfo().name;
    popupStatus.value = user.getUserInfo().status;
});

// слушатель кнопки "add"
openAddPopupBtn.addEventListener('click', () => {
    popupFormAdd.activePopup();
 });


