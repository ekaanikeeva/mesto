

export class Card {

        constructor ({data, userId, cardSelector, handleCardClick, handleLikeClick, handleDeleteIconClick}) {
        this._name = data.name;
        this._link = data.link;
        this._id = data.id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
        this._likes = data.likes;
        this._creatorId = data.owner._id;
        this._userId = userId;

         

        this._activeLike = this._activeLike.bind(this)
        this._removeLike = this._removeLike.bind(this)
        this.deletePhotoElement = this.deletePhotoElement.bind(this)
        this.setLike = this.setLike.bind(this)
        this._hiddenBasket = this._hiddenBasket.bind(this)

    }

    // получает элемент из темплейта
    _getTemplate () {

        const photoCard = document
        .querySelector(this._cardSelector)
        .content.querySelector('.figure')
        .cloneNode(true);
        
        return photoCard;
    }

    // добавляет лайк
    _activeLike () {
        this._likeButton.classList.add('figure__like_active');
    }

    // удаляет лайк
    _removeLike () {

        this._likeButton.classList.remove('figure__like_active');
    }

    // удаляет элемент
    deletePhotoElement () {

        this._element.remove();
    }

    // убрать корзину у карточек не пользователя
    _hiddenBasket (id) {
        if (this._creatorId !== undefined && this._creatorId !== null && this._creatorId) {
            if (this._creatorId !== id) {
                this._deleteButton.classList.add('figure__basket_hide')
            }
        }
        
    }



    setLike(likes) {
            this.isLiked =likes.filter((item) => {return item._id == this._userId}).length > 0;

        
            if (this.isLiked) this._activeLike();
            else this._removeLike();
    
            this._likeCounter.textContent = likes.length;
    
            if (likes.length === 0) {
                this._likeCounter.textContent = "";
            }
            return this.isLiked

    }


    // устанавливает слушатели событий
    _setEventListeners () {
      
        this._likeButton.addEventListener('click', (evt) => {
            
            if(evt.target.classList.contains('figure__like_active')) this._handleLikeClick(true);
            else this._handleLikeClick(false);
        });


        this._deleteButton.addEventListener('click', () => {

            this._handleDeleteIconClick(this._id)
        });
        // открывает попап с фотографией

        this._picture.addEventListener('click', () => {
            this._handleCardClick () })
    }

    // создает одну карточку
    createPhotoCard (id) {
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.figure__like');
        this._deleteButton = this._element.querySelector('.figure__basket')
        this._likeCounter = this._element.querySelector('.figure__like-counter')
        this._picture = this._element.querySelector('.figure__pic');
        this._pictureName = this._element.querySelector('.figure__name');

        this._setEventListeners();
        this._hiddenBasket(id)
        this.setLike(this._likes)
             
        this._picture.src = this._link; 
        this._picture.alt = this._name;
        this._pictureName.textContent = this._name;

        return this._element;
    }
}



