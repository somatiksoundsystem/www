'use strict';

var navigation = document.querySelector('.navigation');
var menu = navigation.querySelector('.navigation__list');
var navigationButton = navigation.querySelector('.navigation__button');

if (navigation) {
  menu.classList.remove('navigation__list--nojs');
  navigationButton.classList.remove('navigation__button--nojs');
}

navigationButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  menu.classList.toggle('navigation__list--open');
  navigationButton.classList.toggle('navigation__button--open');
});
