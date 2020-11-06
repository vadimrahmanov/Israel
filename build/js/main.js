'use strict';

(function () {
  var requestModal = document.querySelector('.modal-call-request');
  var requestOpen = document.querySelector('.header__navigation-list-link--call-request');
  var requestClose = document.querySelector('.modal-call-request__close');
  var requestForm = document.querySelector('.modal-call-request form');
  var formName = requestForm.querySelector('#name');
  var formTelephone = requestForm.querySelector('#number');
  var isStorageSupport = true;
  var successModal = document.querySelector('.modal-call-success');
  var successCloseBtn = successModal.querySelector('.modal-call-success__close');
  var successOkayBtn = successModal.querySelector('.modal-call-success__okay');
  var storageName = '';
  var storagePhone = '';

  try {
    storageName = localStorage.getItem('name');
    storagePhone = localStorage.getItem('phone');
  } catch (err) {
    isStorageSupport = false;
  }

  function openPopup(modalWindow) {
    modalWindow.classList.add('request-open');
  }

  function closePopup(modalWindow) {
    modalWindow.classList.remove('request-open');
  }

  function onSuccess() {
    closePopup(requestModal);
    openPopup(successModal);
  }

  requestOpen.addEventListener('click', function (e) {
    e.preventDefault();
    openPopup(requestModal);
    if (storageName) {
      formName.value = storageName;
    } else {
      formName.focus();
    }

    if (storagePhone) {
      formTelephone.value = storagePhone;
    } else {
      formTelephone.focus();
    }
  });

  requestClose.addEventListener('click', function () {
    closePopup(requestModal);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(requestModal);
      closePopup(successModal);
    }
  });

  document.addEventListener('click', function (e) {
    if (e.target === requestModal) {
      closePopup(requestModal);
    }
  });

  requestForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (isStorageSupport) {
      localStorage.setItem('name', formName.value);
      localStorage.setItem('phone', formTelephone.value);
    }
    onSuccess();
  });

  successCloseBtn.addEventListener('click', function () {
    closePopup(successModal);
  });

  successOkayBtn.addEventListener('click', function () {
    closePopup(successModal);
  });

  document.addEventListener('click', function (e) {
    if (e.target === successModal) {
      closePopup(successModal);
    }
  });
})();
