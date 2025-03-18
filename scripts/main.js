gsap.registerPlugin(ScrollTrigger);

function changeSlide(index) {
    $('#carouselProduct').carousel(index);
}

// Manage carousel slides
let totalSlides = $('.carousel-item').length;
$('#totalSlides').text(totalSlides);

$('#carouselProduct').on('slid.bs.carousel', function (event) {
    $('#currentSlide').text(event.to + 1);
});

// Handle active classes on click
$('.items-clr, .item-size, .dropdown-menu-main-link').on('click', '.item', function () {
    $(this).closest('.items-clr, .item-size').find('.item').removeClass('active');
    $(this).find('.mobile-dropdown').removeClass('active');
    $(this).addClass('active');
});

$('.dropdown-menu-main-link').on('click', function () {
    $(this).next('.mobile-dropdown').toggleClass('active');
});

// Mobile navigation toggle
$('.open-nav').on('click', function () {
    $('.mobile-nav').addClass('show');
});

$('.close-nav').on('click', function () {
    $('.mobile-nav').removeClass('show');
});

// Open product modal
$('.open-product-modal').on('click', function () {
    $('#modalProduct').modal('show');
});

// Animations and element pinning for desktop
function initGSAP() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    if ($(window).width() > 1024) {
        const slider = $('.product-slider');
        const footer = $('footer');
        const productNav = $('.product-nav');

        gsap.to(slider, {
            scrollTrigger: {
                trigger: slider,
                start: 'top 20px',
                endTrigger: footer,
                end: 'top bottom',
                pin: true,
                pinSpacing: false
            }
        });

        gsap.set(productNav, { opacity: 0, y: -50 });
        ScrollTrigger.create({
            trigger: 'body',
            start: 'top top',
            end: '+=100',
            onEnter: () => gsap.to(productNav, { opacity: 1, y: 0, duration: 0.5 }),
            onLeaveBack: () => gsap.to(productNav, { opacity: 0, y: -50, duration: 0.5 })
        });

        gsap.to(productNav, {
            opacity: 0,
            y: -50,
            scrollTrigger: {
                trigger: footer,
                start: 'top bottom',
                end: 'bottom bottom',
                onEnter: () => gsap.to(productNav, { opacity: 0, y: -50 }),
                onLeaveBack: () => gsap.to(productNav, { opacity: 1, y: 0 })
            }
        });
    }

    // Sticky price for mobile devices
    let stickyPrice = $('.mobile-sticky-price');

    gsap.set(stickyPrice, { opacity: 0 });
    ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: '+=100',
        onEnter: () => gsap.to(stickyPrice, { opacity: 1, duration: 0.5 }),
        onLeaveBack: () => gsap.to(stickyPrice, { opacity: 0, duration: 0.5 })
    });

    gsap.to(stickyPrice, {
        opacity: 0,
        scrollTrigger: {
            trigger: $('footer'),
            start: 'top bottom',
            end: 'bottom bottom',
            onEnter: () => gsap.to(stickyPrice, { opacity: 0 }),
            onLeaveBack: () => gsap.to(stickyPrice, { opacity: 1 })
        }
    });

    ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        onEnter: () => gsap.to(stickyPrice, { opacity: 0, duration: 0.3 })
    });
}

// Update GSAP on window resize
$(document).ready(initGSAP);
let resizeTimer;
$(window).on('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initGSAP, 200);
});


// Slick slider - Related products
$('.product-box').slick({
    arrows: false,
    infinite: false,
    slidesToShow: 2.4,
    slidesToScroll: 3,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1.2,
                slidesToScroll: 1
            }
        }
    ]
});

// Text animation
$('.anim-wrapper').each(function () {
    let animEl = $(this).find('.anim-el');
    let tl = gsap.timeline({ paused: true });

    tl.to(animEl, { yPercent: -50, opacity: 0, duration: 0.3, ease: 'power2.out' })
        .set(animEl, { yPercent: 50 })
        .to(animEl, {
            yPercent: 0,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
            onStart: function () {
                animEl.addClass('active');
            }
        });

    $(this).on('mouseenter', function () { tl.restart(); });
    $(this).on('mouseleave', function () {
        tl.pause(0);
        animEl.removeClass('active');
    });
});
