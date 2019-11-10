'use strict';
(function () {
  const gallery = document.querySelector('.gallery__list');
  if ( gallery) {
    gallery.addEventListener('click', function (evt) {

        let btn = evt.target.closest('.gallery__btn');
        let wrapper = evt.target.closest('.gallery__like');
        let counter = wrapper.querySelector('.gallery__counter');
        let counterNumber = counter.textContent;

        if (btn) {
        if (wrapper.classList.contains('gallery__like--clicked')) {
          counter.textContent = counterNumber - 1;
        } else {
          counter.textContent = +counterNumber + 1;
        }
        wrapper.classList.toggle('gallery__like--clicked');
      }
    });
  }

  
})();