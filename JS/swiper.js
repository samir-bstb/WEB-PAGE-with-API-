new Swiper('.card-wrapper', {

    loop: true,
    spaceBetween: 10,
    slidesPerView: 3,    
    loopAdditionalSlides: 1,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    }

});