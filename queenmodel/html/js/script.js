$(document).ready(function () {
    var swiper = new Swiper('.models-slide', {
        nextButton: '.swiper-models-slide-next',
        prevButton: '.swiper-models-slide-prev',
        paginationClickable: true,
        spaceBetween: 20,
        slidesPerColumn: 2,
        slidesPerView: 5,

    });

    var swiper = new Swiper('.partners-slide', {
        nextButton: '.swiper-partner-slide-next',
        prevButton: '.swiper-partner-slide-prev',
        paginationClickable: true,
        spaceBetween: 20,
        slidesPerView: 5,

    });
});