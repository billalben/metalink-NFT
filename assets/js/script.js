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

// Slider
const sliders = document.querySelectorAll("[data-slider]");

const sliderInit = function (slider) {
  // Scoped within each slider
  const sliderContainer = slider.querySelector("[data-slider-container]");
  const sliderPrevBtn = slider.querySelector("[data-slider-prev]");
  const sliderNextBtn = slider.querySelector("[data-slider-next]");

  // Calculation of total visible items and total items
  const totalSliderVisibleItems = Number(
    getComputedStyle(slider).getPropertyValue("--slider-item")
  );
  const totalSliderItems =
    sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

  // Update button visibility
  function updateButtonVisibility() {
    sliderPrevBtn.disabled = currentSlidePos === 0;
    sliderNextBtn.disabled = currentSlidePos >= totalSliderItems;
  }

  // Move slider item
  function moveSliderItem() {
    const child = sliderContainer.children[currentSlidePos];
    if (child) {
      sliderContainer.style.transform = `translateX(-${child.offsetLeft}px)`;
      updateButtonVisibility();
    }
  }

  // Next slide function
  function slideNext() {
    currentSlidePos =
      currentSlidePos >= totalSliderItems ? 0 : currentSlidePos + 1;
    moveSliderItem();
  }

  // Previous slide function
  function slidePrev() {
    currentSlidePos =
      currentSlidePos <= 0 ? totalSliderItems : currentSlidePos - 1;
    moveSliderItem();
  }

  // Event listeners for next and previous buttons
  sliderNextBtn.addEventListener("click", slideNext);
  sliderPrevBtn.addEventListener("click", slidePrev);

  // Auto slide functionality
  let autoSlideInterval;
  function startAutoSlide() {
    autoSlideInterval = setInterval(slideNext, 4000);
  }
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  slider.addEventListener("mouseover", stopAutoSlide);
  slider.addEventListener("mouseout", startAutoSlide);

  // Responsive adjustment on window resize
  window.addEventListener("resize", moveSliderItem);

  // Initialize button visibility and auto sliding
  updateButtonVisibility();
  startAutoSlide();
};

// Initialize each slider
sliders.forEach(sliderInit);
