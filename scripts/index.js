//Переменные
import Card from "./Card.js";
import enableValidation from "./validate.js"
import initialCards from './cards.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  disabledButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

const popups = document.querySelectorAll(".popup"); //находим основный элемент попап

const editButtonElement = document.querySelector(".profile__info-edit-button"); //Находим кнопку редактирования профиля
const popupEditForm = document.querySelector(".popup_form_edit"); //Находим попап форму редактирования
const editForm = popupEditForm.querySelector(".edit-form"); //Поиск формы редактирования

const addButtonElement = document.querySelector(".profile__add-button"); //Находим кнопку добавления нового места
const popupAddForm = document.querySelector(".popup_form_add"); //Контейнер добавления нового места
const addForm = popupAddForm.querySelector(".add-form"); //Находим саму форму добавления нового места

const infoName = document.querySelector(".profile__info-name");//Находим поле ввода имени
const nameInput = editForm.querySelector(".edit-form__text_input_name"); // Присваиваем значение полю имени
const infoDescription = document.querySelector(".profile__info-description"); //Находим поле ввода описания профиля
const descriptionInput = editForm.querySelector(".edit-form__text_input_description"); //Присваиваем значение описанию профиля

const cardsContainer = document.querySelector(".elements"); //Находим поле для создания карточек

const popupImageForm = document.querySelector(".popup_form_image"); //Находим открытие картинки карточки
const popupImage = popupImageForm.querySelector(".popup-image-container__image-fullscreen"); //Находим селектор полноэкранного изображения 
const popupImageTitle = popupImageForm.querySelector(".popup-image-container__title-fullscreen"); //Находим селектор названия карточки изображения

const textName = addForm.querySelector(".add-form__text_input_title"); //Находим поле для ввода названия, формы добавления карточоки
const urlName = addForm.querySelector(".add-form__text_input_url"); //Находим поле для ввода УРЛ, формы добавления карточки

const closeButtons = document.querySelectorAll(".popup-close"); //Находим все кнопои закрытия попапов

//ФУНКЦИИ:
//Функция сохранения данных (Сабмита) формы редактирования
function handleEditFormSubmit (evt) {
  evt.preventDefault();
  // Вставляем новые значения с помощью textContent
  infoName.textContent = nameInput.value; 
  infoDescription.textContent = descriptionInput.value;
  closePopup(popupEditForm);
}

//Общая функция открытия форм
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

//Общая функция закрытия форм
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
  // addForm.reset();
}

// Функция создания карточек
function createCard(cardData) {
  const cardInstance = new Card(cardData, '#template-elements');
  return cardInstance.getCard();
}

// Функция рендера карточек
function renderCards() {
  initialCards.forEach((card) => {
    const cardElement = createCard(card);
    cardsContainer.appendChild(cardElement);
  });
}

//Функция занесения данных при открытии формы редактирования
function handleEditButtonClick () {
  nameInput.value = infoName.textContent;
  descriptionInput.value = infoDescription.textContent;
  openPopup(popupEditForm);
}


// Функция сохранения данных (Сабмита) формы добавления карточки
function handleAddFormSubmit(ev) {
  ev.preventDefault();
  const newCardElement = createCard({
    name: textName.value,
    link: urlName.value,
  });
  cardsContainer.prepend(newCardElement);
  closePopup(popupAddForm);
  addForm.reset();

  formValidator.resetButton();
}

// Функция открытия попапа изображения
function openPopupImage(imageUrl, name) {
  popupImage.src = imageUrl;
  popupImage.alt = `Увеличенное изображение - ${name}`;
  popupImageTitle.textContent = name;
  openPopup(popupImageForm);
}

//Универсальная функция закрытия попапов
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => {
    closePopup(popup)
  });
});

//Функция закрытия попапов по клику за пределами форм
function handlePopupEvents(event) {
  const target = event.target;
  const isPopup = target.classList.contains('popup');
  if (isPopup) {
    closePopup(target);
  }
}

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//ОБРАБОТЧИКИ СОБЫТИЙ:
//Слушатель клика для открытия формы редактирования
editButtonElement.addEventListener("click", handleEditButtonClick);

//Слушатель клика для открытия формы добавления нового места
addButtonElement.addEventListener("click", () => {
  openPopup(popupAddForm);
});

editForm.addEventListener("submit", handleEditFormSubmit); //Слушатель сабмита по кнопке формы редактирования
popupAddForm.addEventListener("submit", handleAddFormSubmit); //Слушатель сабмита по кнопке формы добавления

//Пробегаем по массиву popup для закрытия попапов за пределами попапа
popups.forEach((popup) => {
  popup.addEventListener('click', handlePopupEvents);
});

//Вызов функций
renderCards();
enableValidation(validationConfig);

export { openPopupImage };