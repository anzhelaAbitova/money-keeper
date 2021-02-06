'use strict';

const appDrawer = document.querySelector('.app-drawer');
const makePost = document.querySelector('#makePost');
const userHeader = document.querySelector('.app-cabinet__header-user');
const userDropdown = document.querySelector('.app-cabinet__user-dropdown');

appDrawer.addEventListener('mouseenter', function () {
    appDrawer.classList.toggle('is-open');
    appDrawer.addEventListener('mouseleave', function () {
        appDrawer.classList.toggle('is-open');
    })
})

userHeader.addEventListener('click', function() {
    userDropdown.classList.toggle('is-open');
})