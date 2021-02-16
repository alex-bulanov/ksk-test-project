(function () {
  const deliveryForm = document.querySelector('.delivery-form');
  const deliveryFormInputs = document.querySelectorAll('.delivery-form__input');
  const deliveryFormBtn = document.querySelector('.delivery-form__button');

  let isErrorValidate = false;

  function cleanError(element) {
    const errorMessage = element.nextElementSibling;

    element.classList.remove('form__input--error');

    if (errorMessage && errorMessage.classList.contains('form__error-message')) {
      errorMessage.remove();
    }
  }

  function showError(property, error, form) {
    const formElement = form.querySelector('[name=' + property + ']');
    formElement.classList.add('form__input--error');
    let errorMessage = form.querySelector('[name=' + property + '] + p');

    if (!errorMessage) {
      errorMessage = document.createElement('p');
      errorMessage.classList.add('form__error-message');
      errorMessage.textContent = error;
      // formElement.after(errorMessage);
      formElement.parentNode.insertBefore(errorMessage, formElement.nextSibling);

    } else {
      errorMessage.textContent = error;
    }
  }

  function getError(formData, property) {
    let error = '';

    const validate = {
      'name': function () {
        if (formData.name.length === 0) {
          error = window.const.ErrorMessages[0];
        }
        else if (window.utils.PATTERNS.name.test(formData.name) === false) {
          error = window.const.ErrorMessages[4];
        }
      },
      'phone': function () {
        if (formData.phone.length === 0) {
          error = window.const.ErrorMessages[2];
        }
        else if (window.utils.PATTERNS.phone.test(formData.phone) === false) {
          error = window.const.ErrorMessages[5];
        }
      },
      'address': function () {
        if (formData.address.length === 0) {
          error = window.const.ErrorMessages[1];
        }
        else if (window.utils.PATTERNS.spam.test(formData.address) === false) {
          error = window.const.ErrorMessages[6];
        }
      },
      'message': function () {
        if (formData.message.length === 0) {
          error = window.const.ErrorMessages[3];
        }
        else if (window.utils.PATTERNS.spam.test(formData.message) === false) {
          error = window.const.ErrorMessages[6];
        }
      },
    }

    validate[property]();
    return error;
  }

  function getFormData(form) {
    let data = {};

    for (let i = 0; i < form.elements.length; i++) {
      let element = form.elements[i];

      if (element.tagName.toLowerCase() !== 'button') {
        data[element.name] = element.value;
      }
    }

    return data;
  }

  function validateForm(event) {
    event.preventDefault();
    let error = '';
    let formData = getFormData(deliveryForm);

    for (let property in formData) {
      isErrorValidate = false;
      error = '';

      error = getError(formData, property);

      if (error.length !== 0) {
        isErrorValidate = true;

        showError(property, error, deliveryForm);
      }
    }

    if (!isErrorValidate) {
      window.backend.sendFormData(deliveryForm);
    }

    return false;
  }

  deliveryForm.addEventListener('focus', function () {
    const element = document.activeElement;

    if (element !== deliveryFormBtn) cleanError(element);
  }, true);

  [].forEach.call(deliveryFormInputs, function (element) {
    element.addEventListener('blur', function (event) {
      const formElement = event.target;
      const property = formElement.getAttribute('name');
      let dataField = {};

      dataField[property] = formElement.value;

      const error = getError(dataField, property);

      if (error.length != 0) {
        showError(property, error, deliveryForm);
      }

      return false;
    });
  });

  deliveryFormBtn.addEventListener('click', validateForm);
})();
