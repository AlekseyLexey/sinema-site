"use strict";
class Slider {
  constructor(slider, slides, prevBtn, nextBtn) {
    this.sliderContainer = slider;
    this.slides = slides;
    this.prevButton = prevBtn;
    this.nextBtn = nextBtn;
    this.currentIndex = 0;
    this.itemsToShow = null;
  }

  updateSlider() {
    if (this.currentIndex > 0) {
      this.prevButton.classList.add("active");
    } else {
      this.prevButton.classList.remove("active");
    }

    // Рассчитываем смещение
    const offset = -this.currentIndex * (100 / this.itemsToShow);

    console.log(this.sliderContainer);

    this.sliderContainer.style.transform = `translateX(${offset}%)`;
  }

  setItemsToShow() {
    if (window.innerWidth <= 640 && window.innerWidth > 425) {
      this.itemsToShow = 2;
    } else if (window.innerWidth <= 425) {
      this.itemsToShow = 1;
    } else {
      this.itemsToShow = 3;
    }
  }

  setPrevSlider = () => {
    this.currentIndex =
      this.currentIndex > 0
        ? this.currentIndex - 1
        : this.slides.length - this.itemsToShow;

    console.log(this.currentIndex);

    this.updateSlider();
  };

  setNextSlider = () => {
    this.currentIndex =
      this.currentIndex < this.slides.length - this.itemsToShow
        ? this.currentIndex + 1
        : 0;
    this.updateSlider();
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");

  burger.addEventListener("click", () => {
    const menu = document.getElementById("menu");
    menu.classList.toggle("active");

    // Анимация кнопки бургера
    const lines = document.querySelectorAll(".burger__line");
    lines[0].classList.toggle("line1");
    lines[1].classList.toggle("line2");
    lines[2].classList.toggle("line3");
  });

  // Итерируюсь по секциям, потому что buttons вне слайдеров!
  const sections = document.querySelectorAll(".section");

  sections.forEach((section) => {
    const sliders = section.querySelector(".slider");
    const prevBtn = section.querySelector(".slider__button--prev");
    const nextBtn = section.querySelector(".slider__button--next");

    const slides = sliders.querySelectorAll(".slider__item");

    const sliderInstance = new Slider(
      sliders.querySelector(".slider__container"),
      slides,
      prevBtn,
      nextBtn
    );

    // Устанавливаем количество элементов для отображения
    sliderInstance.setItemsToShow();

    prevBtn.addEventListener("click", sliderInstance.setPrevSlider);
    nextBtn.addEventListener("click", sliderInstance.setNextSlider);
  });
});
