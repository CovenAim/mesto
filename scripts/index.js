const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  disabledButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

const popups = document.querySelectorAll(".popup"); //находим основный элемент попап

const editButtonElement = document.querySelector(".profile__info-edit-button"); //Находим кнопку редактирования профиля
const popupEditForm = document.querySelector(".popup_form_edit"); //Находим попап форму редактирования
const editForm = popupEditForm.querySelector(".edit-form"); //Поиск формы редактирования

const addButtonElement = document.querySelector(".profile__add-button"); //Находим кнопку добавления нового места
const popupAddForm = document.querySelector(".popup_form_add"); //Контейнер добавления нового места
const addForm = popupAddForm.querySelector(".add-form"); //Находим саму форму добавления нового места
// const cardFormSubmitButton = popupAddForm.querySelector(".add-form__container-button popup__button");

const infoName = document.querySelector(".profile__info-name");//Находим поле ввода имени
const nameInput = editForm.querySelector(".edit-form__text_input_name"); // Присваиваем значение полю имени
const infoDescription = document.querySelector(".profile__info-description"); //Находим поле ввода описания профиля
const descriptionInput = editForm.querySelector(".edit-form__text_input_description"); //Присваиваем значение описанию профиля

const cardsContainer = document.querySelector(".elements"); //Находим поле для создания карточек
const cardTemplate = document.querySelector("#template-elements").content; //Находим темплкейт для создания карточек(с содержимым внитри)

const popupImageForm = document.querySelector(".popup_form_image"); //Находим открытие картинки карточки
const popupImage = popupImageForm.querySelector(".popup-image-container__image-fullscreen"); //Находим селектор полноэкранного изображения 
const popupImageTitle = popupImageForm.querySelector(".popup-image-container__title-fullscreen"); //Находим селектор названия карточки изображения

const textName = addForm.querySelector(".add-form__text_input_title"); //Находим поле для ввода названия, формы добавления карточоки
const urlName = addForm.querySelector(".add-form__text_input_url"); //Находим поле для ввода УРЛ, формы добавления карточки

const closeButtons = document.querySelectorAll(".popup-close"); //Находим все кнопои закрытия попапов
const containerPopup = document.querySelector(".popup-container"); //Находим блоки всех попапов
const containerPopupImage = document.querySelector(".popup-image-container"); //Находим блок полноэкранного изображения


//ФУНКЦИИ:
//Функция сохранения данных (Сабмита) формы редактирования
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  // Вставляем новые значения с помощью textContent
  infoName.textContent = nameInput.value;
  infoDescription.textContent = descriptionInput.value;
  closePopup(popupEditForm);
}

//Общая функция открытия форм
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
  document.addEventListener("click", handlePopupEvents);
}

//Общая функция закрытия форм
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
  document.removeEventListener("click", handlePopupEvents);
}

//Функция отрисовки карточек при загрузке страницы
function createCard(name, link) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardImage = cardElement.querySelector(".element__image");
  const cardTitle = cardElement.querySelector(".element__group-title");
  const likeButton = cardElement.querySelector(".element__group-button");

  likeButton.alt = "Избранное";
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("element__group-button_active");
  });

  cardElement
    .querySelector(".element__delete-button")
    .addEventListener("click", () => {
      cardElement.remove();
    });

  cardImage.addEventListener("click", () => {
    openPopupImage(link, name);
  });

  return cardElement;
}

function renderCards() {
  initialCards.forEach(function (card) {
    const cardElement = createCard(card.name, card.link);
    cardsContainer.appendChild(cardElement);
  });
}

//Функция занесения данных при открытии формы редактирования
function handleEditButtonClick() {
  nameInput.value = infoName.textContent;
  descriptionInput.value = infoDescription.textContent;
  openPopup(popupEditForm);
}


//Функция сохранения данных (Сабмита) формы добавления карточки
function handleAddFormSubmit(ev) {
  ev.preventDefault();
  const newCardElement = createCard(textName.value, urlName.value);
  cardsContainer.prepend(newCardElement);
  closePopup(popupAddForm);
  
  addForm.reset();
}

//Функция открытия попапа изображения
function openPopupImage(imageUrl, name) {
  popupImage.src = imageUrl;
  popupImage.alt = `Увеличенное изображение - ${name}`;
  popupImageTitle.textContent = name;
  openPopup(popupImageForm);
}

//Универсальная функция закрытия попапов
closeButtons.forEach((button) => {

  // находим 1 раз ближайший к крестику попап
  const popup = button.closest(".popup");

  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});

//Функция закрытия попапов по клику за пределами форм
function handlePopupEvents(event) {
  const target = event.target;
  const isPopup = target.classList.contains("popup");
  if (isPopup) {
    closePopup(target);
  }
}

//Функция закрытия попапов по кнопке Esc
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

//ОБРАБОТЧИКИ СОБЫТИЙ:
//Слушатель клика для открытия формы редактирования
editButtonElement.addEventListener("click", handleEditButtonClick);

//Слушатель клика для открытия формы добавления нового места
addButtonElement.addEventListener("click", () => {
  openPopup(popupAddForm);
  updateSubmitButtonStatus(addForm, validationConfig);
});

editForm.addEventListener("submit", handleEditFormSubmit); //Слушатель сабмита по кнопке формы редактирования
popupAddForm.addEventListener("submit", handleAddFormSubmit); //Слушатель сабмита по кнопке формы добавления


//Вызов функций
renderCards();
enableValidation(validationConfig);