"use strict";

// Navbar Toggler For Mobile
const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

navToggler.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

// Header
// Header visible when window scroll down to 180px
const header = document.querySelector("[data-header]");
const activeElementOnScroll = function () {
  header.classList[this.window.scrollY >= 180 ? "add" : "remove"]("active");
};

window.addEventListener("scroll", activeElementOnScroll);
