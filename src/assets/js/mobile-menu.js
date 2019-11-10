'use strict';
(function () {
  
  const header = document.querySelector('.main-header');

  const nav = header.querySelector('.main-nav__list');
  const btnOpen = header.querySelector('.main-nav__btn--open');
  const btnClose = header.querySelector('.main-nav__btn--close');
  const tabletWidth = 768;
  let deviceWidth;
  
  header.classList.remove('no-js');
  // btnOpen.style.display = 'block';
  // btnClose.style.display = 'block';

  const navMode = {
    showFlex: function () {
      nav.style.display = 'flex';
      btnClose.addEventListener('click', btnHandler.onBtnClose);
    },

    showBlock: function () {
      nav.style.display = 'block';
      btnClose.addEventListener('click', btnHandler.onBtnClose);
    },

    hide: function () {
      nav.style.display = 'none';
      btnOpen.addEventListener('click', btnHandler.onBtnOpen);
    }
  };

  const btnHandler = {
    onBtnOpen: function() {
      navMode.showBlock();
      btnClose.addEventListener('click', btnHandler.onBtnClose);
      btnOpen.removeEventListener('click', btnHandler.onBtnOpen);
      btnOpen.classList.add('disabled');
    },
    onBtnClose: function() {
      navMode.hide();
      btnClose.removeEventListener('click', btnHandler.onBtnClose);
      btnOpen.addEventListener('click', btnHandler.onBtnOpen);
      btnOpen.classList.remove('disabled');
    },
  }

 

  function hideNav() {
    deviceWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    if (deviceWidth < tabletWidth) {
      navMode.hide();
    } 
      else if (deviceWidth >= tabletWidth) {
        navMode.showFlex();
    }
  };

  hideNav();
  window.addEventListener('resize', hideNav);

})();