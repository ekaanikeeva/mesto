
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
    popupImg,
    templateCard,
    savePopupBtn
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
    popupElement: popupEdit,
    submitCallback: () => {

        user.setUserInfo(popupFormEdit._getInputValues());
        popupFormEdit.close();
    } 

})

// функция создания карточки
const createCard = (name, link) => {
    const card = new Card (name, link, `#${templateCard.id}`, () => {
        photoCardPopup.open({name: name, link: link})
    } )
    const photo = card.createPhotoCard();
    return photo;

}

// сохранение добавленной из попапа картинки на страницу
const popupFormAdd = new PopupWithForm ({
    popupElement: popupAdd,
    submitCallback: (item) => {
        const title = item.title;
        const link = item.link;

        cardList.addItem(createCard(title,link))

        popupFormAdd.close();

        // принудительное отключение кнопки при создании карточки
        addFormValidator.inactiveButton(savePopupBtn)

    }
})

// включение слушателей попапов
popupFormAdd.setEventListeners();
photoCardPopup.setEventListeners();
popupFormEdit.setEventListeners()


// добавление фотокарточек на страницу
const cardList = new Section (
    {
        items: initialCards,
        renderer: (item) => {
            const name = item.name;
            const link = item.link;

            cardList.addItem(createCard(name, link))
        }

    }, figures)

cardList.renderItems();


// слушатель кнопки "edit"
openEditPopupBtn.addEventListener('click', () => {
    editFormValidator.enableValidation()

    popupFormEdit.open()
    popupName.value = user.getUserInfo().name;
    popupStatus.value = user.getUserInfo().status;
});

// слушатель кнопки "add"
openAddPopupBtn.addEventListener('click', () => {
    popupFormAdd.open();
 });


