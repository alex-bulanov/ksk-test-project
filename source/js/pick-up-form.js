(function () {
  const pickUpForm = document.querySelector('.pick-up-form');
  const pickUpFormInputs = document.querySelectorAll('.pick-up-form__input');
  const pickUpFormBtn = document.querySelector('.pick-up-form__button');
  const labels = pickUpForm.querySelectorAll('.form__label');
  const lastLabel = labels[labels.length - 1];

  let isErrorValidate = false;

  function showError() {
    let errorMessage = pickUpForm.querySelector('.form__label + p');

    if (!errorMessage) {
      errorMessage = document.createElement('p');
      errorMessage.classList.add('form__error-message');
      errorMessage.textContent = window.const.ErrorMessages[7];
      // lastLabel.after(errorMessage);
      lastLabel.parentNode.insertBefore(errorMessage, lastLabel.nextSibling);

    } else {
      errorMessage.textContent = window.const.ErrorMessages[7];
    }
  }

  function cleanError() {
    const errorMessage = lastLabel.nextElementSibling;

    if (errorMessage && errorMessage.classList.contains('form__error-message')) {
      errorMessage.remove();
    }
  }

  function getFormData(form) {
    let data = {};

    for (let i = 0; i < form.elements.length; i++) {
      let element = form.elements[i];

      if (element.tagName.toLowerCase() !== 'button' && element.checked == true) {
        data[element.value] = element.checked;
      }
    }

    return data;
  }

  function validateForm(event) {
    event.preventDefault();
    isErrorValidate = false;

    let formData = getFormData(pickUpForm);

    if (Object.keys(formData).length === 0) {
      isErrorValidate = true;
      showError();
    }

    if (!isErrorValidate) {
      window.backend.sendFormData(pickUpForm);
    }

    return false;
  }

  pickUpFormInputs.forEach((input) => {
    input.addEventListener('click', function () {
      cleanError();
    })
  })

  pickUpFormBtn.addEventListener('click', validateForm);
})();
