

export class Card {

    constructor (data, userId, cardSelector, handleCardClick, handleLikeClick, handleDeleteIconClick) {
        this.name = data.name;
        this.link = data.link;
        this.id = data.id;
        this.cardSelector = cardSelector;
        this.handleCardClick = handleCardClick;
        this.handleLikeClick = handleLikeClick;
        this.handleDeleteIconClick = handleDeleteIconClick;
        this.likes = data.likes;
        this.creatorId = data.owner._id;
        this.userId = userId;
        // this.isLiked = this.isLiked.bind(this)

        
        this._activeLike = this._activeLike.bind(this)
        this._removeLike = this._removeLike.bind(this)
        this._deletePhotoElement = this._deletePhotoElement.bind(this)
        this.setLike = this.setLike.bind(this)
        this.hiddenBasket = this.hiddenBasket.bind(this)

    }

    // получает элемент из темплейта
    _getTemplate () {

        const photoCard = document
        .querySelector(this.cardSelector)
        .content.querySelector('.figure')
        .cloneNode(true);
        
        return photoCard;
    }

    // добавляет лайк
    _activeLike () {
        this._element.querySelector('.figure__like').classList.add('figure__like_active');
    }

    // удаляет лайк
    _removeLike () {

        this._element.querySelector('.figure__like').classList.remove('figure__like_active');
    }

    // удаляет элемент
    _deletePhotoElement () {

        this._element.remove();
    }

    // убрать корзину у карточек не пользователя
    hiddenBasket (id) {
        if (this.creatorId !== undefined && this.creatorId !== null && this.creatorId) {
            if (this.creatorId !== id) {
                this._element.querySelector('.figure__basket').classList.add('figure__basket_hide')
            }
        }
        
    }

    setLike(likes) {
        this.isLiked =likes.filter((item) => {return item._id == this.userId}).length > 0;

        
        if (this.isLiked) this._activeLike();
        else this._removeLike();

        this._element.querySelector('.figure__like-counter').textContent = likes.length;

        if (likes.length === 0) {
            this._element.querySelector('.figure__like-counter').textContent = "";
        }
        return this.isLiked
    }

    // устанавливает слушатели событий
    _setEventListeners () {
        
        this._element.querySelector('.figure__like').addEventListener('click', () => {

            this.handleLikeClick(this.setLike(this.likes));
        });

        this._element.querySelector('.figure__basket').addEventListener('click', () => {

            this.handleDeleteIconClick()
        });
        // открывает попап с фотографией

        this._element.querySelector('.figure__pic').addEventListener('click', () => {
            this.handleCardClick () })
    }

    // создает одну карточку
    createPhotoCard (id) {
        this._element = this._getTemplate();
        this._setEventListeners();
        this.hiddenBasket(id)
        this.setLike(this.likes)
        const elementPic = this._element.querySelector('.figure__pic');
        const elementName = this._element.querySelector('.figure__name');
        elementPic.src = this.link; 
        elementPic.alt = this.name;
        elementName.textContent = this.name;

        return this._element;
    }
}



