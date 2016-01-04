$(document).ready(function () {
    var appendNumber = 4;
    var prependNumber = 1;
    var swiper = new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 20,
    });


    $(".nav-button").on('click', function() {
    	$(".main-nav").slideToggle('fast');
    })
});