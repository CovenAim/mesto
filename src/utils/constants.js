const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
  
  const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    disabledButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
  };
  
  const editButtonElement = document.querySelector('.profile__info-edit-button'); //Находим кнопку редактирования профиля
  const popupEditForm = document.querySelector('.popup_form_edit'); //Находим попап форму редактирования
  const editForm = popupEditForm.querySelector('.edit-form'); //Поиск формы редактирования

  const addButtonElement = document.querySelector('.profile__add-button'); //Находим кнопку добавления нового места
  const popupAddForm = document.querySelector('.popup_form_add'); //Контейнер добавления нового места
  const addForm = popupAddForm.querySelector('.add-form'); //Находим саму форму добавления нового места

  const inputName = document.querySelector('input[name="name"]'); //Поиск элемента input, у которого атрибут равен name
  const inputDescription = document.querySelector('input[name="description"]'); //Поиск элемента input, у которого атрибут равен description

  const cardsContainer = document.querySelector('.elements'); //Находим поле для создания карточек
  
  const nameElement = document.getElementById('name-place'); //Переменная с ID имени формы добавления карточки
  const urlElement = document.getElementById('url'); //Переменная с ID url формы добавления карточки

  const closeButtons = document.querySelectorAll('.popup-close') //Поиск всех кнопок закрытия попапов

  const optionsApi = { 
    url: 'https://mesto.nomoreparties.co/v1/cohort-77', 
    headers: {
      authorization: '43b2e2cc-8a7b-4ed3-960a-60ded3da371d',
      'Content-Type': "application/json"
    }
  };


  export {
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
    inputDescription,
    optionsApi
  };
