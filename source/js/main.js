'use strict';
/* eslint-env es6 */

(function () {
  var requestModal = document.querySelector('.modal-call-request');
  var requestOpen = document.querySelector('.header__navigation-list-link--call-request');
  var requestClose = document.querySelector('.modal-call-request__close');
  var requestForm = document.querySelector('.modal-call-request form');
  var formName = requestForm.querySelector('#name');
  var formTelephone = requestForm.querySelector('#number');
  var enquiryForm = document.querySelector('.enquiry form');
  var enquiryNumber = enquiryForm.querySelector('#number2');
  var isStorageSupport = true;
  var successModal = document.querySelector('.modal-call-success');
  var successCloseBtn = successModal.querySelector('.modal-call-success__close');
  var successOkayBtn = successModal.querySelector('.modal-call-success__okay');
  var programmeContent = document.querySelectorAll('.all-programmes__tabs-content-item');
  var faqItem = document.querySelectorAll('.faq__content li');
  var faqText = document.querySelectorAll('.faq__content p');
  var feedbackSlide = document.querySelectorAll('.feedback__slide');
  var storageName = '';
  var storagePhone = '';
  var storageEnqPhone = '';

  try {
    storageName = localStorage.getItem('name');
    storagePhone = localStorage.getItem('phone');
    storageEnqPhone = localStorage.getItem('enqPhone');
  } catch (err) {
    isStorageSupport = false;
  }

  if (storageEnqPhone) {
    enquiryNumber.value = storageEnqPhone;
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

  enquiryForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (isStorageSupport) {
      localStorage.setItem('enqPhone', enquiryNumber.value);
    }
    onSuccess();
  });

  for (var c = 0; c < faqItem.length; c++) {
    faqText[c].classList.add('faq-hidden');
    faqItem[c].addEventListener('click', function (evt) {
      evt.preventDefault();
      evt.currentTarget.classList.toggle('faq-visible-li');
      evt.currentTarget.querySelector('p').classList.toggle('faq-visible');
    });
  }

  for (var f = 0; f < feedbackSlide.length; f++) {
    feedbackSlide[f].classList.add('feedback-hidden');
  }

  for (var j = 0; j < programmeContent.length; j++) {
    programmeContent[j].classList.add('programme-content-hide');
  }

  class Tabs {
    constructor() {
      this.tabList = document.querySelectorAll('.all-programmes__tabs-btn');
      this.contentList = document.querySelectorAll('.all-programmes__tabs-content-item');
      var nav = document.querySelector('.all-programmes__tabs-controls');

      nav.addEventListener('click', e => this.show(e));

      this.setIndex();
    }

    show(e) {
      var t = e.target;
      if (!t.classList.contains('all-programmes__tabs-btn')) {
        return;
      }
      this.removePrev();

      var index = t.getAttribute('data-index');
      var content = document.querySelector('.all-programmes__tabs-content-item[data-index="' + index + '"]');

      t.classList.add('programme-btn-current');
      content.classList.add('programme-content-current');
    }

    setIndex() {
      for (var i = 0; i < this.tabList.length; i++) {
        this.tabList[i].setAttribute('data-index', i);
        this.contentList[i].setAttribute('data-index', i);
      }
    }

    removePrev() {
      for (var i = 0; i < this.tabList.length; i++) {
        this.tabList[i].classList.remove('programme-btn-current');
        this.contentList[i].classList.remove('programme-content-current');
      }
    }
  }

  document.addEventListener('DOMContentLoaded', ()=> {
    // eslint-disable-next-line no-unused-vars
    var tabs = new Tabs();
  });
})();
