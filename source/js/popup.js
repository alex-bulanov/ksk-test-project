(function () {
  const ESC_KEYCODE = 27;

  const popup = document.querySelector('.popup');
  const popupCloseItem = document.querySelectorAll('.popup-close');

  let popupTitle = document.querySelector('.popup__title');
  let popupText = document.querySelector('.popup__text');

  function onEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      const popup = document.querySelector('.popup--open');
      popup.classList.remove('popup--open');
      window.body.unlock();
    }
  }

  function close(popup) {
    popup.classList.remove('popup--open');
    popupTitle.textContent = '';
    popupText.textContent = '';

    document.removeEventListener('keydown', onEscPress);
    window.body.unlock();
  }

  function open(message) {
    const {
      title = '',
      text = '',
    } = message;

    popup.classList.add('popup--open');
    window.body.lock();

    popupTitle.textContent = title;
    popupText.textContent = text;

    popupCloseItem.forEach((item) => {
      item.addEventListener('click', () => {
        close(item.closest('.popup'));
      });
    })


    popup.addEventListener('click', function (evt) {
      if (!evt.target.closest('.popup__body')) {
        close(evt.target.closest('.popup'));
      }
    })

    document.addEventListener('keydown', onEscPress);
  }

  window.popup = {
    open: open,
  }
})();
