import { Popup } from "./Popup.js";


export class PopupWithImage extends Popup {

    open ({name, link}) {
        super.open();

        const popupImage = this._popupElement.querySelector('.popup__img');
        const popupName = this._popupElement.querySelector('.popup__name')

        popupImage.src = link;
        popupImage.alt = name;
        popupName.textContent = name;
    }
    
}