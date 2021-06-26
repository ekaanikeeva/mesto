import { 
    activeLike, 
    deletePhotoElement, 
    activePopup, 
    popupImg, 
    popupImgName, 
    popupImgPicture } from "./main.js";


export class Card {
    constructor (name, link, alt) {
        this.name = name;
        this.link = link;
        this.alt = alt;
    }

    // получает элемент из темплейта
    __getTemplate () {
        const photoTemplate = document.querySelector('#photo-card').content;
        const photoCard = photoTemplate.querySelector('.figure').cloneNode(true);
        
        return photoCard;
    }

    // создает одну карточку
    __createPhotoCard () {
        this._element = this.__getTemplate ()

        const elementPic = this._element.querySelector('.figure__pic');
        const elementName = this._element.querySelector('.figure__name');
        this._element.querySelector('.figure__like').addEventListener('click', activeLike);
        this._element.querySelector('.figure__basket').addEventListener('click', deletePhotoElement);
        elementPic.src = this.link; 
        elementPic.alt = this.alt;
        elementName.textContent = this.name;

        // открывает попап с фотографией
        elementPic.addEventListener('click', () => {
            activePopup(popupImg);
            popupImgPicture.src = this.link;
            popupImgPicture.alt = this.alt;
            popupImgName.textContent = this.name;
        }); 

        return this._element;
    }
}



