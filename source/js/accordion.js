(function () {
  const accordion = document.querySelector('.accordion');
  const accordionItems = document.querySelectorAll('.accordion__item');
  const accordionTriggers = document.querySelectorAll('.accordion__trigger');
  let isInit = false;

  function accordionToggle(event) {
    const currentAccordionItem = event.target.parentNode;
    const currentAccordionContent = event.target.nextElementSibling;

    if (currentAccordionItem.dataset.open === 'false') {
      currentAccordionItem.dataset.open = 'true';
      currentAccordionItem.classList.add('accordion__item--show');
      currentAccordionContent.style.maxHeight = currentAccordionContent.scrollHeight + 'px';
    } else {
      currentAccordionItem.dataset.open = 'false';
      currentAccordionItem.classList.remove('accordion__item--show');
      currentAccordionContent.style.maxHeight = null;
    }
  }

  function accordionInit() {
    if (!isInit) {

      isInit = true;

      accordion.classList.add('accordion--active');

      accordionTriggers.forEach((trigger) => {
        trigger.classList.add('accordion__trigger--active');
        trigger.addEventListener('click', accordionToggle);
      });

      accordionItems.forEach((item) => {
        if (item.dataset.open === 'true') {
          item.classList.add('accordion__item--show');
        }
      });
    }
  }

  function accordionDestroy() {
    if (isInit) {
      isInit = false;

      accordion.classList.remove('accordion--active');
      accordionTriggers.forEach((trigger) => {
        trigger.classList.remove('accordion__trigger--active');
        trigger.removeEventListener('click', accordionToggle);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth < window.utils.TABLET_WIDTH) {
      accordionInit();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth < window.utils.TABLET_WIDTH) {
      accordionInit();
    }

    if (window.innerWidth >= window.utils.TABLET_WIDTH) {
      accordionDestroy();
    }
  });
})();
