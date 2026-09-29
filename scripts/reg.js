const radiosBlock = document.getElementById('radios');
const loginsBlock = document.getElementById('logins');

const radio_email = radiosBlock?.querySelector('input#email');
const radio_login = radiosBlock?.querySelector('input#login');
const radio_phone = radiosBlock?.querySelector('input#phone');

const item_email = loginsBlock?.querySelector('#template-email');
const item_login = loginsBlock?.querySelector('#template-nickname');
const item_phone = loginsBlock?.querySelector('#template-phone');

const passwords = document.querySelectorAll('.password:not([hidden])');

radio_email.addEventListener('change', ()=>{showHideBlock(item_email, item_login, item_phone)});
radio_login.addEventListener('change', ()=>{showHideBlock(item_login, item_email, item_phone)});
radio_phone.addEventListener('change', ()=>{showHideBlock(item_phone, item_email, item_login)});

const showPasswordBlock1 = document.getElementById('toggle-pass');
const showPasswordBlock2 = document.getElementById('toggle-pass2');
showPasswordBlock1?.addEventListener('click', () => {changePasswordVisibility(passwords[0], showPasswordBlock1)});
showPasswordBlock2?.addEventListener('click', () => {changePasswordVisibility(passwords[1], showPasswordBlock2)});

function changePasswordVisibility(inputElement, inputButton) {
    try {
        if (!inputButton || !(inputButton instanceof HTMLButtonElement))
            {throw new Error(`Аргумент 2 представляет собой не <button> (Передано ${inputButton})`)}
        if (!inputElement || !(inputElement instanceof HTMLInputElement))
            {throw new Error(`Аргумент 1 представляет собой не <input> (Передано ${inputElement})`)}
        if (!inputButton?.hasAttribute("state")) {throw new Error("Кнопка не имеет атрибута state")}
        // получение состояния
        let local_state = inputButton?.getAttribute("state") === "true";
        // смена состояния
        local_state = !local_state;
        inputElement?.setAttribute("type", local_state ? "text" : "password");
        inputButton.setAttribute("state", local_state);
        inputElement.focus();
    } catch (error) {console.error(error);}
}

let showHideBlock = (showBlock, ...hideBlocks) => {
    if (showBlock instanceof Element) {showBlock?.removeAttribute('hidden')}

    [...hideBlocks].forEach(element => {
        if (element instanceof Element) element?.setAttribute('hidden','')});
}

document.querySelector('#reg-form > button[type="submit"]');

window.addEventListener('beforeunload', function (event) {
    if (hasUnsavedData()) {
        event.preventDefault();
        event.returnValue = 'Вы уверены, что хотите покинуть страницу?'; 
    }
});

function hasUnsavedData() {
    const fields = [radio_email, radio_login, radio_phone, passwords?.[0], passwords?.[1]];
    return fields.some(field => field?.value?.trim().length > 0);
}

// Исправленная функция перехода с отменой стандартного действия
function navigateTo(event, link = "landing.html") {
    // Блокируем стандартный переход по ссылке href, чтобы не было двойного срабатывания
    if (event && event.preventDefault) {
        event.preventDefault();
    }
    window.location.href = link; 
}