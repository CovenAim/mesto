import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup-image-container__image-fullscreen');
        this._caption = this._popup.querySelector('.popup-image-container__title-fullscreen');
    }

    open(imageSrc, caption, imageAlt) {
        this._image.src = imageSrc;
        this._image.alt = imageAlt;
        this._image.title = caption;
        this._caption.textContent = caption;
        super.open();
    }
};