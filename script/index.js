// Находим форму в DOM
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupElement = document.querySelector('.popup');
const popupSubmitData = document.querySelector('.popup__submit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name')
const profileProfession = document.querySelector('.profile__profession');
const popupForm = document.querySelector('.popup__content');



function handleClick(evt) {
    evt.preventDefault();
    
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    openPopup();
}

function openPopup () {
    popupElement.classList.toggle('popup_opened')
}

profileEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent,
    jobInput.value = profileProfession.textContent;

    openPopup();
});

popupCloseButton.addEventListener('click', () => {
    openPopup();
});

popupForm.addEventListener('submit', handleClick)






