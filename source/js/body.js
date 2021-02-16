(function () {
  const TIMEOUT = 200;
  const body = document.querySelector('body');

  function lock() {
    let lockPaddingValue = window.innerWidth - document.querySelector('.container').offsetWidth + 'px';
    body.classList.add('lock');
    body.style.paddingRight = lockPaddingValue;
  }

  function unlock() {
    setTimeout(() => {
      body.style.paddingRight = 0;
      body.classList.remove('lock');
    }, TIMEOUT);
  }

  window.body = {
    lock: lock,
    unlock: unlock,
  }
})();
