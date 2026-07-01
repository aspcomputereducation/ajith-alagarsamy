

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
document.addEventListener("DOMContentLoaded", function () {

    const text = "Ajith Alagarsamy";
    const target = document.getElementById("nameTyping");

    let i = 0;

    function typeWriter() {

        if (i < text.length) {

            target.textContent += text.charAt(i);

            i++;

            setTimeout(typeWriter, 500);

        }

    }

    typeWriter();

});


/*=====================================
    CURSOR HOVER EFFECT
=====================================*/

const hoverElements = document.querySelectorAll(
    "button, .btn, .project-btn, a, .timeline-content, .service-card, .project-card"
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



    revealOnScroll();

   

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
    "Entrepreneur"
];

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

    if(!typingElement) return;

    const currentText = typingTexts[textIndex];

    typingElement.textContent = currentText.substring(0, charIndex);

    if(!deleting){

        charIndex++;

        if(charIndex > currentText.length){

            if(textIndex === typingTexts.length - 1){
                typingElement.textContent = "Entrepreneur"; 
                return; // STOP FULLY
            }

            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }

    }else{

        charIndex--;

        if(charIndex < 0){

            deleting = false;
            textIndex++;
        }
    }

    setTimeout(typeEffect, deleting ? 60 : 120);
}

typeEffect();
/*=====================================
    ABOUT TYPE ANIMATION
=====================================*/
const homeTyping = document.querySelector(".typing-home");

const homeTexts = [
    "Full Stack Developer",
    "Java Developer",
    "Python Developer",
    "UI / UX Designer",
    "Entrepreneur"
];

let i = 0, j = 0, del = false;

function typeHome(){

    if(!homeTyping) return;

    const text = homeTexts[i];

    homeTyping.textContent = text.substring(0, j);

    if(!del){

        j++;

        if(j > text.length){

            // 🏁 LAST WORD STOP
            if(i === homeTexts.length - 1){
                homeTyping.textContent = "Entrepreneur";
                homeTyping.classList.add("stamp");
                return;
            }

            del = true;
            setTimeout(typeHome, 600);
            return;
        }

    }else{

        j--;

        if(j < 0){
            del = false;
            i++;
        }
    }

    setTimeout(typeHome, del ? 25 : 120);
}

typeHome();

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

    setTimeout(() => {

        const loader = document.getElementById("loader");
        const main = document.getElementById("main-content");

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";
            main.style.display = "block";

            // 🔥 START ENTIRE WEBSITE HERE
            initWebsite();

        }, 800);

    }, 2000);

});

function startCursor() {

    const cursor = document.querySelector(".cursor");
    const blur = document.querySelector(".cursor-blur");

    if (!cursor || !blur) {
        console.log("Cursor missing in HTML");
        return;
    }

    document.addEventListener("mousemove", (e) => {

        const x = e.clientX;
        const y = e.clientY;

        cursor.style.left = x + "px";
        cursor.style.top = y + "px";

        blur.style.left = x + "px";
        blur.style.top = y + "px";

    });

}
startCursor();

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
function createLightbox(){
    lightbox = document.createElement("div");
    lightbox.className = "lightbox";

    lightbox.innerHTML = `
        <span class="close">&times;</span>
        <img src="" alt="Preview Image">
    `;

    document.body.appendChild(lightbox);

    lightboxImg = lightbox.querySelector("img");

    lightbox.querySelector(".close")
        .addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (e) => {
        if(e.target === lightbox){
            closeLightbox();
        }
    });

    addNavButtons(); // ✅ HERE instead
}
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
/*=========================================================
    PART 3A-1
    THREE.JS SETUP
=========================================================*/

const canvas = document.getElementById("scene");

/*=========================================
    SCENE
=========================================*/

const scene = new THREE.Scene();

scene.background = null;

/*=========================================
    CAMERA
=========================================*/

const camera = new THREE.PerspectiveCamera(

    45,

    window.innerWidth / window.innerHeight,

    0.1,

    1000

);

camera.position.set(0, 2, 8);

scene.add(camera);

/*=========================================
    RENDERER
=========================================*/

const renderer = new THREE.WebGLRenderer({

    canvas: canvas,

    antialias: true,

    alpha: true,

    powerPreference: "high-performance"

});

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
THREE.PCFSoftShadowMap;

/*=========================================
    CLOCK
=========================================*/

const clock = new THREE.Clock();

/*=========================================
    GROUPS
=========================================*/

const world = new THREE.Group();

const effects = new THREE.Group();

scene.add(world);

scene.add(effects);

/*=========================================
    MOUSE
=========================================*/

const mouse = {

    x:0,

    y:0

};

window.addEventListener("mousemove",(e)=>{

    mouse.x =

    (e.clientX / window.innerWidth) * 2 - 1;

    mouse.y =

    -(e.clientY / window.innerHeight) * 2 + 1;

});

/*=========================================
    LOADER HIDE
=========================================*/
window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";

        setTimeout(() => {
            loader.remove();

            // =========================
            // GSAP ANIMATION START HERE
            // =========================

            gsap.registerPlugin(ScrollTrigger);

            gsap.from(".service-card", {

                scrollTrigger: {
                    trigger: ".services-container",
                    start: "top 80%"
                },

                opacity: 0,
                y: 100,
                scale: 0.8,
                rotationX: 45,

                duration: 0.9,
                ease: "power3.out",
                stagger: 0.2
            });

        }, 1000);

    }, 2500);

});
/*=========================================
    CAMERA MOTION
=========================================*/

function updateCamera(){

    camera.position.x +=

    ((mouse.x * 0.8) - camera.position.x) * 0.03;

    camera.position.y +=

    (((mouse.y * 0.4)+2) - camera.position.y) * 0.03;

    camera.lookAt(

        world.position

    );

}

/*=========================================
    RESIZE
=========================================*/

window.addEventListener("resize",()=>{

    camera.aspect =

    window.innerWidth /

    window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

});

/*=========================================
    TEMP OBJECT
=========================================*/

const geometry =

new THREE.TorusKnotGeometry(

1,

0.28,

220,

32

);

const material =

new THREE.MeshStandardMaterial({

    color:0x00d9ff,

    metalness:1,

    roughness:0.18,

    emissive:0x0088ff,

    emissiveIntensity:1

});

const core =

new THREE.Mesh(

geometry,

material

);

core.castShadow = true;

world.add(core);

/*=========================================
    ANIMATION
=========================================*/

function animate() {

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





/*=========================================================
    PART 3A-2A
    ENVIRONMENT LIGHTS + FOG
=========================================================*/

/*=========================================
    FOG
=========================================*/

scene.fog = new THREE.FogExp2(
    0x020611,
    0.035
);

/*=========================================
    AMBIENT LIGHT
=========================================*/

const ambientLight = new THREE.AmbientLight(
    0x66ddff,
    1.4
);

scene.add(ambientLight);

/*=========================================
    HEMISPHERE LIGHT
=========================================*/

const hemiLight = new THREE.HemisphereLight(
    0x66ffff,
    0x001122,
    1.5
);

hemiLight.position.set(0, 50, 0);

scene.add(hemiLight);

/*=========================================
    MAIN DIRECTIONAL LIGHT
=========================================*/

const sunLight = new THREE.DirectionalLight(
    0xffffff,
    2.5
);

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

/*=========================================
    LEFT GLOW LIGHT
=========================================*/

const leftGlow = new THREE.PointLight(
    0x0099ff,
    12,
    40
);

leftGlow.position.set(
    -8,
    5,
    3
);

scene.add(leftGlow);

/*=========================================
    RIGHT GLOW LIGHT
=========================================*/

const rightGlow = new THREE.PointLight(
    0x00ffff,
    12,
    40
);

rightGlow.position.set(
    8,
    5,
    3
);

scene.add(rightGlow);

/*=========================================
    BACK LIGHT
=========================================*/

const backLight = new THREE.PointLight(
    0x0066ff,
    15,
    70
);

backLight.position.set(
    0,
    8,
    -12
);

scene.add(backLight);

/*=========================================
    SPOT LIGHT
=========================================*/

const spotLight = new THREE.SpotLight(
    0x66ffff,
    35
);

spotLight.position.set(
    0,
    18,
    8
);

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

/*=========================================
    LIGHT HELPER (OPTIONAL)
    Uncomment while debugging
=========================================*/

// const helper = new THREE.DirectionalLightHelper(
//     sunLight,
//     2
// );

// scene.add(helper);

/*=========================================
    LIGHT ANIMATION
=========================================*/

function animateLights(time){

    const t = time * 0.001;

    pointBlue.intensity =
        28 + Math.sin(t * 3) * 3;

    leftGlow.intensity =
        10 + Math.sin(t * 2.2) * 2;

    rightGlow.intensity =
        10 + Math.cos(t * 2.5) * 2;

    backLight.intensity =
        14 + Math.sin(t * 1.8) * 3;

}
/*=========================================================
    PART 3A-2B-1
    REFLECTIVE FLOOR + CYBER GRID FLOOR
=========================================================*/

/*=========================================
    FLOOR GROUP
=========================================*/

const floorGroup = new THREE.Group();
scene.add(floorGroup);

/*=========================================
    MAIN FLOOR
=========================================*/

const floorGeometry = new THREE.CircleGeometry(40, 128);

const floorMaterial = new THREE.MeshStandardMaterial({

    color:0x07111f,

    metalness:0.9,

    roughness:0.18,

    transparent:true,

    opacity:0.98

});

const floor = new THREE.Mesh(
    floorGeometry,
    floorMaterial
);

floor.rotation.x = -Math.PI / 2;

floor.receiveShadow = true;

floor.position.y = -1;

floorGroup.add(floor);

/*=========================================
    CYBER GRID
=========================================*/

const grid = new THREE.GridHelper(

    80,
    80,
    0x00ffff,
    0x004466

);

grid.position.y = -0.98;

grid.material.transparent = true;
grid.material.opacity = 0.45;

floorGroup.add(grid);

/*=========================================
    INNER RING
=========================================*/

const ringGeometry =
new THREE.RingGeometry(
    3.5,
    4,
    128
);

const ringMaterial =
new THREE.MeshBasicMaterial({

    color:0x00ffff,

    side:THREE.DoubleSide,

    transparent:true,

    opacity:0.8

});

const ring =
new THREE.Mesh(
    ringGeometry,
    ringMaterial
);

ring.rotation.x = -Math.PI / 2;
ring.position.y = -0.95;

floorGroup.add(ring);

/*=========================================
    OUTER RING
=========================================*/

const outerRing =
new THREE.Mesh(

    new THREE.RingGeometry(
        8,
        8.4,
        180
    ),

    new THREE.MeshBasicMaterial({

        color:0x0088ff,

        side:THREE.DoubleSide,

        transparent:true,

        opacity:0.45

    })

);

outerRing.rotation.x = -Math.PI / 2;
outerRing.position.y = -0.94;

floorGroup.add(outerRing);

/*=========================================
    FLOOR DISC
=========================================*/

const disc = new THREE.Mesh(

    new THREE.CircleGeometry(
        2.8,
        80
    ),

    new THREE.MeshBasicMaterial({

        color:0x00ffff,

        transparent:true,

        opacity:0.08

    })

);

disc.rotation.x = -Math.PI / 2;

disc.position.y = -0.93;

floorGroup.add(disc);

/*=========================================
    FLOOR ANIMATION
=========================================*/

function animateFloor(time){

    const t = time * 0.001;

    ring.rotation.z += 0.003;

    outerRing.rotation.z -= 0.0015;

    ring.material.opacity =
        0.65 + Math.sin(t * 2.5) * 0.18;

    outerRing.material.opacity =
        0.35 + Math.cos(t * 2.2) * 0.12;

    disc.material.opacity =
        0.05 + Math.sin(t * 3) * 0.03;

    grid.material.opacity =
        0.35 + Math.sin(t) * 0.08;

}
/*=========================================================
    PART 3A-2B-2A
    GROUND GLOW + ENERGY PLANE
=========================================================*/

/*=========================================
    GROUND GLOW
=========================================*/

const glowTexture = createGlowTexture();

const glowMaterial = new THREE.SpriteMaterial({
    map: glowTexture,
    color: 0x00d9ff,
    transparent: true,
    opacity: 0.8,
    depthWrite: false
});

const groundGlow = new THREE.Sprite(glowMaterial);

groundGlow.scale.set(18, 18, 1);
groundGlow.position.set(0, -0.92, 0);

scene.add(groundGlow);

/*=========================================
    ENERGY PLANE
=========================================*/

const energyGeometry = new THREE.CircleGeometry(7, 128);

const energyMaterial = new THREE.MeshBasicMaterial({

    color:0x00ffff,

    transparent:true,

    opacity:0.12,

    side:THREE.DoubleSide,

    blending:THREE.AdditiveBlending

});

const energyPlane = new THREE.Mesh(
    energyGeometry,
    energyMaterial
);

energyPlane.rotation.x = -Math.PI / 2;
energyPlane.position.y = -0.91;

scene.add(energyPlane);

/*=========================================
    SECOND ENERGY RING
=========================================*/

const energyRing = new THREE.Mesh(

    new THREE.RingGeometry(6.8,7.1,128),

    new THREE.MeshBasicMaterial({

        color:0x00ffff,

        transparent:true,

        opacity:0.35,

        side:THREE.DoubleSide

    })

);

energyRing.rotation.x = -Math.PI/2;
energyRing.position.y = -0.905;

scene.add(energyRing);

/*=========================================
    CREATE GLOW TEXTURE
=========================================*/

function createGlowTexture(){

    const canvas = document.createElement("canvas");

    canvas.width = 256;
    canvas.height = 256;

    const ctx = canvas.getContext("2d");

    const gradient = ctx.createRadialGradient(

        128,128,5,

        128,128,120

    );

    gradient.addColorStop(0,"rgba(255,255,255,1)");
    gradient.addColorStop(0.2,"rgba(0,255,255,.9)");
    gradient.addColorStop(0.5,"rgba(0,180,255,.35)");
    gradient.addColorStop(1,"rgba(0,0,0,0)");

    ctx.fillStyle = gradient;

    ctx.fillRect(0,0,256,256);

    return new THREE.CanvasTexture(canvas);

}

/*=========================================
    GROUND ANIMATION
=========================================*/

function animateGround(time){

    const t = time * 0.001;

    groundGlow.material.opacity =
        0.55 + Math.sin(t*2)*0.2;

    groundGlow.scale.setScalar(
        17 + Math.sin(t*2.2)*1.2
    );

    energyPlane.rotation.z += 0.0015;

    energyPlane.material.opacity =
        0.10 + Math.sin(t*3)*0.03;

    energyRing.rotation.z -= 0.002;

    energyRing.material.opacity =
        0.25 + Math.cos(t*2)*0.08;

}
/*=========================================================
    PART 3A-2B-2B
    HOLOGRAM FLOOR + ENVIRONMENT ANIMATION
=========================================================*/

/*=========================================
    HOLOGRAM CYLINDER
=========================================*/

const holoGeometry = new THREE.CylinderGeometry(
    2.2,
    2.2,
    4,
    64,
    1,
    true
);

const holoMaterial = new THREE.MeshBasicMaterial({

    color:0x00ffff,

    transparent:true,

    opacity:0.08,

    side:THREE.DoubleSide,

    blending:THREE.AdditiveBlending,

    depthWrite:false

});

const hologramBeam = new THREE.Mesh(
    holoGeometry,
    holoMaterial
);

hologramBeam.position.set(0,1,-0.02);

scene.add(hologramBeam);

/*=========================================
    CYBER RINGS
=========================================*/

const rings=[];

for(let i=0;i<6;i++){

    const ring=new THREE.Mesh(

        new THREE.TorusGeometry(
            2.1+(i*0.22),
            0.015,
            16,
            120
        ),

        new THREE.MeshBasicMaterial({

            color:0x00ffff,

            transparent:true,

            opacity:0.5,

            blending:THREE.AdditiveBlending

        })

    );

    ring.rotation.x=Math.PI/2;

    ring.position.y=.05+(i*.35);

    scene.add(ring);

    rings.push(ring);

}

/*=========================================
    FLOATING LIGHT ORBS
=========================================*/

const orbs=[];

const orbGeo=new THREE.SphereGeometry(.05,16,16);

for(let i=0;i<40;i++){

    const orb=new THREE.Mesh(

        orbGeo,

        new THREE.MeshBasicMaterial({

            color:0x66ffff

        })

    );

    resetOrb(orb);

    scene.add(orb);

    orbs.push(orb);

}

function resetOrb(orb){

    orb.position.set(

        (Math.random()-0.5)*2.5,

        Math.random()*4,

        (Math.random()-0.5)*2.5

    );

    orb.userData.speed=
    .01+Math.random()*0.02;

}

/*=========================================
    ENVIRONMENT ANIMATION
=========================================*/

function animateEnvironment(time){

    const t=time*.001;

    hologramBeam.material.opacity=

    .06+

    Math.sin(t*3)*.03;

    hologramBeam.scale.y=

    1+

    Math.sin(t*2)*.08;

    hologramBeam.rotation.y+=0.003;

    rings.forEach((ring,index)=>{

        ring.rotation.z+=0.002+(index*.0008);

        ring.material.opacity=

        .25+

        Math.sin(

            t*3+index

        )*.15;

    });

    orbs.forEach(orb=>{

        orb.position.y+=orb.userData.speed;

        if(orb.position.y>4.2){

            resetOrb(orb);

            orb.position.y=0;

        }

    });

}
/*=========================================================
    PART 3A-3
    CAMERA ANIMATION + CURSOR FOLLOW + SPAWN POINTS
=========================================================*/

/*=========================================
    CAMERA TARGET
=========================================*/

const cameraTarget = new THREE.Vector3(0,1,0);



/*=========================================
    INTRO CAMERA
=========================================*/

camera.position.set(0,5,18);

function introCamera(time){

    const t = time * 0.001;

    camera.position.z -= 0.02;

    camera.position.x = Math.sin(t * 0.4) * 0.8;

    camera.position.y = 4 + Math.sin(t) * 0.2;

    if(camera.position.z <= 8){

        camera.position.z = 8;

        cameraMode = "follow";

    }

}

/*=========================================
    CURSOR FOLLOW
=========================================*/

function followCamera(){

    const targetX = mouse.x * 1.5;

    const targetY = 2 + mouse.y * 0.8;

    camera.position.x +=

        (targetX - camera.position.x) * 0.05;

    camera.position.y +=

        (targetY - camera.position.y) * 0.05;

}

/*=========================================
    LOOK AT
=========================================*/

function updateLookAt(){

    camera.lookAt(cameraTarget);

}
document.addEventListener("DOMContentLoaded", () => {

    const filterButtons = document.querySelectorAll(".project-filter button");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {

            // Active button
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filter = button.dataset.filter;

            projectCards.forEach(card => {

                if (filter === "all") {
                    card.style.display = "block";
                } else if (card.dataset.category === filter) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }

            });

        });
    });

});




