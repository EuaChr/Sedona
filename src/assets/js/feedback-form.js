'use strict';
(function () {
  const form = document.querySelector('.feedback__form');
  if (form) {
    const popupSuccess = document.querySelector('.popup--success');
    const popupError  = document.querySelector('.popup--error');
    const btnSuccess = popupSuccess.querySelector('button');
    const btnError = popupError.querySelector('button');

    const popup = {
      show: {
        success: function () {
          popupSuccess.style.display = 'flex';
          btnSuccess.addEventListener('click', popup.handler.onSuccessBtn)
        },
        error: function () {
          popupError.style.display = 'flex';
          btnError.addEventListener('click', popup.handler.onSuccessBtn)
        }
      },
      hide: {
        success: function () {
          popupSuccess.style.display = 'none';
          btnSuccess.removeEventListener('click', popup.handler.onSuccessBtn)
        },
        error: function () {
          popupError.style.display = 'none';
          btnError.removeEventListener('click', popup.handler.onSuccessBtn)
        }
      },
      handler: {
        onSuccessBtn: function () {
          popup.hide.success();
        },
        onErrorBtn: function () {
          popup.hide.error();
        }
      }
    };

    const onLoad = function () {
      return popup.show.success();
    };

    const onError = function () {
     return popup.show.error();
    };

    const sendData = function(data, OnLoad, onError) {
     const url = 'https://echo.htmlacademy.ru';
   
     const xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function() {
        if (xhr.status === 200) {
          onLoad(xhr.response);
          console.log(xhr);
        } else {
          onError(xhr);
        }
      });
      xhr.open('POST', url);
      xhr.send(data);
    };

    form.addEventListener('submit', function(evt) {
      evt.preventDefault();
      const dataForm = new FormData(form);

      console.log(dataForm);
      sendData(dataForm, onLoad, onError);
      form.reset();
    });
  };
    
})();