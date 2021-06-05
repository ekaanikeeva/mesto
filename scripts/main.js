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

const initialCards = [
    {
      name: 'Остров Ольхон',
      link: 'https://images.unsplash.com/photo-1490879112094-281fea0883dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
      alt: 'Зима, остров Ольхон, озеро Байкал, покрытое льдом'
    },
    {
      name: 'Москва',
      link: 'https://images.unsplash.com/photo-1520106212299-d99c443e4568?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
      alt: 'Храм Василия Блаженного ночью'
    },
    {
      name: 'Коми',
      link: 'https://images.unsplash.com/photo-1525302220185-c387a117886e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
      alt: 'Зимняя природа Республики Коми. Река, леса, закат'
    },
    {
      name: 'Камчатка',
      link: 'https://images.unsplash.com/photo-1535557142533-b5e1cc6e2a5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=801&q=80',
      alt: 'Вулкан на Камчатке, равнина, рассвет'
    },
    {
      name: 'Дивноморск',
      link: 'https://images.unsplash.com/photo-1552337399-3bb1c9f40785?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80',
      alt: 'Закат и море в Дивноморске'
    },
    {
      name: 'Байкал',
      link: 'https://images.unsplash.com/photo-1547996668-eb0c9bec5c4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=976&q=80',
      alt: 'Озеро Байкал и остров'
    }
  ]; 


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
        figures.append(photoElement);
    })
    
};
addPhotoCards();

//открытие попап
function activePopup (evt) { 
            evt.classList.add('popup_opened');
}

//закрытие попап
function closePopupForm (evt) {
    evt.classList.remove('popup_opened');
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
    createPhotoCard(photoElement);
    photoElement.querySelector('.figure__name').textContent = popupSaveName.value;
    photoElement.querySelector('.figure__pic').alt = popupSaveName.value;
    photoElement.querySelector('.figure__pic').src = popupSaveLink.value; 
    figures.prepend(photoElement);

    initialCards.unshift(photoElement);
    
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
