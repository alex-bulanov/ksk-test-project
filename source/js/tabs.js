(function () {
  const tabsItems = document.querySelectorAll('.tabs__item');
  const tabsTriggers = document.querySelectorAll('.tabs__trigger');

  let isInit = false;

  function tabToggle(event) {
    event.preventDefault();
    const currentTabId = event.target.getAttribute('href').replace('#', '');

    tabsTriggers.forEach((trigger) => {
      trigger.classList.remove('tabs__trigger--active');
    });

    tabsItems.forEach((item) => {
      item.classList.remove('tabs__item--show');
    });

    document.querySelector('#' + currentTabId).classList.add('tabs__item--show');
    event.target.classList.add('tabs__trigger--active');
  }


  function tabsInit() {
    if (!isInit) {

      isInit = true;

      tabsItems.forEach((item) => {
        item.classList.add('tabs__item--active');
      });

      tabsTriggers.forEach((item) => {
        item.addEventListener('click', tabToggle);
      });
    }

    document.querySelector('.tabs__trigger').click();
  }

  function tabsDestroy() {
    if (isInit) {

      isInit = false;

      tabsTriggers.forEach((trigger) => {
        trigger.classList.remove('tabs__trigger--active');
        trigger.removeEventListener('click', tabToggle);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth >= window.utils.TABLET_WIDTH) {
      tabsInit();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth < window.utils.TABLET_WIDTH) {
      tabsDestroy();
    }

    if (window.innerWidth >= window.utils.TABLET_WIDTH) {
      tabsInit();
    }
  });
})();
