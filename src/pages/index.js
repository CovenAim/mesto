//Переменные
import "./index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDelete from "../components/PopupDelete.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import {
  popupEditForm,
  validationConfig,
  editButtonElement,
  addButtonElement,
  popupAddForm,
  addForm,
  inputName,
  inputDescription,
  nameElement,
  urlElement,
  optionsApi,
} from "../utils/constants.js";
import Api from "../../src/components/Api.js";

let userId = null;

//Экземпляр класса PopupWithImage
const popupWithImage = new PopupWithImage(".popup_form_image"); 
const avatarElement = document.querySelector(".profile__avatar");
const currentUser = new UserInfo(
  {
    nameSelector: ".profile__info-name",
    infoSelector: ".profile__info-description",
  },
  avatarElement
);
const popupEditAvatar = new PopupWithForm(
  ".popup_form_edit-avatar",
  handleEditAvatarFormSubmit
);

const popupDelete = new PopupDelete(".popup_form_delete");

const section = new Section(
  {
    items: [],
    renderer: (item) => {
      section.addItem(createCard(item));
    },
  },
  ".elements"
);

//Экземпляр класса PopupWithForm - добавление нового места
const classPopupWithFormEdit = new PopupWithForm(
  ".popup_form_edit",
  handleEditFormSubmit
);
const classPopupWithFormAdd = new PopupWithForm(
  ".popup_form_add",
  handleAddFormSubmit
); 

const api = new Api(optionsApi);

function handleEditFormSubmit(inputValues) {
  const name = inputValues["name"];
  const about = inputValues["description"];
  classPopupWithFormEdit.showPreloader();
  api
    .editApiProfile(name, about)
    .then((data) => {
      currentUser.setUserInfo(data);
      classPopupWithFormEdit.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => classPopupWithFormEdit.showPreloader(false));
}

// Функция отрисовки карточки для добавления через сабмит кнопки Add
function createCard({ name, link, _id: id, likes, owner }) {
  const createCardElement = new Card(
    {
      name: name,
      link: link,
      id: id,
      likes: likes,
      ownerId: owner._id,
    },
    "#template-elements",
    openPopupImage,
    (card) => api.changeLikeStatus(card._id, card._isLiked),
    (card) => {
      popupDelete.open(() => {
          api
            .deleteCardApi(card._id)
            .then(() => {
              createCardElement.deleteCard();
            })
            .catch((error) => {
              console.log(error);
            })
      });
    },
    currentUser.getUserInfo().id
  );

  return createCardElement.getCard();
}


// Шаблон API запроса 
Promise.all([api.getApiUserInfo(), api.getAllCards()])
  .then(([user, cards]) => {
    currentUser.setUserInfo(user);
    userId = user._id;
    section.renderItems(cards.reverse());
  })
  .catch((error) => {
    console.log(error);
  });


  //Изменил функцию, теперь кнопка декативируется при клике на кнопку открытия попапа,
  function handleEditAvatarFormSubmit(inputValues) {
    const avatarUrl = inputValues["url"];
    popupEditAvatar.showPreloader();
    api
      .editAvatar(avatarUrl)
      .then((data) => {
        currentUser.setUserInfo(data);
        popupEditAvatar.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => popupEditAvatar.showPreloader(false));
  }

  // Функция обрабатки клика по кнопке редактирования
function handleEditButtonClick() {
  const userData = currentUser.getUserInfo();
  inputName.value = userData.name;
  inputDescription.value = userData.about;
  validators[addForm.getAttribute("name")].toggleButtonState(); 
  classPopupWithFormEdit.open();
}

function openPopupImage(imageUrl, name) {
  popupWithImage.open(imageUrl, name);
}

// Функция обрабатки отправку формы добавления новой карточки
function handleAddFormSubmit(inputValues) {
  const nameInputValue = inputValues["name-place"];
  const urlInputValue = inputValues.url;
  classPopupWithFormAdd.showPreloader();
  api
    .addNewCardApi(nameInputValue, urlInputValue)
    .then((data) => {
      const cardElement = createCard(data);
      section.addItem(cardElement);
      classPopupWithFormAdd.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      classPopupWithFormAdd.showPreloader(false);
    });
}

// Функция для включения валидации форм на странице
const validators = {};
function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    const validator = new FormValidator(config, form);
    validator.enableValidation();
    validators[form.getAttribute("name")] = validator;
  });
}

//Обработчики событий:
editButtonElement.addEventListener("click", handleEditButtonClick);
addButtonElement.addEventListener("click", () => {
  classPopupWithFormAdd.open();
  validators[classPopupWithFormAdd.getFormName()].toggleButtonState();
});

// Оработчик клика для открытия модального попап-окна
avatarElement.addEventListener("click", () => {
  popupEditAvatar.open();
  validators[popupEditAvatar.getFormName()].toggleButtonState();
});

//Закртыие форм по крестику
popupWithImage.setEventListeners();
classPopupWithFormEdit.setEventListeners();
classPopupWithFormAdd.setEventListeners();
popupDelete.setEventListeners();
popupEditAvatar.setEventListeners();

//Вызов функций
enableValidation(validationConfig);