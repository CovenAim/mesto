import { openPopupImage } from "./index.js"

class Card {
    constructor({ name, link }, templateSelector) {
      this._name = name;
      this._link = link;
      this._templateSelector = templateSelector;
  }

    _getTemplate() {
        const cardTemplate = document  
        .querySelector(this._templateSelector).content
        .querySelector('.element')
        .cloneNode(true);
        this._newCard = cardTemplate;
        this._card = this._newCard;
        return cardTemplate;
    }

    _setData() {
        const cardTitle = this._newCard.querySelector('.element__group-title');
        cardTitle.textContent = this._name;
    }

    _handleDeleteElement() {
        this._card.remove();
        this._card = null;
    }

    _setListeners() {
      const deleteButton = this._newCard.querySelector('.element__delete-button');
      deleteButton.addEventListener('click', () => { this._handleDeleteElement() });
  
      const likeButton = this._newCard.querySelector('.element__group-favorite');
      likeButton.addEventListener('click', () => {
          likeButton.classList.toggle('element__group-favorite_active');
      });
  
      const cardImage = this._newCard.querySelector('.element__image');
      cardImage.src = this._link;
      cardImage.alt = this._name;
      cardImage.addEventListener('click', () => {
          openPopupImage(cardImage.src, cardImage.alt);
      });
  }
  

    getCard() {
        this._newCard = this._getTemplate();
        this._setData();
        this._setListeners();
        return this._newCard;
    }
}


export default Card;