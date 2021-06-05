const popups = document.querySelector('.popups');
const profile = document.querySelector('.profile');
const popup = document.querySelector('.popup');
const forms = Array.from(popups.querySelectorAll('.form'));
const formEdit = document.querySelector('.form_edit')
const formAdd = document.querySelector('.form_add-card')
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
const popupName = document.querySelector('.form__info_name');
const profileStatus = document.querySelector('.profile__status');
const popupStatus = document.querySelector('.form__info_status');
const popupSaveName = popups.querySelector('.form__info_title');
const popupSaveLink = popups.querySelector('.form__info_link');


//функция создания одной карточки
function createPhotoCard (item) {
    photoElement = photoTemplate.querySelector('.figure').cloneNode(true);

    photoElement.querySelector('.figure__pic-btn').addEventListener('click', pictureForm);
    photoElement.querySelector('.figure__pic').src = item.link; 
    photoElement.querySelector('.figure__pic').alt = item.alt;
    photoElement.querySelector('.figure__name').textContent = item.name;
    photoElement.querySelector('.figure__like').addEventListener('click', activeLike);
    photoElement.querySelector('.figure__basket').addEventListener('click', deletePhotoElement);

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
}

//закрытие попап
function closePopupForm (popup) {
    popup.classList.remove('popup_opened');
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

    closePopupForm(popupEdit);
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
    closePopupForm(popupAdd);
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

//открывает форму с фотографией
function pictureForm (element) {
    activePopup(popupImg)
    const figureEl = element.target.closest('.figure');
    const pict = figureEl.querySelector('.figure__pic')
    const name = figureEl.querySelector('.figure__name')
    popupImgPicture.src = pict.src;
    popupImgPicture.alt = pict.alt;
    popupImgName.textContent = name.textContent;
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
    element.addEventListener('click', (evt) => {
        let namePopup = evt.target.closest(".popup");
        closePopupForm(namePopup);
    });
})
