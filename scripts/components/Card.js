export class Card {

    constructor (name, link, cardSelector, handleCardClick) {
        this.name = name;
        this.link = link;
        this.cardSelector = cardSelector;
        this.handleCardClick = handleCardClick;
    }

    // получает элемент из темплейта
    _getTemplate () {

        const photoCard = document
        .querySelector(this.cardSelector)
        .content.querySelector('.figure')
        .cloneNode(true);
        
        return photoCard;
    }

    // меняет цвет лайка
    _activeLike () {

        this._element.querySelector('.figure__like').classList.toggle('figure__like_active');
    }

    // удаляет элемент
    _deletePhotoElement () {

        this._element.remove();
    }

    // устанавливает слушатели событий
    _setEventListeners () {

        this._element.querySelector('.figure__like').addEventListener('click', () => {
            this._activeLike();
        });
        this._element.querySelector('.figure__basket').addEventListener('click', () => {
            this._deletePhotoElement();
        });
        // открывает попап с фотографией

        this._element.querySelector('.figure__pic').addEventListener('click', () => {
            this.handleCardClick () })
    }

    // создает одну карточку
    createPhotoCard () {
         
        this._element = this._getTemplate();

        this._setEventListeners();
        const elementPic = this._element.querySelector('.figure__pic');
        const elementName = this._element.querySelector('.figure__name');
        elementPic.src = this.link; 
        elementPic.alt = this.name;
        elementName.textContent = this.name;

        return this._element;
    }
}



