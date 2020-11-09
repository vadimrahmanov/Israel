(function () {
  import swiper from '../node_modules/swiper/bundle';
  const swiper = new Swiper();

  var mySwiper = new Swiper('.israel__slider', {
  // Optional parameters
    direction: 'horizontal',
    loop: true,

  // If we need pagination
    pagination: {
      el: '.israel__paginator',
    }
  })
})();
