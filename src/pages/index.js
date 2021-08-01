
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
    changeAvatarBtn,
    popups
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

const changeButtonTextcontent = (btn) => {
    btn.textContent = 'Сохранение...'
}

// функция создания карточки
const createCard = (name, link, owner, id, likes, userId) => {

    const card = new Card ({data: {name: name, link: link, id: id, likes: likes, owner: owner}, 
        userId: userId, cardSelector: `#${templateCard.id}`, 
    // открытие попапа с картинкой
    handleCardClick: () => {
        photoCardPopup.open({name: name, link: link})
    },

    // лайк 
    handleLikeClick: (state) => { 

    if (state == true) {
        api.deleteLike(id)
        .then((data) => {

            return card.setLike(data.likes)
            
        })
        .catch((err) => {
            console.log(`Лайк не удален ${err}`)
        })   
    } else if (state == false) {
        api.postLike(id)
        .then((data) => {
            
            return card.setLike(data.likes)

    })
        .catch((err) => {
            console.log(`Не удалось поставить лайк ${err}`)
        }) 
    
    } else console.log('проблема с лайком') 
    
},
    // удаление карточки
    handleDeleteIconClick: (id) => {
        
        popupFormDelete.buttonSubmit.textContent = 'Да'
        popupFormDelete.open(id)

        popupFormDelete.setSubmit(() => {
                api.deleteCard(id)
                .then(() => {               
                card.deletePhotoElement(); 
                
                popupFormDelete.buttonSubmit.textContent = 'Удаление...'
                popupFormDelete.close()  
            })
                .catch((err) => {
                    console.log(`Не удалось удалить карточку ${err}`)
                })       
    })
} })
    
    const photo = card.createPhotoCard(userId);
    return photo;

}

const popupFormDelete = new PopupWithDelete (popupDelete)
popupFormDelete.setEventListeners()    


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
    .catch((err) => {
        console.log(`Не удалось загрузить карточки ${err}`)
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
    .catch((err) => {
        console.log(`Не удалось получить информацию о  пользователе ${err}`)
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
            
            changeButtonTextcontent(popupFormEdit.buttonSubmit)
            popupFormEdit.close();
        })
        .catch((err) => {
            console.log(`Не удалось обновить данные пользователя ${err}`)
        }) 
        
    } 

})


const popupFormChangeAvatar = new PopupWithForm ({
    popupElement: popupChangeAvatar,
    submitCallback: () => {

        const avatarLink = popupFormChangeAvatar._getInputValues()

        api.changeAvatar(avatarLink.link)
        .then(() => {
            user.setUserAvatar(avatarLink.link)

            changeButtonTextcontent(popupFormChangeAvatar.buttonSubmit)
            popupFormChangeAvatar.close()
        })
        .catch((err) => {
            console.log(`Не удалось сменить аватар пользователя ${err}`)
        }) 
        
        
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

            changeButtonTextcontent(popupFormAdd.buttonSubmit)
            popupFormAdd.close();
        })
        .catch((err) => {
            console.log(`Не удалось добавить картинку на страницу ${err}`)
        }) 
        
        // savePopupBtn.textContent = 'Сохранение...'

        // принудительное отключение кнопки при создании карточки
        // addFormValidator.inactiveButton()

    }
})


// включение слушателей попапов
popupFormAdd.setEventListeners();
photoCardPopup.setEventListeners();
popupFormEdit.setEventListeners();
popupFormChangeAvatar.setEventListeners();


// слушатель кнопки "edit"
openEditPopupBtn.addEventListener('click', () => {

    popupFormEdit.open()
    popupName.value = user.getUserInfo().name;
    popupStatus.value = user.getUserInfo().status;
    popupFormEdit.buttonSubmit.textContent = 'Сохранить'
    
});

// слушатель кнопки "add"
openAddPopupBtn.addEventListener('click', () => {
    popupFormAdd.open();
    popupFormAdd.buttonSubmit.textContent = 'Создать'
 });

 changeAvatarBtn.addEventListener('click', () => {
     popupFormChangeAvatar.open()
     popupFormChangeAvatar.buttonSubmit.textContent = 'Сохранить'
 })


