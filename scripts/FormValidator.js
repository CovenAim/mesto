class FormValidator {
    constructor(config, formElement) {
      this._config = config;
      this._formElement = formElement;
      this._inputs = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
      this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }
  
    _showInputError(input) {
      const errorElement = this._formElement.querySelector(`.${input.id}-error`);
      input.classList.add(this._config.inputErrorClass);
      errorElement.textContent = input.validationMessage;
      errorElement.classList.add(this._config.errorClass);
    }
  
    _hideInputError(input) {
      const errorElement = this._formElement.querySelector(`.${input.id}-error`);
      input.classList.remove(this._config.inputErrorClass);
      errorElement.textContent = '';
      errorElement.classList.remove(this._config.errorClass);
    }
  
    _isValid(input) {
      if (!input.validity.valid) {
        this._showInputError(input);
      } else {
        this._hideInputError(input);
      }
    }
  
    _hasInvalidValue() {
      return this._inputs.some(input => !input.validity.valid || input.validity.typeMismatch);
    }

    setButtonState(isEnabled) {
      if (isEnabled) {
        this._buttonElement.classList.remove(this._config.disabledButtonClass);
        this._buttonElement.disabled = false;
      } else {
        this._buttonElement.classList.add(this._config.disabledButtonClass);
        this._buttonElement.disabled = true;
      }
    }
    
    resetButton() {
        this._buttonElement.classList.add(this._config.disabledButtonClass);
        this._buttonElement.disabled = true;
    }

    _toggleButtonState() {
        if (this._hasInvalidValue()) {
            this.resetButton();
        } else {
            this._buttonElement.classList.remove(this._config.disabledButtonClass);
            this._buttonElement.disabled = false;
        }
    }
  
    _setEventListeners() {
      this._inputs.forEach(input => {
        input.addEventListener('input', () => {
          this._isValid(input);
          this._toggleButtonState();
        });
      });
  
      this._toggleButtonState();
    }
  
    enableValidation() {
      this._formElement.addEventListener('submit', event => {
        event.preventDefault();
      });
  
      this._setEventListeners();
    }
}

export default FormValidator;