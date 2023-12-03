//Переменные
import "./index.css";
import Card from "../components/Card.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  validationConfig,
  editButtonElement,
  popupEditForm,
  editForm,
  addButtonElement,
  popupAddForm,
  addForm,
  cardsContainer,
  closeButtons,
  nameElement,
  urlElement,
  inputName,
  inputDescription
} from '../utils/constants.js'

const popupWithImage = new PopupWithImage('.popup_form_image'); //Экземпляр класса PopupWithImage
const newUserInfo = new UserInfo({
    nameSelector: '.profile__info-name',
    infoSelector: '.profile__info-description'
});

const section = new Section({
  items: initialCards.map(card => createCard(card.name, card.link)),
  renderer: (item) => item
}, '.elements');
const popupEditProfile = new PopupWithForm('.popup_form_edit', handleEditFormSubmit);
const popupAddCard = new PopupWithForm('.popup_form_add', (values) => {
  const nameInputValue = values['name-place'];
  const urlInputValue = values['url'];
  const cardElement = createCard(nameInputValue, urlInputValue);
  section.addItem(cardElement);
  section.renderItems();
});                                                                    //Экземпляр класса PopupWithForm - добавление нового места


function handleEditFormSubmit(inputValues) {
  const name = inputValues['name'];
  const info = inputValues['description'];
  newUserInfo.setUserInfo({ name, info });

  popupEditProfile.close();
}

//Функция отрисовки карточки для добавления через сабмит кнопки Add
function createCard(name, link) {
  const createCardElement = new Card({
    name: name,
    link: link,
  }, "#template-elements", openPopupImage);
  return createCardElement.getCard();
}

function handleEditButtonClick() {
  const userData = newUserInfo.getUserInfo();
  inputName.value = userData.name;
  inputDescription.value = userData.info;
  popupEditProfile.open();
}

function openPopupImage(imageUrl, name) {
  popupWithImage.open(imageUrl, name);
}

const validators = {};

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach(form => {
    const validator = new FormValidator(config, form);
    validator.enableValidation();
    validators[form.getAttribute('name')] = validator;
  });
 }
 export { enableValidation, validators }


//Обработчики событий
editButtonElement.addEventListener('click', handleEditButtonClick); //Слушатель клика для открытия формы редактирования 
addButtonElement.addEventListener('click', () => {
  popupAddCard.open();
  addForm.reset();
  validators[addForm.getAttribute('name')].toggleButtonState();
}); //Слушатель клика для открытия формы добавления нового места

//Закртыие форм по крестику
popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();

popupAddForm.addEventListener('submit', (event) => {
    event.preventDefault();
    popupAddCard.close();
});

//Вызов функций
enableValidation(validationConfig);
// renderCards()
section.renderItems();