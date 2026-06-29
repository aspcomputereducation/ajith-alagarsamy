

"use strict";

/*=====================================
    SELECT ELEMENTS
=====================================*/

const header = document.querySelector(".header");
const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("section");

/*=====================================
    MOBILE MENU
=====================================*/

if(menuBtn){

    menuBtn.addEventListener("click",()=>{

        navbar.classList.toggle("active");

        menuBtn.classList.toggle("active");

        if(menuBtn.classList.contains("active")){

            menuBtn.innerHTML='<i class="fa-solid fa-xmark"></i>';

        }
        else{

            menuBtn.innerHTML='<i class="fa-solid fa-bars"></i>';

        }

    });

}

/*=====================================
    CLOSE MENU AFTER CLICK
=====================================*/

navLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        navbar.classList.remove("active");

    if(menuBtn){
    menuBtn.classList.remove("active");
    menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';

    }});


});

/*=====================================
    STICKY HEADER
=====================================*/

window.addEventListener("scroll",()=>{

    if(window.scrollY>60){

            if(header){
                header.classList.toggle("sticky", window.scrollY > 60);
            }

    }

    else{

        header.classList.remove("sticky");

    }

});
const cursor = document.querySelector(".cursor");

if (cursor) {

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        cursor.style.left = cursorX + "px";
        cursor.style.top = cursorY + "px";

        requestAnimationFrame(animate);
    }

    animate();
}
/*=====================================
    CURSOR HOVER EFFECT
=====================================*/

const hoverElements = document.querySelectorAll(
    "button, .btn, .project-btn, a"
);

hoverElements.forEach(item => {

    item.addEventListener("mouseenter", () => {
        cursor.classList.add("active");
    });

    item.addEventListener("mouseleave", () => {
        cursor.classList.remove("active");
    });

    item.addEventListener("mousedown", () => {
        cursor.classList.add("click");
    });

    item.addEventListener("mouseup", () => {
        cursor.classList.remove("click");
    });

});

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {

    button.addEventListener("click", () => {

        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabContents.forEach(tab => tab.classList.remove("active"));

        button.classList.add("active");

        const target = button.getAttribute("data-tab");

        document.getElementById(target).classList.add("active");

    });

});
/*=====================================
    ACTIVE NAVIGATION
=====================================*/

window.addEventListener("scroll",()=>{

    stickyHeader();

    activeNavigation();

    revealOnScroll();

    updateScrollButton();

    parallaxEffect();

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-120;

        const sectionHeight=section.offsetHeight;

        if(pageYOffset>=sectionTop){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + current){

            link.classList.add("active");

        }

    });

});

/*=====================================
    SMOOTH SCROLL
=====================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            window.scrollTo({

                top:target.offsetTop-70,

                behavior:"smooth"

            });

        }

    });

});

/*=====================================
    SCROLL REVEAL (Basic)
=====================================*/

const revealElements=document.querySelectorAll(
".section-title,.hero-left,.hero-right,.service-card,.project-card,.timeline-item,.skill-box"
);

function revealOnScroll(){

    revealElements.forEach(item=>{

        const windowHeight=window.innerHeight;

        const revealTop=item.getBoundingClientRect().top;

        const revealPoint=120;

        if(revealTop<windowHeight-revealPoint){

            item.classList.add("fade");

        }

    });

}

window.addEventListener("scroll",revealOnScroll);

revealOnScroll();








/*=====================================
    TYPING ANIMATION
=====================================*/

const typingElement = document.querySelector(".typing");

const typingTexts = [
    "Full Stack Developer",
    "Java Developer",
    "Python Developer",
    "Web Designer",
    "UI / UX Designer",
    "Freelancer"
];

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

    if(!typingElement) return;

    const currentText = typingTexts[textIndex];

    if(!deleting){

        typingElement.textContent =
            currentText.substring(0,charIndex++);

        if(charIndex > currentText.length){

            deleting = true;

            setTimeout(typeEffect,1500);

            return;

        }

    }else{

        typingElement.textContent =
            currentText.substring(0,charIndex--);

        if(charIndex < 0){

            deleting = false;

            textIndex++;

            if(textIndex >= typingTexts.length){

                textIndex = 0;

            }

        }

    }

    setTimeout(typeEffect,deleting ? 60 : 120);

}

typeEffect();

/*=====================================
    COUNTER ANIMATION
=====================================*/

const counters = document.querySelectorAll(".counter");

function runCounter(counter){

    const target =
        Number(counter.getAttribute("data-target"));

    let current = 0;

    const speed = Math.max(1,Math.ceil(target/100));

    const timer = setInterval(()=>{

        current += speed;

        if(current >= target){

            current = target;

            clearInterval(timer);

        }

        counter.textContent = current;

    },20);

}

/*=====================================
    START COUNTERS
=====================================*/

const counterObserver = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            runCounter(entry.target);

            counterObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.5
});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});

/*=====================================
    SKILL PROGRESS BAR
=====================================*/

const progressBars =
document.querySelectorAll(".progress-bar");

function animateSkills(){

    progressBars.forEach(bar=>{

        const width =
            bar.getAttribute("data-width");

        if(width){

            bar.style.width = width + "%";

        }

    });

}

const skillSection =
document.querySelector(".skills");

if(skillSection){

    const skillObserver =
    new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                animateSkills();

                skillObserver.disconnect();

            }

        });

    },{
        threshold:0.4
    });

    skillObserver.observe(skillSection);

}

/*=====================================
    BLINKING CURSOR
=====================================*/

if(typingElement){

    setInterval(()=>{

        typingElement.classList.toggle("cursor");

    },500);

}





/*=====================================
    SCROLL REVEAL ELEMENTS
=====================================*/

const revealItems = document.querySelectorAll(

".fade-up,.fade-left,.fade-right,.zoom-in"

);

/*=====================================
    OBSERVER OPTIONS
=====================================*/

const revealOptions = {

    root:null,

    threshold:0.15,

    rootMargin:"0px 0px -50px 0px"

};

/*=====================================
    INTERSECTION OBSERVER
=====================================*/

const revealObserver = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},

revealOptions

);

/*=====================================
    OBSERVE ALL ELEMENTS
=====================================*/

revealItems.forEach(item=>{

    revealObserver.observe(item);

});

/*=====================================
    ADD ANIMATION DELAY
=====================================*/

document.querySelectorAll(

".service-card,.project-card,.certificate-card,.achievement-card,.testimonial-card"

).forEach((card,index)=>{

    card.style.transitionDelay =

    `${index * 100}ms`;

});

/*=====================================
    SECTION TITLE ANIMATION
=====================================*/

const sectionTitles =

document.querySelectorAll(".section-title");

sectionTitles.forEach(title=>{

    revealObserver.observe(title);

});

/*=====================================
    TIMELINE ANIMATION
=====================================*/

const timelineItems =

document.querySelectorAll(".timeline-item");

timelineItems.forEach((item,index)=>{

    item.style.transitionDelay =

    `${index * 150}ms`;

    revealObserver.observe(item);

});

/*=====================================
    STATISTICS ANIMATION
=====================================*/

const statBoxes =

document.querySelectorAll(".stat-box");

statBoxes.forEach((box,index)=>{

    box.style.transitionDelay =

    `${index * 120}ms`;

    revealObserver.observe(box);

});

/*=====================================
    GALLERY ANIMATION
=====================================*/

const galleryItems =

document.querySelectorAll(".gallery-item");

galleryItems.forEach((item,index)=>{

    item.style.transitionDelay =

    `${index * 80}ms`;

    revealObserver.observe(item);

});

/*=====================================
    CONTACT ANIMATION
=====================================*/

const contactItems =

document.querySelectorAll(

".contact-info,.contact-form"

);

contactItems.forEach(item=>{

    revealObserver.observe(item);

});





/*=====================================
    PAGE LOADER ANIMATION
=====================================*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

    const hero = document.querySelector(".hero");
    


    if(hero){

        hero.classList.add("fade");

    }

});

/*=====================================
    PARALLAX EFFECT
=====================================*/

const heroImage = document.querySelector(".image-box");

window.addEventListener("scroll", () => {

    if(heroImage){

        const offset = window.pageYOffset;

        heroImage.style.transform =
            `translateY(${offset * 0.08}px)`;

    }

});

/*=====================================
    ZOOM ON HOVER
=====================================*/

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

/*=====================================
    BUTTON RIPPLE EFFECT
=====================================*/

const buttons = document.querySelectorAll(

".btn,.project-btn"

);

buttons.forEach(button => {

    button.addEventListener("click", function(e){

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        const rect = this.getBoundingClientRect();

        ripple.style.left = `${e.clientX - rect.left}px`;

        ripple.style.top = `${e.clientY - rect.top}px`;

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        },600);

    });

});

/*=====================================
    PERFORMANCE
=====================================*/

let scrollTimer;

window.addEventListener("scroll", () => {

    clearTimeout(scrollTimer);

    scrollTimer = setTimeout(() => {

        document.body.classList.remove("scrolling");

    },150);

    document.body.classList.add("scrolling");

});

/*=====================================
    PAGE VISIBILITY
=====================================*/

document.addEventListener("visibilitychange", () => {

    if(document.hidden){

        console.log("Page Hidden");

    }else{

        console.log("Page Active");

    }

});

/*=====================================
    WINDOW RESIZE
=====================================*/

window.addEventListener("resize", () => {

    console.log(

        `Width : ${window.innerWidth}px`

    );

});

/*=====================================
    KEYBOARD SHORTCUT
=====================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Home"){

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }

});

/*=====================================
    FINISH
=====================================*/

console.log(

"%cAnimations Ready",

"color:green;font-size:16px;font-weight:bold;"

);




/*=====================================
    SELECT ELEMENTS
=====================================*/

const filterButtons =
document.querySelectorAll(".filter-btn");

const projectCards =
document.querySelectorAll(".project-card");

/*=====================================
    FILTER FUNCTION
=====================================*/

function filterProjects(category) {

    projectCards.forEach(card => {

        const projectCategory = card.getAttribute("data-category");

        if (category === "all" || projectCategory === category) {

            card.classList.remove("hide");

            setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "scale(1)";
            }, 100);

        } else {

            card.style.opacity = "0";
            card.style.transform = "scale(.8)";

            setTimeout(() => {
                card.classList.add("hide");
            }, 300);

        }

    });

}
/*=====================================
    BUTTON EVENTS
=====================================*/

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const category =
        button.getAttribute("data-filter");

        filterProjects(category);

    });

});

/*=====================================
    SHOW ALL ON LOAD
=====================================*/

filterProjects("all");

/*=====================================
    CARD HOVER EFFECT
=====================================*/

projectCards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transition=".35s";

        card.style.transform="translateY(-10px) scale(1.03)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0)";

    });

});

/*=====================================
    PROJECT SEARCH
=====================================*/

const searchInput = document.querySelector("#projectSearch");

if (searchInput) {

    searchInput.addEventListener("keyup", () => {

        const keyword = searchInput.value.trim().toLowerCase();

        projectCards.forEach(card => {

            const title =
                card.querySelector("h3")?.textContent.toLowerCase() || "";

            if (title.includes(keyword)) {

                card.classList.remove("hide");

            } else {

                card.classList.add("hide");

            }

        });

    });

}

/*=====================================
    FILTER COUNT
=====================================*/

const projectCount =
document.querySelector("#projectCount");

function updateProjectCount(){

    if(!projectCount) return;

    let visible=0;

    projectCards.forEach(card=>{

        if(card.style.display!=="none"){

            visible++;

        }

    });

    projectCount.textContent =
    visible;

}

filterButtons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        setTimeout(updateProjectCount,350);

    });

});

updateProjectCount();



/*=====================================
    CREATE LIGHTBOX
=====================================*/
let lightbox = null;
let lightboxImg = null;
let currentIndex = 0;

function createLightbox(){

    lightbox = document.createElement("div");
    lightbox.className = "lightbox";

    lightbox.innerHTML = `
        <span class="close">&times;</span>
        <img src="" alt="Preview Image">
    `;

    document.body.appendChild(lightbox);

    lightboxImg = lightbox.querySelector("img");

    /* Close button */
    lightbox.querySelector(".close")
        .addEventListener("click", closeLightbox);

    /* Click outside image closes */
    lightbox.addEventListener("click", (e) => {
        if(e.target === lightbox){
            closeLightbox();
        }
    });

}

/*=====================================
    OPEN LIGHTBOX
=====================================*/

function openLightbox(index){

    if(!lightbox){
        createLightbox();
    }

    currentIndex = index;

    const img = galleryItems[index].querySelector("img");

    lightboxImg.src = img.src;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}

/*=====================================
    CLOSE LIGHTBOX
=====================================*/

function closeLightbox(){

    if(lightbox){

        lightbox.classList.remove("active");

        document.body.style.overflow = "auto";

    }

}

/*=====================================
    CLICK EVENT ON GALLERY ITEMS
=====================================*/

galleryItems.forEach((item,index)=>{

    item.addEventListener("click",()=>{

        openLightbox(index);

    });

});

/*=====================================
    LIGHTBOX INITIAL STYLE HELP
=====================================*/

function initLightboxStyles(){

    if(!document.querySelector(".lightbox-style")){

        const style = document.createElement("style");

        style.className = "lightbox-style";

        style.textContent = `

        .lightbox{

            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background:rgba(0,0,0,.9);
            display:flex;
            justify-content:center;
            align-items:center;
            opacity:0;
            visibility:hidden;
            transition:.3s;
            z-index:9999;

        }

        .lightbox.active{
            opacity:1;
            visibility:visible;
        }

        .lightbox img{

            max-width:85%;
            max-height:85%;
            border-radius:10px;
            box-shadow:0 10px 30px rgba(0,0,0,.5);

        }

        .lightbox .close{

            position:absolute;
            top:20px;
            right:30px;
            font-size:40px;
            color:#fff;
            cursor:pointer;

        }

        `;

        document.head.appendChild(style);

    }

}

initLightboxStyles();




/*=====================================
    SHOW IMAGE BY INDEX
=====================================*/

function showImage(index){

    const img = galleryItems[index].querySelector("img");

    lightboxImg.style.opacity = "0";

    setTimeout(() => {

        lightboxImg.src = img.src;

        lightboxImg.style.opacity = "1";

    },150);

}

/*=====================================
    NEXT IMAGE
=====================================*/

function nextImage(){

    currentIndex++;

    if(currentIndex >= galleryItems.length){

        currentIndex = 0;

    }

    showImage(currentIndex);

}

/*=====================================
    PREVIOUS IMAGE
=====================================*/

function prevImage(){

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = galleryItems.length - 1;

    }

    showImage(currentIndex);

}

/*=====================================
    KEYBOARD CONTROLS
=====================================*/

document.addEventListener("keydown",(e)=>{

    if(!lightbox || !lightbox.classList.contains("active")) return;

    if(e.key === "Escape"){

        closeLightbox();

    }

    if(e.key === "ArrowRight"){

        nextImage();

    }

    if(e.key === "ArrowLeft"){

        prevImage();

    }

});

/*=====================================
    TOUCH SWIPE SUPPORT
=====================================*/

let startX = 0;

let endX = 0;

if(lightbox){

    lightbox.addEventListener("touchstart",(e)=>{

        startX = e.changedTouches[0].screenX;

    });

    lightbox.addEventListener("touchend",(e)=>{

        endX = e.changedTouches[0].screenX;

        handleSwipe();

    });

}

function handleSwipe(){

    const diff = startX - endX;

    if(Math.abs(diff) > 50){

        if(diff > 0){

            nextImage(); // swipe left

        } else {

            prevImage(); // swipe right

        }

    }

}

/*=====================================
    ADD NAV BUTTONS TO LIGHTBOX
=====================================*/

function addNavButtons(){

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

/*=====================================
    MODIFY CREATE LIGHTBOX TO INCLUDE NAV
=====================================*/

const originalCreateLightbox = createLightbox;

createLightbox = function(){

    originalCreateLightbox();

    addNavButtons();

};

/*=====================================
    NAV BUTTON STYLES
=====================================*/

function addNavStyles(){

    if(!document.querySelector(".lightbox-nav-style")){

        const style = document.createElement("style");

        style.className = "lightbox-nav-style";

        style.textContent = `

        .lightbox-next,
        .lightbox-prev{

            position:absolute;
            top:50%;
            transform:translateY(-50%);
            background:rgba(255,255,255,.2);
            border:none;
            color:#fff;
            font-size:30px;
            padding:10px 15px;
            cursor:pointer;
            border-radius:8px;
            transition:.3s;

        }

        .lightbox-next:hover,
        .lightbox-prev:hover{
            background:rgba(255,255,255,.4);
        }

        .lightbox-next{
            right:30px;
        }

        .lightbox-prev{
            left:30px;
        }

        `;

        document.head.appendChild(style);

    }

}

addNavStyles();




/*=====================================
    CONTACT FORM VALIDATION
=====================================*/

const contactForm = document.querySelector(".contact-form form");

if(contactForm){

    contactForm.addEventListener("submit",(e)=>{

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

/*=====================================
    NEWSLETTER VALIDATION
=====================================*/

const newsletterForm = document.querySelector(".newsletter-form");

if(newsletterForm){

    newsletterForm.addEventListener("submit",(e)=>{

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

/*=====================================
    EMAIL VALIDATION FUNCTION
=====================================*/

function validateEmail(email){
    email = email.trim().toLowerCase();

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}

/*=====================================
    SUCCESS MESSAGE
=====================================*/

function showFormSuccess(form){

    const msg = document.createElement("div");

    msg.className = "success-msg";

    msg.textContent = "Message sent successfully!";

    form.appendChild(msg);

    setTimeout(()=>{

        msg.remove();

    },3000);

}

/*=====================================
    SCROLL TO TOP BUTTON (FINAL LINK)
=====================================*/

const scrollBtn = document.querySelector(".scroll-top");

if(scrollBtn){

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 300){

            scrollBtn.classList.add("show");

        } else {

            scrollBtn.classList.remove("show");

        }

    });

    scrollBtn.addEventListener("click",()=>{

        window.scrollTo({

            top:0,
            behavior:"smooth"

        });

    });

}

/*=====================================
    DARK MODE TOGGLE (FINAL LINK)
=====================================*/

const themeBtn = document.querySelector(".theme-toggle");

if(themeBtn){

    const savedTheme = localStorage.getItem("theme");

    if(savedTheme === "dark"){

        document.body.classList.add("dark");

        themeBtn.innerHTML = "☀️";

    }

    themeBtn.addEventListener("click",()=>{

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){

            themeBtn.innerHTML = "☀️";

            localStorage.setItem("theme","dark");

        }else{

            themeBtn.innerHTML = "🌙";

            localStorage.setItem("theme","light");

        }

    });

}


/*=====================================
    GLOBAL ERROR HANDLER (SAFE)
=====================================*/

window.addEventListener("error",(e)=>{

    console.warn("Script error:",e.message);

});

