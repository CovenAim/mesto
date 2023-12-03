import FormValidator from "./FormValidator.js";

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  
  forms.forEach(form => {
    const validator = new FormValidator(config, form);
    validator.enableValidation();
  });
}

export default enableValidation;