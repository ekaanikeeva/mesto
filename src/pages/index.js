
import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { initialCards } from "../scripts/utils/initial-cards.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js"
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { Api } from "../scripts/components/Api.js";

import { 
    figures,
    openEditPopupBtn,
    openAddPopupBtn,
    popupEdit,
    popupAdd,
    popupDelete,
    popupChangeAvatar,
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
    savePopupBtn,
    formAvatar,
    changeAvatarBtn
} from "../scripts/utils/constants.js"

import "../pages/index.css"
import { PopupWithDelete } from "../scripts/components/PopupWithDelete.js";



// включение валидации форм
const editFormValidator = new FormValidator (formEdit, validationElement);
const addFormValidator = new FormValidator (formAdd, validationElement);
const changeAvatarFormValidator = new FormValidator (formAvatar, validationElement);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
changeAvatarFormValidator.enableValidation();



const api = new Api ({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
    headers: {
      authorization: 'afc7dc1f-babd-4dc3-b15d-b745eab59c3f',
      'Content-Type': 'application/json'
    }
})


    

// setDeleteListeners

// функция создания карточки
const createCard = (name, link, owner, id, likes, userId) => {

    const card = new Card ({name, link, id, likes, owner}, userId, `#${templateCard.id}`, 
    // открытие попапа с картинкой
    () => {
        photoCardPopup.open({name: name, link: link})
    },

    // лайк 
    (state) => { 

    if (state == true) {
        api.deleteLike(id)
        .then((data) => {

            return card.setLike(data.likes)
            
        }) 
    } else if (state == false) {
        api.postLike(id)
        .then((data) => {

            return card.setLike(data.likes)
    })
    
    } else console.log('проблема с лайком') 
    
},
    // удаление карточки
    (id) => {
        
        popupFormDelete.open()
        popupFormDelete.setEventListeners(id)    

        popupFormDelete.setSubmit(() => {
                api.deleteCard(id)
                .then(() => {               
                card._deletePhotoElement();     
            })

            
            savePopupBtn.textContent = 'Сохранение...'
            popupFormDelete.close()
    })
})
    
    const photo = card.createPhotoCard(userId);
    return photo;

}

const popupFormDelete = new PopupWithDelete (popupDelete)


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
    .then(() => {
        
        cardList = new Section (
            {
                items: cardsArray,
                renderer: (item) => {
                    const name = item.name;
                    const link = item.link;
                    const id = item._id;
                    const likes = item.likes;
                    const owner = item.owner;
                    const userId = user.id;
                    cardList.addItem(createCard(name, link, owner, id, likes, userId))

                }
                
            }, figures)
        console.log(cardsArray)
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
            let name = res.name
            let status = res.about
            user.setUserInfo({name, status});
        })
        savePopupBtn.textContent = 'Сохранение...'
        popupFormEdit.close();
    } 

})


const popupFormChangeAvatar = new PopupWithForm ({
    popupElement: popupChangeAvatar,
    submitCallback: () => {

        const avatarLink = popupFormChangeAvatar._getInputValues()

        api.changeAvatar(avatarLink.link)
        .then(() => {
            user.setUserAvatar(avatarLink.link)
        })
        savePopupBtn.textContent = 'Сохранение...'
        popupFormChangeAvatar.close()
        
    }
})

// сохранение добавленной из попапа картинки на страницу
const popupFormAdd = new PopupWithForm ({
    popupElement: popupAdd,
    submitCallback: (item) => {
        api.addCard(item)
        .then((res)=> {
            console.log(res)
            let name = res.name;
            let link = res.link;
            let id = res._id;
            let owner = res.owner;
            let likes = res.likes;

            cardList.addCard(createCard(name, link, owner, id, likes, user.id))
        }
        
        )
        
        savePopupBtn.textContent = 'Сохранение...'
        popupFormAdd.close();

        // принудительное отключение кнопки при создании карточки
        addFormValidator.inactiveButton(savePopupBtn)

    }
})


// включение слушателей попапов
popupFormAdd.setEventListeners();
photoCardPopup.setEventListeners();
popupFormEdit.setEventListeners();
popupFormChangeAvatar.setEventListeners();


// слушатель кнопки "edit"
openEditPopupBtn.addEventListener('click', () => {
    editFormValidator.enableValidation()

    popupFormEdit.open()
    popupName.value = user.getUserInfo().name;
    popupStatus.value = user.getUserInfo().status;
    savePopupBtn.textContent = 'Сохранить'
});

// слушатель кнопки "add"
openAddPopupBtn.addEventListener('click', () => {
    popupFormAdd.open();
    savePopupBtn.textContent = 'Создать'
 });

 changeAvatarBtn.addEventListener('click', () => {
     popupFormChangeAvatar.open()
     savePopupBtn.textContent = 'Сохранить'
 })


