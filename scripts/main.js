const popups = document.querySelector('.popups');
const profile = document.querySelector('.profile');
const popup = document.querySelector('.popup');
const form = Array.from(popups.querySelectorAll('.form'));
const figures = document.querySelector('.figures');
const popupContainer = document.querySelector('.popup__container')
const openEditPopupBtn = profile.querySelector('.profile__edit-btn');
const savePopupBtn = popups.querySelector('.form__btn-save');
const popupEdit = document.querySelector('.popup_type_edit');
const openAddPopupBtn = profile.querySelector('.profile__add-btn');
const popupAdd = document.querySelector('.popup_type_add-card');
const popupImg = document.querySelector('.popup_type_photo');
const buttonsClosePopup = Array.from(popups.querySelectorAll('.popup__btn-close'));
const photoTemplate = document.querySelector('#photo-card').content;
const formImg = popups.querySelector('.form__img');
const formName = popups.querySelector('.form__name');


let profileName = document.getElementById('profile-name');
let popupName = document.getElementById('popup-name');
let profileStatus = document.getElementById('profile-status');
let popupStatus = document.getElementById('popup-status');
let popupSaveName = document.getElementById('popup-title');
let popupSaveLink = document.getElementById('popup-link')

let photoElement;
let photoElementBtn;
let photoElementPicture;
let photoElementName;
let photoElementLike;
let photoElementBasket;


//загруженные фото
function addPhoto () {

    photoElement = photoTemplate.querySelector('.figure').cloneNode(true);
    photoElement.querySelector('.figure__pic-btn').addEventListener('click', pictureForm);
    photoElement.querySelector('.figure__pic').src = "https://images.unsplash.com/photo-1490879112094-281fea0883dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"; 
    photoElement.querySelector('.figure__pic').alt = "Зима, остров Ольхон, озеро Байкал, покрытое льдом"
    photoElement.querySelector('.figure__name').textContent = "Остров Ольхон";
    photoElement.querySelector('.figure__like').addEventListener('click', activeLike);
    photoElement.querySelector('.figure__basket').addEventListener('click', deletePhotoElement);
    figures.append(photoElement);

    photoElement = photoTemplate.querySelector('.figure').cloneNode(true);
    photoElement.querySelector('.figure__pic-btn').addEventListener('click', pictureForm);
    photoElement.querySelector('.figure__pic').src = "https://images.unsplash.com/photo-1520106212299-d99c443e4568?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"; 
    photoElement.querySelector('.figure__pic').alt = "Храм Василия Блаженного ночью"
    photoElement.querySelector('.figure__name').textContent = "Москва";
    photoElement.querySelector('.figure__like').addEventListener('click', activeLike);
    photoElement.querySelector('.figure__basket').addEventListener('click', deletePhotoElement);
    figures.append(photoElement);

    photoElement = photoTemplate.querySelector('.figure').cloneNode(true);
    photoElement.querySelector('.figure__pic-btn').addEventListener('click', pictureForm);
    photoElement.querySelector('.figure__pic').src = "https://images.unsplash.com/photo-1525302220185-c387a117886e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"; 
    photoElement.querySelector('.figure__pic').alt = "Зимняя природа Республики Коми. Река, леса, закат"
    photoElement.querySelector('.figure__name').textContent = "Коми";
    photoElement.querySelector('.figure__like').addEventListener('click', activeLike);
    photoElement.querySelector('.figure__basket').addEventListener('click', deletePhotoElement);
    figures.append(photoElement);

    photoElement = photoTemplate.querySelector('.figure').cloneNode(true);
    photoElement.querySelector('.figure__pic-btn').addEventListener('click', pictureForm);
    photoElement.querySelector('.figure__pic').src = "https://images.unsplash.com/photo-1535557142533-b5e1cc6e2a5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=801&q=80"; 
    photoElement.querySelector('.figure__pic').alt = "Вулкан на Камчатке, равнина, рассвет"
    photoElement.querySelector('.figure__name').textContent = "Камчатка";
    photoElement.querySelector('.figure__like').addEventListener('click', activeLike);
    photoElement.querySelector('.figure__basket').addEventListener('click', deletePhotoElement);
    figures.append(photoElement);

    photoElement = photoTemplate.querySelector('.figure').cloneNode(true);
    photoElement.querySelector('.figure__pic-btn').addEventListener('click', pictureForm);
    photoElement.querySelector('.figure__pic').src = "https://images.unsplash.com/photo-1552337399-3bb1c9f40785?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80"; 
    photoElement.querySelector('.figure__pic').alt = "Закат и море в Дивноморске"
    photoElement.querySelector('.figure__name').textContent = "Дивноморск";
    photoElement.querySelector('.figure__like').addEventListener('click', activeLike);
    photoElement.querySelector('.figure__basket').addEventListener('click', deletePhotoElement);
    figures.append(photoElement);

    photoElement = photoTemplate.querySelector('.figure').cloneNode(true);
    photoElement.querySelector('.figure__pic-btn').addEventListener('click', pictureForm);
    photoElement.querySelector('.figure__pic').src = "https://images.unsplash.com/photo-1547996668-eb0c9bec5c4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=976&q=80"; 
    photoElement.querySelector('.figure__pic').alt = "Озеро Байкал и остров"
    photoElement.querySelector('.figure__name').textContent = "Байкал";
    photoElement.querySelector('.figure__like').addEventListener('click', activeLike);
    photoElement.querySelector('.figure__basket').addEventListener('click', deletePhotoElement);
    figures.append(photoElement);

}

addPhoto();


//открытие попап и отправка данных из профиля в форму
function activePopup (Element) { 
            Element.classList.add('popup_opened');
            if (popupEdit) {
                openEditPopupForm();
            }
            popupSaveName.value = "";
            popupSaveLink.value = "";
}

//закрытие попап
function closePopupForm () {
    popupAdd.classList.remove('popup_opened');
    popupEdit.classList.remove('popup_opened');
    popupImg.classList.remove('popup_opened')
}

//параметры, передаваемые при открытии попапа редактирования
function openEditPopupForm () {
    popupName.value = profileName.textContent;
    popupStatus.value = profileStatus.textContent;
}

//открывает фото
function openPhotoForm (evt) {
    activePopup(popupImg)
    formImg.src = photoElement.querySelector('.figure__pic').src;
    
}

//сохраняет изменения popup
function savePopupChanges (submit) {
    submit.preventDefault();

    if ((popup.classList.contains('popup'))&&(popup.classList.contains('popup_type_edit'))&&(popup.classList.contains('popup_opened'))){

        profileName.textContent = popupName.value;
        profileStatus.textContent = popupStatus.value;
    } 
    else  {

        photoElement = photoTemplate.querySelector('.figure').cloneNode(true);
        photoElement.querySelector('.figure__pic-btn').addEventListener('click', pictureForm);
        photoElement.querySelector('.figure__name').textContent = popupSaveName.value;
        photoElement.querySelector('.figure__pic').src = popupSaveLink.value;
        photoElement.querySelector('.figure__like').addEventListener('click', activeLike);
        photoElement.querySelector('.figure__basket').addEventListener('click', deletePhotoElement);
        figures.prepend(photoElement);

    }

    closePopupForm();
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
    formImg.src = pict.src;
    formName.textContent = name.textContent;
}


openEditPopupBtn.addEventListener('click', () => {
   activePopup(popupEdit);
});

openAddPopupBtn.addEventListener('click', () => {
    activePopup(popupAdd);
 });

form.forEach((element) => {
    element.addEventListener('submit', savePopupChanges)
})

buttonsClosePopup.forEach((element) => {
    element.addEventListener('click', closePopupForm)
})


    
