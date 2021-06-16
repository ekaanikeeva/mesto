const popups = document.querySelector('.popups');
const profile = document.querySelector('.profile');
const popupList = Array.from(popups.querySelectorAll('.popup'))
const figures = document.querySelector('.figures');
const popupContainer = document.querySelector('.popup__container')
const openEditPopupBtn = profile.querySelector('.profile__edit-btn');
const savePopupBtn = popups.querySelector('.form__btn-save');
const popupEdit = document.querySelector('.popup_type_edit');
const openAddPopupBtn = profile.querySelector('.profile__add-btn');
const popupAdd = document.querySelector('.popup_type_add-card');
const popupImg = document.querySelector('.popup_type_photo');
const closePopupButtons = Array.from(popups.querySelectorAll('.popup__btn-close'));
const photoTemplate = document.querySelector('#photo-card').content;
const popupImgPicture = popups.querySelector('.popup__img');
const popupImgName = popups.querySelector('.popup__name');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');


// поиск форм и инпутов форм через "name"
const formEdit = document.forms.edit;
const formAdd = document.forms.add;
const popupName = formEdit.elements.name;
const popupStatus = formEdit.elements.status;
const popupSaveName = formAdd.elements.title;
const popupSaveLink = formAdd.elements.link;


//функция создания одной карточки
function createPhotoCard (item) {
    photoElement = photoTemplate.querySelector('.figure').cloneNode(true);
    const elementPic = photoElement.querySelector('.figure__pic');
    const elementName = photoElement.querySelector('.figure__name');
    photoElement.querySelector('.figure__like').addEventListener('click', activeLike);
    photoElement.querySelector('.figure__basket').addEventListener('click', deletePhotoElement);
    elementPic.src = item.link; 
    elementPic.alt = item.alt;
    elementName.textContent = item.name;

    // открывает попап с фотографией
    elementPic.addEventListener('click', () => {
        activePopup(popupImg);
        popupImgPicture.src = elementPic.src;
        popupImgPicture.alt = elementPic.alt;
        popupImgName.textContent = elementName.textContent;
    });  

    return photoElement;
}

//добавление карточек из массива
function addPhotoCards () {
    initialCards.forEach((item) => {
        const photoCard = createPhotoCard (item);
        figures.append(photoCard);
    })
    
};
addPhotoCards();

//открытие попап
function activePopup (popup) { 
    popup.classList.add('popup_opened');

    document.addEventListener('keydown', closePopupKey)
}

//закрытие попап
function closePopup (popup) {
    popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', closePopupKey)
}

//параметры, передаваемые при открытии попапа редактирования
function openEditPopupForm () {
    popupName.value = profileName.textContent;
    popupStatus.value = profileStatus.textContent;
}

//сохранение изменений попапа редактирования
function saveEditPopupChanges (submit) {
    submit.preventDefault();

    profileName.textContent = popupName.value;
    profileStatus.textContent = popupStatus.value;

    closePopup(popupEdit);
}

//сохранение изменений попапа добавления
function saveAddPopupChanges (submit) {
    submit.preventDefault();
    figures.prepend(
      createPhotoCard({
        name: popupSaveName.value,
        link: popupSaveLink.value,
        alt: popupSaveName.value
      })
    );
    popupSaveName.value = "";
    popupSaveLink.value = "";

    closePopup(popupAdd);
}

// закрытие попапа при нажатии Esc
function closePopupKey (evt) {
    if (evt.key == "Escape") {
        const popupOpened = popups.querySelector('.popup_opened')
        closePopup(popupOpened)
    }
}

//меняет цвет лайка
function activeLike (evt) {
    evt.target.classList.toggle('figure__like_active');
}

//удаляет элемент
function deletePhotoElement (evt) {
   const photoFigure = evt.target.closest('.figure');
   photoFigure.remove();
}

// открывает форму с фотографией
// function pictureForm (element) {
//     activePopup(popupImg);
//     const figureEl = element.target.closest('.figure');
//     const pict = figureEl.querySelector('.figure__pic');
//     const name = figureEl.querySelector('.figure__name');
//     popupImgPicture.src = pict.src;
//     popupImgPicture.alt = pict.alt;
//     popupImgName.textContent = name.textContent;
// }


// ищет ближайший попап и закрывает его
function findAndClosePopup (evt) {
    const namePopup = evt.target.closest(".popup");
    closePopup(namePopup);
}

// функция для определения ближайшего попапа и закрытия попапа по оверлею
function closeTargetPopupForOverlay(evt) {
    const namePopup = evt.target.closest(".popup");
    const container = evt.target.closest(".popup__container");
    const photoContainer = evt.target.closest(".popup__container-photo");

    if(!container && !photoContainer) {
        closePopup(namePopup);
    }
}

openEditPopupBtn.addEventListener('click', () => {
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
    element.addEventListener('mousedown', closeTargetPopupForOverlay)
})

