'use strict';

var navigation = document.querySelector('.navigation');
var navigationButton = navigation.querySelector('.navigation__button');
var menu = navigation.querySelector('.navigation__list');

navigationButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  menu.classList.toggle('navigation__list--open');
  navigationButton.classList.toggle('navigation__button--close');
});
