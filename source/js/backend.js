(function () {

  const URL = '#' //адрес php-скрипта
  // const URL = 'http://www.alex-bulanov.ru/mailer/smart.php';


  function sendFormData(form) {
    const sendBtn = form.querySelector('.form__button');
    sendBtn.setAttribute('disabled', 'true');

    const data = new FormData(form);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', URL);

    xhr.onreadystatechange = function () {
      let error = '';

      if (xhr.readyState !== 4) return;

      switch (xhr.status) {
        case 0:
          error = 'Проверьте подключение к сети';
          break;
        case 200:
          window.utils.onSuccess(form);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Серевер не найден';
          break;

        default:
          error = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        window.utils.onError(form, error)
      }
    };

    xhr.timeout = 2000;
    xhr.send(data);
  }

  window.backend = {
    sendFormData: sendFormData,
  };
})();
