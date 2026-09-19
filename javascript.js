const themeBtn = document.getElementById("theme-toggle");

// Load saved theme
if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light-mode");
    themeBtn.textContent = "☀️";
}

// Toggle theme
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){
        themeBtn.textContent = "☀️";
        localStorage.setItem("theme","light");
    } else {
        themeBtn.textContent = "🌙";
        localStorage.setItem("theme","dark");
    }

});
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const closeMenu = document.querySelector(".close-menu");

/* Open Menu */

menuToggle.addEventListener("click", () => {

    mobileMenu.classList.add("active");

});

/* Close Menu */

closeMenu.addEventListener("click", () => {

    mobileMenu.classList.remove("active");

});




// Process steps fade-in on scroll
const processSteps = document.querySelectorAll(".process-step");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if(entry.isIntersecting){
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            entry.target.style.transition = `all .8s ease ${i * 0.15}s`;
        }
    });
}, { threshold: 0.15 });

processSteps.forEach(step => {
    step.style.opacity = "0";
    step.style.transform = "translateY(40px)";
    observer.observe(step);
});





/* ========================= */
/* TESTIMONIALS SLIDER       */
/* ========================= */

const testiSlides = document.querySelectorAll(".testi-slide");
const testiDots = document.querySelectorAll(".testi-dots .dot");
const testiPrev = document.querySelector(".testi-btn.prev");
const testiNext = document.querySelector(".testi-btn.next");

let currentSlide = 0;
let autoSlideInterval;

/* Show specific slide */
function showSlide(index){

    if(index >= testiSlides.length) index = 0;
    if(index < 0) index = testiSlides.length - 1;

    currentSlide = index;

    /* Slides */
    testiSlides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });

    /* Dots */
    testiDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}

/* Next */
function nextSlide(){
    showSlide(currentSlide + 1);
    resetAutoSlide();
}

/* Previous */
function prevSlide(){
    showSlide(currentSlide - 1);
    resetAutoSlide();
}

/* Button clicks */
if(testiNext) testiNext.addEventListener("click", nextSlide);
if(testiPrev) testiPrev.addEventListener("click", prevSlide);

/* Dot clicks */
testiDots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        showSlide(i);
        resetAutoSlide();
    });
});

/* Auto slide every 6 seconds */
function startAutoSlide(){
    autoSlideInterval = setInterval(nextSlide, 6000);
}

function resetAutoSlide(){
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

/* Start auto slide */
if(testiSlides.length > 0){
    startAutoSlide();
}

/* Touch swipe support (mobile) */
const testiSlider = document.querySelector(".testi-slider");
let touchStartX = 0;
let touchEndX = 0;

if(testiSlider){
    testiSlider.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    testiSlider.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe(){
    const diff = touchStartX - touchEndX;
    if(Math.abs(diff) > 50){
        if(diff > 0){
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

/* Pause on hover */
if(testiSlider){
    testiSlider.addEventListener("mouseenter", () => {
        clearInterval(autoSlideInterval);
    });

    testiSlider.addEventListener("mouseleave", () => {
        startAutoSlide();
    });
}




/* ========================= */
/* FAQ ACCORDION             */
/* ========================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        /* Close all items */
        faqItems.forEach(otherItem => {
            otherItem.classList.remove("active");
        });

        /* If clicked item was not active, open it */
        if(!isActive){
            item.classList.add("active");
        }
    });

    /* Keyboard accessibility */
    question.addEventListener("keydown", (e) => {
        if(e.key === "Enter" || e.key === " "){
            e.preventDefault();
            question.click();
        }
    });
});


/* ========================= */
/* CONTACT FORM              */
/* ========================= */

const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

if(contactForm){

    contactForm.addEventListener("submit", (e) => {

        e.preventDefault();

        /* Get submit button */
        const submitBtn = contactForm.querySelector(".submit-btn");
        const originalText = submitBtn.querySelector("span").textContent;

        /* Show loading state */
        submitBtn.querySelector("span").textContent = "Sending...";
        submitBtn.disabled = true;
        submitBtn.style.opacity = ".7";

        /* Simulate sending (replace with real backend later) */
        setTimeout(() => {

            /* Show success message */
            if(formSuccess){
                formSuccess.classList.add("show");
            }

            /* Reset form */
            contactForm.reset();

            /* Restore button */
            submitBtn.querySelector("span").textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";

            /* Auto-hide success after 5s */
            setTimeout(() => {
                if(formSuccess){
                    formSuccess.classList.remove("show");
                }
            }, 5000);

        }, 1200);

    });

    /* Auto-resize textarea */
    const textareas = contactForm.querySelectorAll("textarea");
    textareas.forEach(textarea => {
        textarea.addEventListener("input", function(){
            this.style.height = "auto";
            this.style.height = (this.scrollHeight) + "px";
        });
    });
}