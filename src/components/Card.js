export default class Card {
    constructor({ name, link, id, likes, ownerId}, templateSelector, handleCardClick, handleLikeClick, handleDeleteClick, currentUserId) {
      this._name = name;
      this._link = link;
      this._id = id;
      this._likes = likes;
      this._isLiked = likes.some((likeUser) => likeUser._id === currentUserId);
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
      this._handleLikeClick = handleLikeClick;
      this._currentUserId = currentUserId;
      this._handleDeleteClick = handleDeleteClick;
      this._ownerId = ownerId;
}

    _getTemplate() {
        const cardTemplate = document
        .querySelector(this._templateSelector).content
        .querySelector('.element')
        .cloneNode(true);
        const trashButton = cardTemplate.querySelector('.element__delete-button');
        if (this._ownerId !== this._currentUserId) {
            trashButton.style.display = 'none';
        }
        return cardTemplate;
    }

    _setData() {
        this._cardTitle = this._newCard.querySelector('.element__group-title');
        this._cardTitle.textContent = this._name;
        this._cardImage = this._newCard.querySelector('.element__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._likeButton = this._newCard.querySelector('.element__group-favorite');
        this._likesCountElement = this._newCard.querySelector('.element__likes');
        this._likesCountElement.textContent = this._likes.length;
        this._deleteButton = this._newCard.querySelector('.element__delete-button');

        if (this._likes.some(user => user._id === this._currentUserId)) {
            this._likeButton.classList.add('element__group-favorite_active');
        }
    }

    deleteCard() {
        this._card = this._deleteButton.closest('.element');
        this._card.remove();
        this._card = null;
    }

    _handleImageClick() {
        this._handleCardClick(this._link, this._name);
    }

    _setListeners() {
        this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this));
        this._cardImage.addEventListener('click', () => { this._handleImageClick(this) });
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick(this)
            .then((card) => {
                this._likes = card.likes;
                this._isLiked = !this._isLiked;
                this._likesCountElement.textContent = this._likes.length;
                this._isLiked ? this._likeButton.classList.add('element__group-favorite_active') : this._likeButton.classList.remove('element__group-favorite_active')
            })
            .catch((error) => console.log(error))
        });
    }

    getCard() {
        this._newCard = this._getTemplate();
        this._setData();
        this._setListeners();
        return this._newCard;
    }
};