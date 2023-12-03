export default class Card {
    constructor({ name, link }, templateSelector, handleCardClick) {
      this._name = name;
      this._link = link;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
  }

    _getTemplate() {
        const cardTemplate = document
        .querySelector(this._templateSelector).content
        .querySelector('.element')
        .cloneNode(true);
        return cardTemplate;
    }

    _setData() {
        this._cardTitle = this._newCard.querySelector('.element__group-title');
        this._cardTitle.textContent = this._name;
        this._cardImage = this._newCard.querySelector('.element__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._likeButton = this._newCard.querySelector('.element__group-favorite');
        this._deleteButton = this._newCard.querySelector('.element__delete-button');
    }

    _deleteCard() {
        this._card = this._deleteButton.closest('.element');
        this._card.remove();
        this._card = null;
    }

    _toggleLike(){
        this._likeButton.classList.toggle('element__group-favorite_active');
    }

    _handleImageClick() {
        this._handleCardClick(this._link, this._name);
    }

    _setListeners() {
        this._deleteButton.addEventListener('click', () => { this._deleteCard() });
        this._cardImage.addEventListener('click', () => { this._handleImageClick() });
        this._likeButton.addEventListener('click', () => { this._toggleLike() });
    }

    getCard() {
        this._newCard = this._getTemplate();
        this._setData();
        this._setListeners();
        return this._newCard;
    }
}