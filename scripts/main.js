let profile = document.querySelector('.profile');
let openPopup = profile.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let savePopup = popup.querySelector('.popup__btn-save');
let closePopup = popup.querySelector('.popup__btn-close');
let profileName;
let popupName;
let profileStatus;
let popupStatus;

profileName = document.getElementById('profile__name');
popupName = document.getElementById('popup__name');
popupName.value = profileName.textContent;

profileStatus = document.getElementById('profile__status');
popupStatus = document.getElementById('popup__status')
popupStatus.value = profileStatus.textContent;

savePopup.addEventListener('click', savePopupChanges);
openPopup.addEventListener('click', activePopup);
closePopup.addEventListener('click', activePopup);


function activePopup () {
    popup.classList.toggle('popup_opened');
}

function savePopupChanges() {
    profileName.textContent = popupName.value;
    profileStatus.textContent = popupStatus.value;
    activePopup();
}

