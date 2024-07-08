let cardNumInput = document.querySelector('#cardNum');
let emailInput = document.querySelector('#email');
let cityInput = document.querySelector('#city');
let stateInput = document.querySelector('#state');
let zipInput = document.querySelector('#zip');
let cvvInput = document.querySelector('#cvv');

//No estoy seguro, pero creo que el HTML ya hace que funcione//
cardNumInput.addEventListener('keyup', () => {
    let cNumber = cardNumInput.value;
    cNumber = cNumber.replace(/\s/g, "");

    if (Number(cNumber)) {
        cNumber = cNumber.match(/.{1,4}/g);
        cNumber = cNumber.join(" ");
        cardNumInput.value = cNumber;
    }
});

//Esto valida el correo, osea, hace que tenga un @ y un punto con letras despues//
emailInput.addEventListener('input', () => {
    let email = emailInput.value;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailInput.setCustomValidity("Correo electrónico no válido");
    } else {
        emailInput.setCustomValidity("");
    }
});

//Hace que solo tenga letras el texto//
cityInput.addEventListener('input', () => {
    cityInput.value = cityInput.value.replace(/[^a-zA-Z\s]/g, '');
});

//Hace que solo tenga letras el texto//
stateInput.addEventListener('input', () => {
    stateInput.value = stateInput.value.replace(/[^a-zA-Z\s]/g, '');
});

//Hace que solo tenga 9 numeros el texto//
zipInput.addEventListener('input', () => {
    zipInput.value = zipInput.value.replace(/[^0-9]/g, '');
    if (zipInput.value.length > 9) {
        zipInput.value = zipInput.value.slice(0, 9);
    }
});

//hace que solo tenga 3 numeros el texto//
cvvInput.addEventListener('input', () => {
    cvvInput.value = cvvInput.value.replace(/[^0-9]/g, '');
    if (cvvInput.value.length > 3) {
        cvvInput.value = cvvInput.value.slice(0, 3);
    }
});
