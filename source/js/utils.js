(function () {
  const PATTERNS = {
    name: /^[А-Яа-яЁё\-\s]+$/,
    phone: /\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}/,
    spam: /[^\<\>\[\]%\&'`]+$/,
  };


  const TABLET_WIDTH = 768;


  function onSuccess(form) {
    const sendBtn = form.querySelector('.form__button');
    sendBtn.removeAttribute('disabled');
    form.reset();

    const message = {
      title: 'Успешно!',
      text: 'Сообщение отправлено',
    }

    window.popup.open(message);
  }

  function onError(form, error) {
    const sendBtn = form.querySelector('.form__button');
    sendBtn.removeAttribute('disabled');

    const message = {
      title: 'Упс!',
      text: 'Ошибка: ' + error,
    };

    window.popup.open(message);
  }

  window.utils = {
    PATTERNS: PATTERNS,
    TABLET_WIDTH: TABLET_WIDTH,
    onSuccess: onSuccess,
    onError: onError,
  };
})();
