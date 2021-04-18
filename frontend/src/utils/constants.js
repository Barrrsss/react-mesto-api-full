//конфиг валидации
export const validationConfig = {
    formSelector: '.popup__fields',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inputInvalidClass: 'popup__field_invalid',
    inputErrorClass: 'popup__field-error',
    buttonInvalidClass: 'popup__button_inactive',
};

//идентификация для Api

const options = {
    url: 'https://krasnov.backendmesto.nomoredomains.club/',
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    }
}
export default options;
