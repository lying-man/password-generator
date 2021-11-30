
"use strict";

let english = false;
let russian = false;
let upper = false;
let optional = false;
let lengthSymbols = 8;

let customSymbols = false;

let arrEnglish = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "y", "z"];
let arrRussian = ["а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ь", "ы", "ю", "я", "э"];
let arrOptional = ["~", "`", "@", "#", "№", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", ":", "?", "|", "/"];
let arrNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];


const inputPassword = document.querySelector(".password");
const btnCopy = document.querySelector(".copy-pass");
const overflow = document.querySelector(".overflow");


//settings
const englishEnabled = document.querySelector(".english");
const russianEnabled = document.querySelector(".russian");
const upperEnabled = document.querySelector(".upper");
const optionalEnabled = document.querySelector(".optional");

//add settings
const addBtnOpen = document.querySelector(".open-add-settings");

//stepper
const stepperInput = document.querySelector(".length");
const btnUp = document.querySelector(".btn-up");
const btnDown = document.querySelector(".btn-down");

const generatePassBtn = document.querySelector(".generate");
const generateSecond = document.querySelector(".second");

//add settings modal
const addSettingsBlock = document.querySelector(".add-settings");
const addSettingsInput = document.querySelector(".add-set-input");
const addSettingsBtn = document.querySelector(".submit-add-symbols");

const error = document.querySelector(".error");
const errorClose = document.querySelector(".close-error");

const hintCopy = document.querySelector(".hint-copy");

//spoiler
const spoiler = document.querySelector(".spoiler-add");
const spoilerTitle = document.querySelector(".spoiler-add-title");

addSettingsInput.addEventListener("focus", () => closeSpoiler());

spoilerTitle.addEventListener("click", () => {

    if (spoiler.classList.contains("spoiler-add_active")) {
        closeSpoiler();
    } else {
        spoilerTitle.classList.add("spoiler-add-title_active");
        spoiler.classList.add("spoiler-add_active");
        spoiler.style.maxHeight = `${spoiler.scrollHeight}px`;
    }

});

function closeSpoiler() {
    spoilerTitle.classList.remove("spoiler-add-title_active");
    spoiler.classList.remove("spoiler-add_active");
    spoiler.style.maxHeight = "";
}

btnCopy.addEventListener("click", () => {

    let val = inputPassword.value.trim();

    if (val === "") {
        hintCopy.classList.add("hint-copy_error");
        hintCopy.textContent = "Сгенерируйте пароль";
    } else {
        hintCopy.classList.remove("hint-copy_error");
        hintCopy.textContent = "Пароль успешно скопирован";
        navigator.clipboard.writeText(val);
    }
    
    setTimeout(() => {
        hintCopy.classList.add("hint-copy_active");
    }, 100);

    setTimeout(() => {
        hintCopy.classList.remove("hint-copy_active");
    }, 1400);

});

overflow.addEventListener("click", closeModals);

addBtnOpen.addEventListener("click", () => {
    overflow.classList.add("overflow_active");
    addSettingsBlock.classList.add("add-settings_active");

    setTimeout(() => {
        addSettingsInput.focus();
    }, 300);
});

let hasSymbols = false;
let content = "";

function submitChange() {
    overflow.classList.remove("overflow_active");
    addSettingsBlock.classList.remove("add-settings_active");

    if (addSettingsInput.value.trim() !== "") {
        content = addSettingsInput.value;
        customSymbols = addSettingsInput.value.split("");
        hasSymbols = true;
    } else {
        content = "";
        customSymbols = false;
        hasSymbols = false;
    }

}

addSettingsBtn.addEventListener("click", submitChange);
errorClose.addEventListener("click", closeModals);

generatePassBtn.addEventListener("click", generate);
generateSecond.addEventListener("click", generate);

btnUp.addEventListener("click", () => {

    if (checkStepper()) {
        return;
    }

    let num = Number(stepperInput.value);

    if (num + 1 > 100) {
        return;
    }

    num = num + 1;

    stepperInput.value = num;

});

btnDown.addEventListener("click", () => {

    if (checkStepper()) {
        return;
    }

    let num = Number(stepperInput.value);

    if (num - 1 < 4) {
        return;
    }

    num = num - 1;

    stepperInput.value = num;

});

englishEnabled.addEventListener("change", checkConditions);
russianEnabled.addEventListener("change", checkConditions);
upperEnabled.addEventListener("change", checkConditions);
optionalEnabled.addEventListener("change", checkConditions);

//check condition
function checkConditions() {

    if (englishEnabled.checked) {
        english = true;
    } else {
        english = false;
    }

    if (russianEnabled.checked) {
        russian = true;
    } else {
        russian = false;
    }

    if (upperEnabled.checked) {
        upper = true;
    } else {
        upper = false;
    }

    if (optionalEnabled.checked) {
        optional = true;
    } else {
        optional = false;
    }

}





//generate password
function generate() {

    let PASSWORD = "";
    let mainArr = [];

    if (checkStepper()) {
        overflow.classList.add("overflow_active");
        error.classList.add("error_active");
        return;
    }

    lengthSymbols = Number(stepperInput.value);

    if (customSymbols) {

        while (PASSWORD.length !== lengthSymbols) {
            let randomIndex = Math.floor(Math.random() * customSymbols.length);
            PASSWORD += customSymbols[randomIndex];
        }

        inputPassword.value = PASSWORD;
        return;

    }

    mainArr.push(arrNumbers);

    if (english === true) {
        mainArr.push(arrEnglish);
    }

    if (russian === true) {
        mainArr.push(arrRussian);
    }

    if (optional === true) {
        mainArr.push(arrOptional);
    } 

    for (let elem of mainArr) {
        let randomIndex = Math.floor(Math.random() * mainArr.length);
        let element = elem;
        mainArr.splice(mainArr.indexOf(elem), 1);
        mainArr.splice(randomIndex, 0, element);
    }

    for (let i = 0; i < mainArr.length; i++) {

        let nativeElem = mainArr[i];
        let elem = mainArr[Math.floor(Math.random() * mainArr.length)];

        if (lengthSymbols === PASSWORD.length) {
            inputPassword.value = PASSWORD;
            return;
        }

        let randomDigit = Math.floor(Math.random() * elem.length);

        if (upper === true) {

            if (!isNaN(elem[randomDigit])) {
                PASSWORD += elem[randomDigit];

                if (nativeElem === mainArr[mainArr.length - 1]) {
                    i = -1;
                }

                continue;

            }

            let arr = [true, false];
            let cond = Math.floor(Math.random() * arr.length);

            if (arr[cond]) {
                PASSWORD += elem[randomDigit].toUpperCase();
            } else {
                PASSWORD += elem[randomDigit];
            }

        } else {
            PASSWORD += elem[randomDigit];
        }

        if (nativeElem === mainArr[mainArr.length - 1]) {
            i = -1;
        }

    }


}

//check stepper
function checkStepper() {
    let valueStepper = stepperInput.value;
    valueStepper = valueStepper.trim();

    if (valueStepper === "") {
        return true;
    }

    if (valueStepper === "null" || valueStepper === "true" || valueStepper === "false") {
        return true;
    }

    if (valueStepper.includes(".")) {
        return true;
    }

    if (isNaN(valueStepper)) {
        return true;
    }

    valueStepper = Number(valueStepper);

    if (valueStepper < 4 || valueStepper > 100) {
        return true;
    }

    return false;

}

//close modals
function closeModals() {
    overflow.classList.remove("overflow_active");
    addSettingsBlock.classList.remove("add-settings_active");
    error.classList.remove("error_active");

    if (!hasSymbols) {
        addSettingsInput.value = "";
    }

    if (content !== "") {
        addSettingsInput.value = content;
    }

}












