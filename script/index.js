// Находим форму в DOM
let profileEditButton = document.querySelector('.profile__about');
let popupCloseButton = document.querySelector('.popup__close-button');
let popupElement = document.querySelector('.popup');
let popupSubmitData = document.querySelector('.popup__submit-button')

// // Находим поля формы в DOM
// let nameInput = profile__name.querySelector('.nameInput');
// let jobInput = profile__profession.querySelector('.jobInput');

function handleClick(evt) {
    evt.preventDefault('popup__close-button');
    popupElement.classList.toggle('popup__opened');
}

profileEditButton.addEventListener('click', handleClick);
popupCloseButton.addEventListener('click', handleClick);

popupElement.addEventListener('click', (evt)=> {
    if (evt.target === popupElement) {
        popupElement.classList.toggle('popup__opened');
    }
}); 
