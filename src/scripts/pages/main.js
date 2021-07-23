
import { Card } from "../components/Card.js";
import { FormValidator } from "../utils/FormValidator.js";
import { initialCards } from "../utils/initial-cards.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js"
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../utils/api.js";

import { 
    figures,
    openEditPopupBtn,
    openAddPopupBtn,
    popupEdit,
    popupAdd,
    profileStatus,
    profileName,
    profileAvatar,
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



const api = new Api ({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
    headers: {
      authorization: 'afc7dc1f-babd-4dc3-b15d-b745eab59c3f',
      'Content-Type': 'application/json'
    }
})


//  информация пользователя
const user = new UserInfo (profileName, profileStatus, profileAvatar)

let cardsArray = [];
let cardList = null;

api.getInitialCards()
    .then((result) => {
        console.log(`Информация о пользователе получена с сервера.`);
        // заполняем массив полученными с сервера карточками
        cardsArray = result.map((item) => {
            return item;
        })

        return cardsArray
        
    })
    // // добавление фотокарточек на страницу
    .finally(() => {
        
        cardList = new Section (
            {
                items: cardsArray,
                renderer: (item) => {
                    const name = item.name;
                    const link = item.link;
        
                    cardList.addItem(createCard(name, link))
                }
        
            }, figures)
        
        cardList.renderItems();

    })

api.getUserInfo()
.then((res) => {
    console.log(res)
    const name= res.name;
    const status = res.about;
    const avatar = res.avatar;
    const userId = res._id
    user.setUserInfo({name, status});
    user.setUserAvatar(avatar);
    user.setUserId(userId);
})





// попап открытия фото
const photoCardPopup = new PopupWithImage (popupImg)


// сохранение изменения данных пользователя
const popupFormEdit = new PopupWithForm ({
    popupElement: popupEdit,
    submitCallback: () => {
        api.setUserInform(popupFormEdit._getInputValues())
        .then((res) => {
            console.log(res)
            let name = res.name
            let status = res.about
            user.setUserInfo({name, status});
        })
        
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
        
        api.addCard(item)
        .then(res => {console.log(res)
            let name = res.name;
            let link = res.link;

            cardList.addItem(createCard(name, link))}
        )
        
        

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
// const cardList = new Section (
//     {
//         items: initialCards,
//         renderer: (item) => {
//             const name = item.name;
//             const link = item.link;

//             cardList.addItem(createCard(name, link))
//         }

//     }, figures)

// cardList.renderItems();


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


