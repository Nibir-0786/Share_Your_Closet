(function ($) {
    "use strict";

    // ===== Spinner =====
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // ===== Initialize WOW.js =====
    new WOW().init();

    // ===== Fixed Navbar =====
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow');
            } else {
                $('.fixed-top').removeClass('bg-dark shadow');
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow').css('top', -45);
            } else {
                $('.fixed-top').removeClass('bg-dark shadow').css('top', 0);
            }
        }
    });

    // ===== Back to top button =====
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // ===== Causes progress bars =====
    $('.causes-progress').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, { offset: '80%' });

    // ===== Testimonials carousel =====
    $(".testimonial-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav: true,
        navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>'],
        responsive: {
            0: { items: 1 },
            768: { items: 2 }
        }
    });

    // ===== Gallery Carousel =====
    $("#gallery-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        loop: true,
        margin: 15,
        nav: false,
        dots: false,
        responsive: {
            0: { items: 1 },
            576: { items: 2 },
            768: { items: 3 },
            992: { items: 4 }
        }
    });
    $(".gallery-prev").click(function () {
        $("#gallery-carousel").trigger('prev.owl.carousel');
    });
    $(".gallery-next").click(function () {
        $("#gallery-carousel").trigger('next.owl.carousel');
    });

    // ===== Lightbox options =====
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 300,
            'wrapAround': true,
            'fadeDuration': 300,
            'imageFadeDuration': 300,
            'showImageNumberLabel': false
        });
    }

    // ===== Terms & Conditions Page =====
    if (document.body.classList.contains('terms-body')) {
        const termsBlocks = document.querySelectorAll('.terms-block');
        termsBlocks.forEach((block, index) => {
            block.classList.add('wow', 'fadeInUp');
            block.setAttribute('data-wow-delay', `${index * 0.2}s`);
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    // ===== Read More Button =====
    $(document).ready(function () {
        $("#readMoreBtn").click(function () {
            let moreText = $("#moreText");
            if (!moreText.hasClass("show")) {
                let height = moreText.get(0).scrollHeight;
                moreText.css("max-height", height + "px").addClass("show");
                $(this).html(`Show Less
                    <div class="d-inline-flex btn-sm-square bg-white text-primary rounded-circle ms-2">
                        <i class="fa fa-arrow-up"></i>
                    </div>`);
            } else {
                moreText.css("max-height", "0").removeClass("show");
                $(this).html(`Read More
                    <div class="d-inline-flex btn-sm-square bg-white text-primary rounded-circle ms-2">
                        <i class="fa fa-arrow-right"></i>
                    </div>`);
            }
        });
    });

    // ===== Causes Overlay Toggle =====
    document.querySelectorAll('.causes-box').forEach(box => {
        const btn = box.querySelector('.readMoreBtn');
        const overlay = box.querySelector('.overlay-text');

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            overlay.style.display = 'block';
            btn.style.display = 'none';
        });

        box.addEventListener('click', () => {
            if (overlay.style.display === 'block') {
                overlay.style.display = 'none';
                btn.style.display = 'inline-block';
            }
        });
    });

    // ===== Counter Animation =====
    const counters = document.querySelectorAll('.counter');
const speed = 200;

const startCounting = (counter) => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace(/\D/g, '');
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment).toLocaleString();
            setTimeout(updateCount, 20);
        } else {
            // Add '+' only if this counter has class 'plus-sign'
            if (counter.classList.contains('plus-sign')) {
                counter.innerText = target.toLocaleString() + '+';
            } else {
                counter.innerText = target.toLocaleString();
            }
        }
    };
    updateCount();
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounting(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.6 });

counters.forEach(counter => observer.observe(counter));

    

    // ===== Newsletter AJAX Submission =====
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);

            fetch(this.action, {
                method: this.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    document.getElementById('thankYouMessage').style.display = 'block';
                    this.reset();
                } else {
                    alert('Oops! There was a problem submitting your form.');
                }
            }).catch(() => alert('Oops! There was a problem submitting your form.'));
        });
    }

    // ===== Donation Form Submission =====
    const donateForm = document.getElementById('donateForm');
    if (donateForm) {
        donateForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);

            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    window.location.href = 'thankyou.html';
                } else {
                    alert('Oops! There was a problem submitting your donation.');
                }
            }).catch(() => alert('Oops! There was a problem submitting your donation.'));
        });
    }

    // ===== Donate "Other" Amount Toggle =====
    const otherRadio = document.getElementById('amount4');
    const otherInputWrapper = document.getElementById('otherAmountInput');
    const otherInput = otherInputWrapper ? otherInputWrapper.querySelector('input') : null;
    const radios = document.querySelectorAll('input[name="donation_amount"]');

    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (otherRadio && otherRadio.checked) {
                otherInputWrapper.style.display = 'block';
                setTimeout(() => otherInput.style.transform = 'rotateX(0deg)', 50);
            } else if (otherInputWrapper) {
                otherInput.style.transform = 'rotateX(90deg)';
                setTimeout(() => otherInputWrapper.style.display = 'none', 300);
            }
        });
    });

    // ===== Team Carousel with 3D Depth Effect =====
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 60,
        loop: true,
        dots: false,
        nav: true,
        navText: ['<i class="bi bi-arrow-left"></i>', '<i class="bi bi-arrow-right"></i>'],
        responsive: {
            0: { items: 1, margin: 20 },
            576: { items: 1.5, margin: 30 },
            768: { items: 2.5, margin: 40 },
            992: { items: 3, margin: 50 },
            1200: { items: 3.5, margin: 60 }
        }
    });

    // Add 3D depth class
    $(".team-carousel").on("translated.owl.carousel", function () {
        $(".team-item").removeClass("active-center");
        $(".owl-item.center .team-item").addClass("active-center");
    });

    // ===== Preloader =====
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        setTimeout(() => {
            preloader.classList.add('fade-out');
        }, 500); // small delay for smooth fade-out
    });

    // ===== Volunteer Registration Form Modal (Updated) =====
    $(document).ready(function() {
        const modal = document.getElementById("formModal");
        const openBtn = document.getElementById("openForm");
        const closeBtn = document.querySelector(".form-close");

        if (modal && openBtn && closeBtn) {

            // Open modal with fade-in
            openBtn.addEventListener("click", function(e) {
                e.preventDefault();
                modal.style.display = "flex";
                modal.style.opacity = 0;
                setTimeout(() => {
                    modal.style.transition = "opacity 0.3s ease-in-out";
                    modal.style.opacity = 1;
                }, 10);
            });

            // Close modal with fade-out
            const closeModal = () => {
                modal.style.opacity = 0;
                setTimeout(() => {
                    modal.style.display = "none";
                }, 300);
            };

            // Close button
            closeBtn.addEventListener("click", closeModal);

            // Click outside modal
            window.addEventListener("click", function(event) {
                if (event.target === modal) {
                    closeModal();
                }
            });
        }
    });

})(jQuery);

