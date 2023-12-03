import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleSubmitForm = handleSubmitForm;
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitButton = this._form.querySelector('.popup__button');
    this._submitButtonDefault = this._submitButton.textContent;
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
      console.log(JSON.stringify(data));
      console.log(data);
    });
  }

  showPreloader(isLoading = true) {
    isLoading ? this._submitButton.textContent = 'Сохранение...' : this._submitButton.textContent = this._submitButtonDefault
  }

  close() {
    super.close();
    this._form.reset();
  }

  getFormName() {
    return this._form.getAttribute('name');
  }

  setEventListeners() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      const inputValues = this._getInputValues();
      this._handleSubmitForm(inputValues);
    });
    super.setEventListeners();
  }
};