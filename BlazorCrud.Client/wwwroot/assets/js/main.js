(function ($) {
    "use strict";

    window.addEventListener('load', function () {
        $("#cr-overlay").fadeOut("slow");

        $(function () {
            AOS.init({
                once: true,
            });

            /* Product grid & column */
            $(".gridRow").on("click", function () {
                $(".col-100").addClass("col-size");
                $(".col-50").addClass("col-size");
            });

            $(".gridCol").on("click", function () {
                $(".col-100").removeClass("col-size");
                $(".col-50").removeClass("col-size");
            });

            $(".cr-toggle a").on("click", function () {
                $("a").removeClass("active-grid");
                $(this).addClass("active-grid");
            });

            /* Minus and Plus Quantity */
            $('.minus').on("click", function () {
                const $input = $(this).parent().find('input');
                let count = parseInt($input.val()) - 1;
                count = count < 1 ? 1 : count;
                $input.val(count);
                $$input.trigger("change");
                return false;
            });

            $('.plus').on("click", function () {
                const $input = $(this).parent().find('input');
                $input.val(parseInt($input.val()) + 1);
                $input.trigger("change");
                return false;
            });

            /* Onclick Remove Products */
            $(".cr-remove-product").on("click", function () {
                $(this).closest(".cr-product-box").remove();
                const wish_product_count = $(".cr-product-box").length;
                if (wish_product_count === 0) {
                    $('.section-wishlist').html('<p class="cr-wishlist-msg">Your wishlist is empty!</p>');
                    $('.section-compare').html('<p class="cr-wishlist-msg">Your compare list is empty!</p>');
                }
            });

            /* Sticky header on scroll && Menu Fixed On Scroll Active */
            let crPrevScroll = window.scrollY || document.documentElement.scrollTop;
            let crCurScroll;
            let crDirection = 0;
            let crPrevDirection = 0;

            const checkScroll = function () {
                crCurScroll = window.scrollY || document.documentElement.scrollTop;
                if (crCurScroll > crPrevScroll) {
                    crDirection = 2; // scrolled up
                } else if (crCurScroll < crPrevScroll) {
                    crDirection = 1; // scrolled down
                }

                if (crDirection !== crPrevDirection) {
                    toggleHeader(crDirection, crCurScroll);
                }

                crPrevScroll = crCurScroll;
            };

            const toggleHeader = function (crDirection, crCurScroll) {
                if (crDirection === 2 && crCurScroll > -46) {
                    crPrevDirection = crDirection;
                    $("#cr-main-menu-desk").addClass("menu_fixed_up");
                } else if (crDirection === 1) {
                    crPrevDirection = crDirection;
                    $("#cr-main-menu-desk").addClass("menu_fixed").removeClass("menu_fixed_up");
                }
            };

            $(window).on("scroll", function () {
                // Asegúrate de que los elementos existen
                if ($('.next, .section-breadcrumb').length > 0) {
                    const distance = $('.next, .section-breadcrumb').offset().top;
                    if ($(window).scrollTop() <= distance + 5) {
                        $("#cr-main-menu-desk").removeClass("menu_fixed");
                    } else {
                        checkScroll();
                    }
                } else {
                    console.warn('Elementos .next o .section-breadcrumb no encontrados en el DOM');
                }
            });

            /* Service Slider */
            new Swiper('.cr-service-slider', {
                loop: true,
                slidesPerView: 4,
                paginationClickable: true,
                spaceBetween: 24,
                breakpoints: {
                    1399: { slidesPerView: 4, spaceBetween: 24 },
                    1028: { slidesPerView: 3, spaceBetween: 24 },
                    480: { slidesPerView: 2, spaceBetween: 24 },
                    0: { slidesPerView: 1, spaceBetween: 10 }
                }
            });

            /* Popular Slider */
            $('.cr-popular-product').slick({
                infinite: true,
                dots: false,
                arrows: false,
                slidesToShow: 5,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                responsive: [
                    { breakpoint: 1400, settings: { slidesToShow: 4, infinite: true } },
                    { breakpoint: 1200, settings: { slidesToShow: 3, infinite: true } },
                    { breakpoint: 992, settings: { slidesToShow: 2, infinite: true } },
                    { breakpoint: 481, settings: { slidesToShow: 1 } }
                ]
            });

            /* Blog Slider */
            new Swiper('.cr-blog-slider', {
                loop: true,
                slidesPerView: 3,
                paginationClickable: true,
                spaceBetween: 24,
                breakpoints: {
                    1600: { slidesPerView: 4, spaceBetween: 24 },
                    991: { slidesPerView: 3, spaceBetween: 24 },
                    576: { slidesPerView: 2, spaceBetween: 24 },
                    0: { slidesPerView: 1, spaceBetween: 10 }
                }
            });

            /* Testimonials Slider */
            new Swiper('.cr-testimonial-slider', {
                loop: true,
                slidesPerView: 3,
                paginationClickable: true,
                spaceBetween: 24,
                breakpoints: {
                    1028: { slidesPerView: 3, spaceBetween: 24 },
                    576: { slidesPerView: 2, spaceBetween: 24 },
                    0: { slidesPerView: 1, spaceBetween: 10 }
                }
            });

            /* Banner Slider */
            new Swiper('.cr-banner-slider', {
                loop: true,
                slidesPerView: 2,
                paginationClickable: true,
                spaceBetween: 24,
                autoplay: true,
                breakpoints: {
                    1200: { slidesPerView: 3, spaceBetween: 24 },
                    768: { slidesPerView: 2, spaceBetween: 24 },
                    0: { slidesPerView: 1, spaceBetween: 10 }
                }
            });

            /* Product Slider */
            $('.cr-twocolumns-product').slick({
                infinite: true,
                dots: false,
                arrows: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                responsive: [
                    { breakpoint: 1400, settings: { slidesToShow: 2 } },
                    { breakpoint: 481, settings: { slidesToShow: 1 } }
                ]
            });

            /* tablist-swiper */
            new Swiper('.tablist-swiper', {
                direction: 'vertical',
                slidesPerView: 6,
            });

            /* Insta slider  */
            new Swiper('.cr-insta-slider', {
                speed: 500,
                spaceBetween: 12,
                autoplay: false,
                disableOnInteraction: true,
                loop: true,
                slidesPerView: 4,
                allowTouchMove: true,
                centeredSlides: false,
                breakpoints: {
                    576: { slidesPerView: 5 },
                    768: { slidesPerView: 6 },
                    992: { slidesPerView: 8 },
                    1200: { slidesPerView: 4 },
                    1400: { slidesPerView: 5 }
                }
            });

            /*--------------------- Wishlist notify js ---------------------- */
            $('.wishlist').on("click", function () {
                $('.cr-wish-notify, .cr-compare-notify, .cr-cart-notify').remove();

                const isWishlist = $(this).hasClass("active");
                const message = isWishlist ?
                    'Remove product on <a href="wishlist.html"> Wishlist</a> Successfully!' :
                    'Add product in <a href="wishlist.html"> Wishlist</a> Successfully!';

                $(this).toggleClass("active");
                $('footer').after(`<div class="cr-wish-notify"><p class="wish-note">${message}</p></div>`);

                setTimeout(function () {
                    $('.cr-wish-notify').fadeOut();
                }, 2000);
            });

            /*--------------------- Add to cart button notify js ---------------------- */
            $('.cr-shopping-bag').on("click", function () {
                $('.cr-wish-notify, .cr-compare-notify, .cr-cart-notify').remove();

                const isAddtocart = $(this).hasClass("active");
                const message = isAddtocart ?
                    'Remove product in <a href="cart.html"> Cart</a> Successfully!' :
                    'Add product in <a href="cart.html"> Cart</a> Successfully!';

                $(this).toggleClass("active");
                $('footer').after(`<div class="cr-cart-notify"><p class="cart-note">${message}</p></div>`);

                setTimeout(function () {
                    $('.cr-cart-notify').fadeOut();
                }, 2000);
            });

            /*--------------------- Compare notify js ---------------------- */
            $('.compare').on("click", function () {
                $('.cr-wish-notify, .cr-compare-notify, .cr-cart-notify').remove();

                const isCompare = $(this).hasClass("active");
                const message = isCompare ?
                    'Remove product on <a href="compare.html"> Compare</a> Successfully!' :
                    'Add product in <a href="compare.html"> Compare</a> Successfully!';

                $(this).toggleClass("active");
                $('footer').after(`<div class="cr-compare-notify"><p class="compare-note">${message}</p></div>`);

                setTimeout(function () {
                    $('.cr-compare-notify').fadeOut();
                }, 2000);
            });
        });
    });
})(jQuery);
