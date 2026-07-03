"use strict";


/* =========================================================
   SHARED / CACHED ELEMENTS
========================================================= */

const header      = document.querySelector(".header");
const menuBtn     = document.querySelector(".menu-btn");
const navbar      = document.querySelector(".navbar");
const navLinks    = document.querySelectorAll(".navbar a");
const sections    = document.querySelectorAll("section");
const percent = document.getElementById("percent");
const progressBar = document.getElementById("progress-bar");

const typingElement = document.querySelector(".typing");
const homeTyping     = document.querySelector(".typing-home");

let cursor = null;
let cursorBlur = null;

/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu(){
    if(menuBtn && navbar){
        menuBtn.addEventListener("click", () => {
            navbar.classList.toggle("active");
            menuBtn.classList.toggle("active");
            menuBtn.innerHTML = menuBtn.classList.contains("active")
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if(navbar) navbar.classList.remove("active");
            if(menuBtn){
                menuBtn.classList.remove("active");
                menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });
    });
}

/* =========================================================
   TYPING ANIMATIONS
========================================================= */

function initNameTyping(){
    const target = document.getElementById("nameTyping");
    if(!target) return;

    const text = "Ajith Alagarsamy";
    let i = 0;

    function typeWriter(){
        if(i < text.length){
            target.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 500);
        }
    }
    typeWriter();
}

function initHeroTyping(){
    if(!typingElement) return;

    const typingTexts = [
        "Full Stack Developer","Java Developer","Python Developer",
        "Web Designer","UI / UX Designer","Entrepreneur"
    ];

    let textIndex = 0, charIndex = 0, deleting = false;

    function typeEffect(){
        const currentText = typingTexts[textIndex];
        typingElement.textContent = currentText.substring(0, charIndex);

        if(!deleting){
            charIndex++;
            if(charIndex > currentText.length){
                if(textIndex === typingTexts.length - 1){
                    typingElement.textContent = "Entrepreneur";
                    return;
                }
                deleting = true;
                setTimeout(typeEffect, 1200);
                return;
            }
        } else {
            charIndex--;
            if(charIndex < 0){
                deleting = false;
                textIndex++;
            }
        }
        setTimeout(typeEffect, deleting ? 60 : 120);
    }
    typeEffect();

    setInterval(() => typingElement.classList.toggle("cursor"), 500);
}

function initAboutTyping(){
    if(!homeTyping) return;

    const homeTexts = [
        "Full Stack Developer","Java Developer","Python Developer",
        "UI / UX Designer","Entrepreneur"
    ];

    let wordIndex = 0, charIndex = 0, deleting = false;

    function typeHome(){
        const text = homeTexts[wordIndex];
        homeTyping.textContent = text.substring(0, charIndex);

        if(!deleting){
            charIndex++;
            if(charIndex > text.length){
                if(wordIndex === homeTexts.length - 1){
                    homeTyping.textContent = "Entrepreneur";
                    homeTyping.classList.add("stamp");
                    return;
                }
                deleting = true;
                setTimeout(typeHome, 600);
                return;
            }
        } else {
            charIndex--;
            if(charIndex < 0){
                deleting = false;
                wordIndex++;
            }
        }
        setTimeout(typeHome, deleting ? 25 : 120);
    }
    typeHome();
}
/*=========================================================
    LOADER
=========================================================*/



const progressFill = document.querySelector(".progress-fill");

const progressText = document.getElementById("progress-text");

let progress = 0;

const loading = setInterval(() => {

    progress++;

    progressFill.style.width = progress + "%";

    progressText.textContent = progress + "%";

    if(progress >= 100){

        clearInterval(loading);

        setTimeout(() => {

            loader.classList.add("loader-hide");

        },500);

    }

},20);
/* =========================================================
   CUSTOM CURSOR
========================================================= */

function initCursor(){
    cursor = document.querySelector(".cursor");
    cursorBlur = document.querySelector(".cursor-blur");
    if(!cursor || !cursorBlur) return;

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
        cursorBlur.style.left = e.clientX + "px";
        cursorBlur.style.top = e.clientY + "px";
    });

    const hoverElements = document.querySelectorAll(
        "button, .btn, .project-btn, a, .timeline-content, .service-card, .project-card"
    );

    hoverElements.forEach(item => {
        item.addEventListener("mouseenter", () => cursor.classList.add("active"));
        item.addEventListener("mouseleave", () => cursor.classList.remove("active"));
        item.addEventListener("mousedown", () => cursor.classList.add("click"));
        item.addEventListener("mouseup", () => cursor.classList.remove("click"));
    });
}

/* =========================================================
   TABS
========================================================= */

function initTabs(){
    const tabButtons  = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(tab => tab.classList.remove("active"));
            button.classList.add("active");

            const targetId = button.getAttribute("data-tab");
            const target = targetId ? document.getElementById(targetId) : null;
            if(target) target.classList.add("active");
        });
    });
}

/* =========================================================
   SMOOTH SCROLL
========================================================= */

function initSmoothScroll(){
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e){
            const hash = this.getAttribute("href");
            if(!hash || hash === "#") return;
            const target = document.querySelector(hash);
            if(!target) return;
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
        });
    });
}

/* =========================================================
   SCROLL REVEAL (basic — .fade class)
========================================================= */

const revealElements = document.querySelectorAll(
    ".section-title,.hero-left,.hero-right,.service-card,.project-card,.timeline-item,.skill-box"
);

function revealOnScroll(){
    const windowHeight = window.innerHeight;
    const revealPoint = 120;

    revealElements.forEach(item => {
        const revealTop = item.getBoundingClientRect().top;
        if(revealTop < windowHeight - revealPoint){
            item.classList.add("fade");
        }
    });
}

/* =========================================================
   SCROLL REVEAL (IntersectionObserver — .show class)
   FIX: relaxed rootMargin so cards inside tall/short sections
   don't get stuck un-observed, and threshold lowered slightly.
========================================================= */

function initIntersectionReveal(){
    const revealItems = document.querySelectorAll(
        ".fade-up,.fade-left,.fade-right,.zoom-in"
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target); // FIX: don't re-hide on scroll-away
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px"
    });

    revealItems.forEach(item => revealObserver.observe(item));

    document.querySelectorAll(
        ".service-card,.project-card,.certificate-card,.achievement-card,.testimonial-card"
    ).forEach((card, index) => {
        card.style.transitionDelay = `${index * 100}ms`;
    });

    document.querySelectorAll(".section-title").forEach(title => revealObserver.observe(title));

    document.querySelectorAll(".timeline-item").forEach((item, index) => {
        item.style.transitionDelay = `${index * 150}ms`;
        revealObserver.observe(item);
    });

    document.querySelectorAll(".stat-box").forEach((box, index) => {
        box.style.transitionDelay = `${index * 120}ms`;
        revealObserver.observe(box);
    });

    document.querySelectorAll(".gallery-item").forEach((item, index) => {
        item.style.transitionDelay = `${index * 80}ms`;
        revealObserver.observe(item);
    });

    document.querySelectorAll(".contact-info,.contact-form").forEach(item => {
        revealObserver.observe(item);
    });
}

/* =========================================================
   COUNTER ANIMATION
========================================================= */

function initCounters(){
    const counters = document.querySelectorAll(".counter");
    if(!counters.length) return;

    function runCounter(counter){
        const target = Number(counter.getAttribute("data-target")) || 0;
        let current = 0;
        const speed = Math.max(1, Math.ceil(target / 100));

        const timer = setInterval(() => {
            current += speed;
            if(current >= target){
                current = target;
                clearInterval(timer);
            }
            counter.textContent = current;
        }, 20);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                runCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

/* =========================================================
   SKILL PROGRESS BARS
========================================================= */

function initSkillBars(){
    const progressBars = document.querySelectorAll(".progress-bar");
    const skillSection = document.querySelector(".skills");
    if(!skillSection || !progressBars.length) return;

    function animateSkills(){
        progressBars.forEach(bar => {
            const width = bar.getAttribute("data-width");
            if(width) bar.style.width = width + "%";
        });
    }

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                animateSkills();
                skillObserver.disconnect();
            }
        });
    }, { threshold: 0.4 });

    skillObserver.observe(skillSection);
}

/* =========================================================
   PROJECT FILTER + SEARCH + COUNT
========================================================= */

function initProjectFilter(){
    const filterButtons = document.querySelectorAll(".project-filter button");
    const projectCards  = document.querySelectorAll(".project-card");
    const searchInput   = document.querySelector("#projectSearch");
    const projectCount  = document.querySelector("#projectCount");
    if(!projectCards.length) return;

    let activeFilter = "all";

    function applyFilters(){
        const keyword = searchInput ? searchInput.value.trim().toLowerCase() : "";
        let visible = 0;

        projectCards.forEach(card => {
            const category = card.dataset.category || "all";
            const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
            const matchesFilter = activeFilter === "all" || category === activeFilter;
            const matchesSearch = !keyword || title.includes(keyword);
            const show = matchesFilter && matchesSearch;

            card.style.display = show ? "block" : "none";
            card.classList.toggle("hide", !show);
            if(show) visible++;
        });

        if(projectCount) projectCount.textContent = visible;
    }

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            activeFilter = button.dataset.filter || "all";
            applyFilters();
        });
    });

    if(searchInput) searchInput.addEventListener("keyup", applyFilters);

    applyFilters();
}

/* =========================================================
   CARD HOVER TRANSFORM
========================================================= */

function initCardHover(){
    const cards = document.querySelectorAll(
        ".service-card,.project-card,.certificate-card,.achievement-card"
    );

    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-10px) scale(1.02)";
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
}

/* =========================================================
   BUTTON RIPPLE EFFECT
========================================================= */

function initRippleEffect(){
    const buttons = document.querySelectorAll(".btn,.project-btn");

    buttons.forEach(button => {
        button.addEventListener("click", function(e){
            const ripple = document.createElement("span");
            ripple.className = "ripple";
            const rect = this.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top  = `${e.clientY - rect.top}px`;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

/* =========================================================
   GALLERY LIGHTBOX
========================================================= */

const galleryItems = document.querySelectorAll(".gallery-item");
let lightbox = null;
let lightboxImg = null;
let currentIndex = 0;

function initLightboxStyles(){
    if(document.querySelector(".lightbox-style")) return;
    const style = document.createElement("style");
    style.className = "lightbox-style";
    style.textContent = `
        .lightbox{
            position:fixed; top:0; left:0; width:100%; height:100%;
            background:rgba(0,0,0,.9);
            display:flex; justify-content:center; align-items:center;
            opacity:0; visibility:hidden; transition:.3s; z-index:9999;
        }
        .lightbox.active{ opacity:1; visibility:visible; }
        .lightbox img{
            max-width:85%; max-height:85%; border-radius:10px;
            box-shadow:0 10px 30px rgba(0,0,0,.5); transition:opacity .15s ease;
        }
        .lightbox .close{
            position:absolute; top:20px; right:30px;
            font-size:40px; color:#fff; cursor:pointer;
        }
    `;
    document.head.appendChild(style);
}

function initLightboxNavStyles(){
    if(document.querySelector(".lightbox-nav-style")) return;
    const style = document.createElement("style");
    style.className = "lightbox-nav-style";
    style.textContent = `
        .lightbox-next, .lightbox-prev{
            position:absolute; top:50%; transform:translateY(-50%);
            background:rgba(255,255,255,.2); border:none; color:#fff;
            font-size:30px; padding:10px 15px; cursor:pointer;
            border-radius:8px; transition:.3s;
        }
        .lightbox-next:hover, .lightbox-prev:hover{ background:rgba(255,255,255,.4); }
        .lightbox-next{ right:30px; }
        .lightbox-prev{ left:30px; }
    `;
    document.head.appendChild(style);
}

function addLightboxNavButtons(){
    if(!lightbox) return;
    const nextBtn = document.createElement("button");
    nextBtn.innerHTML = "&#10095;";
    nextBtn.className = "lightbox-next";

    const prevBtn = document.createElement("button");
    prevBtn.innerHTML = "&#10094;";
    prevBtn.className = "lightbox-prev";

    lightbox.appendChild(nextBtn);
    lightbox.appendChild(prevBtn);

    nextBtn.addEventListener("click", nextImage);
    prevBtn.addEventListener("click", prevImage);
}

function createLightbox(){
    initLightboxStyles();
    initLightboxNavStyles();

    lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
        <span class="close">&times;</span>
        <img src="" alt="Preview Image">
    `;

    document.body.appendChild(lightbox);
    lightboxImg = lightbox.querySelector("img");

    lightbox.querySelector(".close").addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (e) => {
        if(e.target === lightbox) closeLightbox();
    });

    lightbox.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    addLightboxNavButtons();
}

function showImage(index){
    if(!lightboxImg || !galleryItems.length) return;
    const img = galleryItems[index]?.querySelector("img");
    if(!img) return;

    lightboxImg.style.opacity = "0";
    setTimeout(() => {
        lightboxImg.src = img.src;
        lightboxImg.style.opacity = "1";
    }, 150);
}

function openLightbox(index){
    if(!lightbox) createLightbox();
    currentIndex = index;
    showImage(currentIndex);
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox(){
    if(!lightbox) return;
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
}

function nextImage(){
    if(!galleryItems.length) return;
    currentIndex = (currentIndex + 1) % galleryItems.length;
    showImage(currentIndex);
}

function prevImage(){
    if(!galleryItems.length) return;
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    showImage(currentIndex);
}

let touchStartX = 0;
let touchEndX = 0;

function handleSwipe(){
    const diff = touchStartX - touchEndX;
    if(Math.abs(diff) > 50){
        if(diff > 0) nextImage();
        else prevImage();
    }
}

function initGalleryLightbox(){
    galleryItems.forEach((item, index) => {
        item.addEventListener("click", () => openLightbox(index));
    });

    document.addEventListener("keydown", (e) => {
        if(!lightbox || !lightbox.classList.contains("active")) return;
        if(e.key === "Escape") closeLightbox();
        if(e.key === "ArrowRight") nextImage();
        if(e.key === "ArrowLeft") prevImage();
    });
}

/* =========================================================
   CONTACT FORM VALIDATION
========================================================= */

function validateEmail(email){
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(String(email).trim().toLowerCase());
}

function showFormSuccess(form){
    const msg = document.createElement("div");
    msg.className = "success-msg";
    msg.textContent = "Message sent successfully!";
    form.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
}

function initContactForm(){
    const contactForm = document.querySelector(".contact-form form");
    if(!contactForm) return;

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = contactForm.querySelector("input[name='name']")?.value.trim();
        const email = contactForm.querySelector("input[name='email']")?.value.trim();
        const message = contactForm.querySelector("textarea[name='message']")?.value.trim();

        if(!name || !email || !message){
            alert("Please fill all fields!");
            return;
        }
        if(!validateEmail(email)){
            alert("Please enter a valid email!");
            return;
        }

        showFormSuccess(contactForm);
        contactForm.reset();
    });
}

function initNewsletterForm(){
    const newsletterForm = document.querySelector(".newsletter-form");
    if(!newsletterForm) return;

    newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector("input")?.value.trim();

        if(!validateEmail(email)){
            alert("Enter valid email!");
            return;
        }

        alert("Subscribed Successfully!");
        newsletterForm.reset();
    });
}

/* =========================================================
   THEME TOGGLE
========================================================= */

function initThemeToggle(){
    const btn  = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");
    if(!btn || !icon) return;

    const saved = localStorage.getItem("theme");
    if(saved === "dark"){
        document.body.classList.add("dark");
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    }

    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        icon.classList.toggle("fa-moon", !isDark);
        icon.classList.toggle("fa-sun", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
}

/* =========================================================
   SCROLL-TO-TOP BUTTON
========================================================= */

function initScrollTopButton(){
    const scrollBtn = document.querySelector(".scroll-top");
    if(!scrollBtn) return;

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* =========================================================
   PARALLAX HERO IMAGE
========================================================= */

const heroImage = document.querySelector(".image-box");

/* =========================================================
   MASTER SCROLL HANDLER
========================================================= */

function initMasterScrollHandler(){
    const scrollBtn = document.querySelector(".scroll-top");
    let scrollTimer = null;
    let ticking = false;

    function onScroll(){
        const scrollY = window.scrollY;

        if(header) header.classList.toggle("sticky", scrollY > 60);

        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if(scrollY >= sectionTop) current = section.getAttribute("id");
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if(link.getAttribute("href") === "#" + current) link.classList.add("active");
        });

        revealOnScroll();

        if(heroImage) heroImage.style.transform = `translateY(${scrollY * 0.08}px)`;

        if(scrollBtn) scrollBtn.classList.toggle("show", scrollY > 300);

        document.body.classList.add("scrolling");
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            document.body.classList.remove("scrolling");
        }, 150);

        ticking = false;
    }

    window.addEventListener("scroll", () => {
        if(!ticking){
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    });

    onScroll();
}

/* =========================================================
   KEYBOARD SHORTCUT
========================================================= */

function initKeyboardShortcuts(){
    document.addEventListener("keydown", (e) => {
        if(e.key === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* =========================================================
   FIX: VISIBILITY FAIL-SAFE
   Guarantees the Services (and other reveal-driven) cards are
   visible even if IntersectionObserver never fires (e.g. the
   card is already fully in the viewport with no scroll event
   to trigger it in some browsers) or if a GSAP tween never runs.
   Runs once, shortly after load; purely additive, never hides
   anything.
========================================================= */

function initVisibilityFailSafe(){
    setTimeout(() => {
        document.querySelectorAll(
            ".fade-up,.fade-left,.fade-right,.zoom-in,.service-card"
        ).forEach(el => {
            const style = getComputedStyle(el);
            const isHidden =
                parseFloat(style.opacity) === 0 ||
                style.visibility === "hidden" ||
                style.display === "none";

            if(isHidden){
                el.classList.add("show", "fade");
                // Clear any leftover inline styles (e.g. from GSAP .from())
                // that could be overriding CSS with opacity:0 / transforms.
                el.style.removeProperty("opacity");
                el.style.removeProperty("transform");
            }
        });
    }, 3500); // after loader (2000ms) + fade (800ms) + small buffer
}

/* =========================================================
   MAIN INIT
========================================================= */

function initApp(){
    initMobileMenu();
    initNameTyping();
    initHeroTyping();
    initAboutTyping();
    initCursor();
    initTabs();
    initSmoothScroll();
    initIntersectionReveal();
    initCounters();
    initSkillBars();
    initProjectFilter();
    initCardHover();
    initRippleEffect();
    initGalleryLightbox();
    initContactForm();
    initNewsletterForm();
    initThemeToggle();
    initScrollTopButton();
    initMasterScrollHandler();
    initKeyboardShortcuts();
    initVisibilityFailSafe(); // FIX: safety net for Services cards
}

document.addEventListener("DOMContentLoaded", initApp);

/* =========================================================
   PAGE LOADER
   FIX: the GSAP block previously used gsap.from(...) with
   rotationX:45 and no clearProps/once/refresh. That writes
   permanent inline styles (opacity:0, translated, rotated,
   scaled down) onto .service-card. If the ScrollTrigger never
   fires (very common right after a loader removal changes
   page height), those inline styles never get cleared and the
   cards stay invisible forever — this was your Services bug.
========================================================= */

function initWebsite(){
    if(typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined"){

        gsap.registerPlugin(ScrollTrigger);

        // FIX: recalc trigger positions now that the loader
        // (which changed page height) has been removed.
        ScrollTrigger.refresh();

        gsap.from(".service-card", {
            scrollTrigger: {
                trigger: ".services-container",
                start: "top 85%",
                once: true          // FIX: fires exactly once, no toggle-state limbo
            },
            opacity: 0,
            y: 60,                  // FIX: smaller offset, less likely to clip/overflow-hide
            scale: 0.92,            // FIX: less aggressive scale
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.15,
            clearProps: "all"       // FIX: strips inline styles after the tween completes
        });

    }
}

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const main = document.getElementById("main-content");

    setTimeout(() => {
        if(loader){
            loader.style.opacity = "0";
            loader.style.pointerEvents = "none";
        }

        setTimeout(() => {
            if(loader) loader.remove();
            if(main) main.style.display = "block";
            initWebsite();
        }, 800);

    }, 2000);
});

/* =========================================================
   THREE.JS SCENE
   FIX: canvas is force-set to sit behind content and ignore
   pointer events, so it can never visually cover or intercept
   clicks on the Services section even if CSS z-index/position
   was mis-set in the stylesheet.
========================================================= */

(function initThreeScene(){

    const canvas = document.getElementById("scene");
    if(!canvas || typeof THREE === "undefined") return;

    // FIX: hard guarantee the canvas never sits above content
    canvas.style.position = canvas.style.position || "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "-1";
    canvas.style.pointerEvents = "none";

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
        45, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    camera.position.set(0, 2, 8);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas, antialias: true, alpha: true, powerPreference: "high-performance"
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const clock = new THREE.Clock();
    const world = new THREE.Group();
    const effects = new THREE.Group();
    scene.add(world);
    scene.add(effects);

    const mouse = { x: 0, y: 0 };

    window.addEventListener("mousemove", (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function updateCamera(){
        camera.position.x += ((mouse.x * 0.8) - camera.position.x) * 0.03;
        camera.position.y += (((mouse.y * 0.4) + 2) - camera.position.y) * 0.03;
        camera.lookAt(world.position);
    }

    const geometry = new THREE.TorusKnotGeometry(1, 0.28, 220, 32);
    const material = new THREE.MeshStandardMaterial({
        color: 0x00d9ff, metalness: 1, roughness: 0.18,
        emissive: 0x0088ff, emissiveIntensity: 1
    });

    const core = new THREE.Mesh(geometry, material);
    core.castShadow = true;
    world.add(core);

    scene.fog = new THREE.FogExp2(0x020611, 0.035);

    const ambientLight = new THREE.AmbientLight(0x66ddff, 1.4);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x66ffff, 0x001122, 1.5);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
    sunLight.position.set(12, 18, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 80;
    sunLight.shadow.camera.left = -20;
    sunLight.shadow.camera.right = 20;
    sunLight.shadow.camera.top = 20;
    sunLight.shadow.camera.bottom = -20;
    sunLight.shadow.bias = -0.0001;
    scene.add(sunLight);

    const leftGlow = new THREE.PointLight(0x0099ff, 12, 40);
    leftGlow.position.set(-8, 5, 3);
    scene.add(leftGlow);

    const rightGlow = new THREE.PointLight(0x00ffff, 12, 40);
    rightGlow.position.set(8, 5, 3);
    scene.add(rightGlow);

    const backLight = new THREE.PointLight(0x0066ff, 15, 70);
    backLight.position.set(0, 8, -12);
    scene.add(backLight);

    const pulseLight = new THREE.PointLight(0x00d9ff, 28, 45);
    pulseLight.position.set(0, 3, 0);
    scene.add(pulseLight);

    const spotLight = new THREE.SpotLight(0x66ffff, 35);
    spotLight.position.set(0, 18, 8);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.5;
    spotLight.decay = 2;
    spotLight.distance = 80;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    scene.add(spotLight);

    spotLight.target = world;
    scene.add(spotLight.target);

    function animateLights(time){
        const t = time * 0.001;
        pulseLight.intensity = 28 + Math.sin(t * 3) * 3;
        leftGlow.intensity = 10 + Math.sin(t * 2.2) * 2;
        rightGlow.intensity = 10 + Math.cos(t * 2.5) * 2;
        backLight.intensity = 14 + Math.sin(t * 1.8) * 3;
    }

    const floorGroup = new THREE.Group();
    scene.add(floorGroup);

    const floor = new THREE.Mesh(
        new THREE.CircleGeometry(40, 128),
        new THREE.MeshStandardMaterial({
            color: 0x07111f, metalness: 0.9, roughness: 0.18,
            transparent: true, opacity: 0.98
        })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    floor.position.y = -1;
    floorGroup.add(floor);

    const grid = new THREE.GridHelper(80, 80, 0x00ffff, 0x004466);
    grid.position.y = -0.98;
    grid.material.transparent = true;
    grid.material.opacity = 0.45;
    floorGroup.add(grid);

    const ring = new THREE.Mesh(
        new THREE.RingGeometry(3.5, 4, 128),
        new THREE.MeshBasicMaterial({ color: 0x00ffff, side: THREE.DoubleSide, transparent: true, opacity: 0.8 })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.95;
    floorGroup.add(ring);

    const outerRing = new THREE.Mesh(
        new THREE.RingGeometry(8, 8.4, 180),
        new THREE.MeshBasicMaterial({ color: 0x0088ff, side: THREE.DoubleSide, transparent: true, opacity: 0.45 })
    );
    outerRing.rotation.x = -Math.PI / 2;
    outerRing.position.y = -0.94;
    floorGroup.add(outerRing);

    const disc = new THREE.Mesh(
        new THREE.CircleGeometry(2.8, 80),
        new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.08 })
    );
    disc.rotation.x = -Math.PI / 2;
    disc.position.y = -0.93;
    floorGroup.add(disc);

    function animateFloor(time){
        const t = time * 0.001;
        ring.rotation.z += 0.003;
        outerRing.rotation.z -= 0.0015;
        ring.material.opacity = 0.65 + Math.sin(t * 2.5) * 0.18;
        outerRing.material.opacity = 0.35 + Math.cos(t * 2.2) * 0.12;
        disc.material.opacity = 0.05 + Math.sin(t * 3) * 0.03;
        grid.material.opacity = 0.35 + Math.sin(t) * 0.08;
    }

    function createGlowTexture(){
        const c = document.createElement("canvas");
        c.width = 256;
        c.height = 256;
        const ctx = c.getContext("2d");
        const gradient = ctx.createRadialGradient(128, 128, 5, 128, 128, 120);
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.2, "rgba(0,255,255,.9)");
        gradient.addColorStop(0.5, "rgba(0,180,255,.35)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);
        return new THREE.CanvasTexture(c);
    }

    const groundGlow = new THREE.Sprite(new THREE.SpriteMaterial({
        map: createGlowTexture(), color: 0x00d9ff, transparent: true,
        opacity: 0.8, depthWrite: false
    }));
    groundGlow.scale.set(18, 18, 1);
    groundGlow.position.set(0, -0.92, 0);
    scene.add(groundGlow);

    const energyPlane = new THREE.Mesh(
        new THREE.CircleGeometry(7, 128),
        new THREE.MeshBasicMaterial({
            color: 0x00ffff, transparent: true, opacity: 0.12,
            side: THREE.DoubleSide, blending: THREE.AdditiveBlending
        })
    );
    energyPlane.rotation.x = -Math.PI / 2;
    energyPlane.position.y = -0.91;
    scene.add(energyPlane);

    const energyRing = new THREE.Mesh(
        new THREE.RingGeometry(6.8, 7.1, 128),
        new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
    );
    energyRing.rotation.x = -Math.PI / 2;
    energyRing.position.y = -0.905;
    scene.add(energyRing);

    function animateGround(time){
        const t = time * 0.001;
        groundGlow.material.opacity = 0.55 + Math.sin(t * 2) * 0.2;
        groundGlow.scale.setScalar(17 + Math.sin(t * 2.2) * 1.2);
        energyPlane.rotation.z += 0.0015;
        energyPlane.material.opacity = 0.10 + Math.sin(t * 3) * 0.03;
        energyRing.rotation.z -= 0.002;
        energyRing.material.opacity = 0.25 + Math.cos(t * 2) * 0.08;
    }

    const hologramBeam = new THREE.Mesh(
        new THREE.CylinderGeometry(2.2, 2.2, 4, 64, 1, true),
        new THREE.MeshBasicMaterial({
            color: 0x00ffff, transparent: true, opacity: 0.08,
            side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false
        })
    );
    hologramBeam.position.set(0, 1, -0.02);
    scene.add(hologramBeam);

    const rings = [];
    for(let i = 0; i < 6; i++){
        const r = new THREE.Mesh(
            new THREE.TorusGeometry(2.1 + (i * 0.22), 0.015, 16, 120),
            new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending })
        );
        r.rotation.x = Math.PI / 2;
        r.position.y = 0.05 + (i * 0.35);
        scene.add(r);
        rings.push(r);
    }

    const orbs = [];
    const orbGeo = new THREE.SphereGeometry(0.05, 16, 16);

    function resetOrb(orb){
        orb.position.set(
            (Math.random() - 0.5) * 2.5,
            Math.random() * 4,
            (Math.random() - 0.5) * 2.5
        );
        orb.userData.speed = 0.01 + Math.random() * 0.02;
    }

    for(let i = 0; i < 40; i++){
        const orb = new THREE.Mesh(orbGeo, new THREE.MeshBasicMaterial({ color: 0x66ffff }));
        resetOrb(orb);
        scene.add(orb);
        orbs.push(orb);
    }

    function animateEnvironment(time){
        const t = time * 0.001;
        hologramBeam.material.opacity = 0.06 + Math.sin(t * 3) * 0.03;
        hologramBeam.scale.y = 1 + Math.sin(t * 2) * 0.08;
        hologramBeam.rotation.y += 0.003;

        rings.forEach((r, index) => {
            r.rotation.z += 0.002 + (index * 0.0008);
            r.material.opacity = 0.25 + Math.sin(t * 3 + index) * 0.15;
        });

        orbs.forEach(orb => {
            orb.position.y += orb.userData.speed;
            if(orb.position.y > 4.2){
                resetOrb(orb);
                orb.position.y = 0;
            }
        });
    }

    function animate(){
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        core.rotation.x = t * 0.3;
        core.rotation.y = t * 0.8;

        updateCamera();
        animateLights(t);
        animateGround(t);
        animateFloor(t);
        animateEnvironment(t);

        renderer.render(scene, camera);
    }

    animate();

})();
