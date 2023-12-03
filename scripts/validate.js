function showInputError(form, input, config) {
    input.classList.add(config.inputErrorClass);
    const span = form.querySelector(`.${input.id}-error`);
    span.textContent = input.validationMessage;
    span.classList.add(config.errorClass);
}

function hideInputError(form, input, config) {
    input.classList.remove(config.inputErrorClass);
    const span = form.querySelector(`.${input.id}-error`);
    span.textContent = '';
    span.classList.remove(config.errorClass);
}

function isValid(form, input, config) {
  if (!input.validity.valid) {
    showInputError(form, input, config);
  } else {
    hideInputError(form, input, config);
  }
}
  
function hasInvalidValue(inputs) {
  return inputs.some(input => !input.validity.valid || input.validity.typeMismatch);
}

const disableSubmitButton = (button, config) => {
  button.classList.add(config.disabledButtonClass);
  button.disabled = true;
 }
 
 const enableSubmitButton = (button, config) =>{
  button.classList.remove(config.disabledButtonClass);
  button.disabled = false;
 }

 function updateSubmitButtonStatus(form, validationConfig) {
  const inputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const submitButton = form.querySelector(validationConfig.submitButtonSelector);

  const isValidForm = inputs.every((input) => input.validity.valid);

  if (isValidForm) {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove(validationConfig.disabledButtonClass);
  } else {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add(validationConfig.disabledButtonClass);
  }
}

 const toggleButtonState = (inputs, button, config) => {
  if (hasInvalidValue(inputs)) {
    disableSubmitButton(button, config);
  } else {
    enableSubmitButton(button, config);
  }
}; 

  
function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

inputs.forEach(input => {
  input.addEventListener('input', () => {
    isValid(form, input, config);
    toggleButtonState(inputs, button, config);
    });
  });

toggleButtonState(inputs, button, config);
}
  
function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  
  forms.forEach(form => {
    setEventListeners(form, config);
  });
}