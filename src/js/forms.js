//helper functions
const appendInputInvalidWarningToNode = (inputContainer, inputName) => {
    const invalidInputLabel = document.createElement("div");
    invalidInputLabel.innerText = "To pole jest wymagane";
    invalidInputLabel.classList.add("form__input__warning--invalid");
    invalidInputLabel.id = "warning-invalid-" + inputName;
    inputContainer.appendChild(invalidInputLabel);
}

const removeInputInvalidWarningById = (inputName) => {
    const invalidInputLabel = document.getElementById("warning-invalid-" + inputName);
    invalidInputLabel.remove();
}

const showSuccessMessage = (container, message) => {
    const successMsg = document.createElement("div");
    successMsg.innerText = message;
    successMsg.classList.add("form__submit-message--success");
    container.appendChild(successMsg);
}

export const switchForms = (e, formContainers) => {
    const switchTo = e.target.id.replace('to-', '') + '-form-container';

    formContainers.forEach(form => {
        const isCurrentVisible = form.id != switchTo && !form.classList.contains("form-container--hidden");
        const isTargetInvisible = form.id == switchTo && form.classList.contains("form-container--hidden");
        if (isCurrentVisible || isTargetInvisible) {
            form.classList.toggle("form-container");
            form.classList.toggle("form-container--hidden");
        }
    })
}

export const animateInputPlaceholders = (e) => {
    const { target: input } = e;
    const label = document.getElementById("label-" + input.name);

    if ((!input.value || input.value === "") && label.classList.contains("form__input__label") && !label.classList.contains("form__input__label--focused")) {
        label.classList.toggle("form__input__label");
        label.classList.toggle("form__input__label--focused");
    }
}

export const resetInputPlaceholders = (e) => {
    const { target: input } = e;
    const label = document.getElementById("label-" + input.name);

    if ((!input.value || input.value === "") && label.classList.contains("form__input__label--focused") && !label.classList.contains("form__input__label")) {
        label.classList.toggle("form__input__label");
        label.classList.toggle("form__input__label--focused");
    }

    validateFormInputs(e);
}

export const validateFormInputs = (e) => {
    const { target: input } = e;
    const inputContainer = input.parentNode;

    if ((!input.value || input.value === "") && !input.classList.contains("form__input--invalid")) {
        input.classList.add("form__input--invalid");
        appendInputInvalidWarningToNode(inputContainer, input.name);

    } else if (input.value && input.value !== "" && input.classList.contains("form__input--invalid")) {
        input.classList.remove("form__input--invalid");
        removeInputInvalidWarningById(input.name);
    }
}

export const togglePassword = (e) => {
    const { target: toggleIcon } = e;
    const inputId = toggleIcon.id.replace("show-", "").replace("hide-", "");
    const passwordInput = document.getElementById(inputId);

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else if (passwordInput.type === "text") {
        passwordInput.type = "password";
    }

    const toggleShowIcon = document.getElementById("show-" + inputId);
    const toggleHideIcon = document.getElementById("hide-" + inputId);

    toggleShowIcon.classList.toggle("hidden");
    toggleHideIcon.classList.toggle("hidden");
}

export const toggleSwitch = (e) => {
    const toggleSwitchContainer = e.currentTarget;
    const switchInputElementId = toggleSwitchContainer.id.replace("switch-", "");

    const switchInputElement = document.getElementById(switchInputElementId);
    switchInputElement.checked = !switchInputElement.checked;
}

export const submitLoginForm = (e) => {
    e.preventDefault();
    const { target: form } = e;
    const formData = Object.fromEntries(new FormData(form).entries());
    form.classList.toggle('hidden');
    const formContainer = form.parentNode;
    showSuccessMessage(formContainer, "Jesteś pomyślnie zalogowany!");
}

export const submitRegisterForm = (e) => {
    e.preventDefault();
    const { target: form } = e;
    const formData = Object.fromEntries(new FormData(form).entries());
    form.classList.toggle('hidden');
    const formContainer = form.parentNode;
    showSuccessMessage(formContainer, "Jesteś pomyślnie zarejestrowany!");
}