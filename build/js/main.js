'use strict';

(function () {
  var requestModal = document.querySelector('.modal-call-request');
  var requestOpen = document.querySelector('.header__navigation-list-link--call-request');
  var requestClose = document.querySelector('.modal-call-request__close');

  function openRequestPopup() {
    requestModal.classList.add('request-open');
  }

  function closeRequestPopup() {
    requestModal.classList.remove('request-open');
  }

  requestOpen.addEventListener('click', function (e) {
    e.preventDefault();
    openRequestPopup();
  });

  requestClose.addEventListener('click', function () {
    closeRequestPopup();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closeRequestPopup();
    }
  });

  document.addEventListener('click', function (e) {
    if (e.target === requestModal) {
      closeRequestPopup();
    }
  });
})();
