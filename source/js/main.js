'use strict';
/* eslint-env es6 */

(function () {
  var body = document.querySelector('body');
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
  var curatorForm = document.querySelector('.info__questions form');
  var curatorName = curatorForm.querySelector('#name3');
  var curatorPhone = curatorForm.querySelector('#number3');
  var storageName = '';
  var storagePhone = '';
  var storageEnqPhone = '';
  var storageCuratorName = '';
  var storageCuratorPhone = '';
  var $ = window.jQuery;

  try {
    storageName = localStorage.getItem('name');
    storagePhone = localStorage.getItem('phone');
    storageEnqPhone = localStorage.getItem('enqPhone');
    storageCuratorName = localStorage.getItem('curName');
    storageCuratorPhone = localStorage.getItem('curPhone');
  } catch (err) {
    isStorageSupport = false;
  }

  function openPopup(modalWindow) {
    modalWindow.classList.add('request-open');
    body.classList.add('nav-opened');
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
    body.classList.remove('nav-opened');
    closePopup(requestModal);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      body.classList.remove('nav-opened');
      closePopup(requestModal);
      closePopup(successModal);
    }
  });

  document.addEventListener('click', function (e) {
    if (e.target === requestModal) {
      body.classList.remove('nav-opened');
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
    body.classList.remove('nav-opened');
    closePopup(successModal);
  });

  successOkayBtn.addEventListener('click', function () {
    body.classList.remove('nav-opened');
    closePopup(successModal);
  });

  document.addEventListener('click', function (e) {
    if (e.target === successModal) {
      body.classList.remove('nav-opened');
      closePopup(successModal);
    }
  });

  if (storageEnqPhone) {
    enquiryNumber.value = storageEnqPhone;
  }

  enquiryForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (isStorageSupport) {
      localStorage.setItem('enqPhone', enquiryNumber.value);
    }
    onSuccess();
  });

  if (storageCuratorName) {
    curatorName.value = storageCuratorName;
  }

  if (storageCuratorPhone) {
    curatorPhone.value = storageCuratorPhone;
  }

  curatorForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (isStorageSupport) {
      localStorage.setItem('curName', curatorName.value);
      localStorage.setItem('curPhone', curatorPhone.value);
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
    faqItem[c].addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        evt.currentTarget.classList.toggle('faq-visible-li');
        evt.currentTarget.querySelector('p').classList.toggle('faq-visible');
      }
    });
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

  document.addEventListener('DOMContentLoaded', () => {
    // eslint-disable-next-line no-unused-vars
    var tabs = new Tabs();
  });


  var $homeSlider = $('.israel__slider');

  $(window).resize(function () {
    showHomeSlider();
  });

  function showHomeSlider() {
    if ($homeSlider.data('owlCarousel') !== 'undefined') {
      if (window.matchMedia('(max-width: 1023px)').matches) {
        initialHomeSlider();
      } else {
        destroyHomeSlider();
      }
    }
  }
  showHomeSlider();

  function initialHomeSlider() {
    $homeSlider.addClass('owl-carousel').owlCarousel({
      items: 1,
      loop: false,
      autoplay: false,
      smartSpeed: 250
    });
  }

  function destroyHomeSlider() {
    $homeSlider.trigger('destroy.owl.carousel').removeClass('owl-carousel');
  }

  var owlFeedback = $('.feedback__slider');
  owlFeedback.addClass('owl-carousel').owlCarousel({
    items: 1,
    loop: false,
    onInitialized: showsTotalAndCurrentItem,
    onTranslated: showsTotalAndCurrentItem,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    startPosition: 2,
    slideTransition: '',
    info: true,
    dots: false
  });
  owlFeedback.owlCarousel();
  // Go to the next item
  $('.feedback__button--next').click(function () {
    owlFeedback.trigger('next.owl.carousel');
  });
  // Go to the previous item
  $('.feedback__button--prev').click(function () {
    // With optional speed parameter
    // Parameters has to be in square bracket '[]'
    owlFeedback.trigger('prev.owl.carousel', [300]);
  });

  function showsTotalAndCurrentItem(event) {
    // eslint-disable-next-line no-unused-vars
    var element = event.target; // DOM element
    var items = event.item.count; // Number of items
    var item = event.item.index + 1; // Position of the current item

    if (item > items) {
      item = item - items;
    }

    $('#counter').text(item + ' / ' + items);
  }

  // eslint-disable-next-line no-undef
  svg4everybody();
})();
