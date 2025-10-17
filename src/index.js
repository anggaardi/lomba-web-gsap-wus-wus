// ========== Lenis Smooth Scroll Initialization ==========
const lenis = new Lenis();
window.lenis = lenis; // Expose ke window agar bisa diakses dari navbar.js

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Disable lag smoothing in GSAP
gsap.ticker.lagSmoothing(0);

// ========== Timeline Image Grid: Page 1 Image Grid Animation ==========
const tlImageGrid = gsap.timeline({
    scrollTrigger: {
        trigger: ".page-1",
        start: "50% 50%",
        end: "250% 50%",
        scrub: true,
        markers: true,
        pin: true,
    }
});

tlImageGrid.to(".rotate-div", {
    rotate: -15,
    scale: 0.8,
    force3D: true,
}, 'a');

tlImageGrid.to("#row-div-2", {
    marginTop: "5%",
    force3D: true,
}, 'a');

tlImageGrid.to("#row-div-3", {
    marginTop: "-2%",
    force3D: true,
}, 'a');

tlImageGrid.to("#row-div-4", {
    marginTop: "-8%",
    force3D: true,
}, 'a');

tlImageGrid.to("#row-div-5", {
    marginTop: "-10%",
    force3D: true,
}, 'a');

tlImageGrid.to(".overlay-div h1", {
    opacity: 1,
    force3D: true,
}, 'a');

tlImageGrid.to(".overlay-div", {
    opacity: 1,
    delay: 0.1,
    force3D: true,
}, 'a');

tlImageGrid.to(".overlay-div", {
    backgroundColor: "#000000b4",
    force3D: true,
}, 'a');

tlImageGrid.to(".scrolling", {
    width: "100%",
    force3D: true,
}, 'a');

// ========== Timeline Rounded Div: Page 2 Rounded Div Animation ==========
const tlRoundedDiv = gsap.timeline({
    scrollTrigger: {
        trigger: ".page-2",
        start: "0% 70%",
        end: "50% 50%",
        scrub: true,
        markers: true,
    }
});

tlRoundedDiv.to(".rounded-div-wrapper", {
    height: 0,
    marginTop: 0,
});

// ========== Timeline Text Reveal: Page 2 Text Reveal Animation ==========
const tlTextReveal = gsap.timeline({
    scrollTrigger: {
        trigger: ".content-2",
        start: "20% 50%",
        end: "100% 50%",
        scrub: 1,
        markers: true,
    },
});

tlTextReveal.to(".text-area-hover h1", {
    width: "100%",
}, 'reveal');

tlTextReveal.to(".text-area-hover h2", {
    width: "100%"
}, 'reveal+=0.2');

// ========== Timeline About Zoom: Page 4 Content Animation + Zoom + Page 5 ==========
const tlAboutZoom = gsap.timeline({
    scrollTrigger: {
        trigger: ".page-4",
        start: "center center",
        end: "+=750%", // Perpanjang untuk service cards
        scrub: 1,
        pin: true,
        markers: true,
    },
});

// Section 1: First content appears
tlAboutZoom.to(".c-one", {
    marginTop: "-25%",
    opacity: 1,
}, 'sct-1');

// Section 2: Second content appears
tlAboutZoom.to(".c-two", {
    opacity: 1
}, 'sct-2');

tlAboutZoom.to(".c-one", {
    marginTop: "-100%",
    opacity: 1,
}, 'sct-2');

// Section 3: Third content appears
tlAboutZoom.to(".c-three", {
    opacity: 1
}, 'sct-3');

tlAboutZoom.to(".c-two", {
    opacity: 0,
}, 'sct-3');

tlAboutZoom.to(".c-one", {
    marginTop: "-230%",
}, 'sct-3');

tlAboutZoom.to(".c-three", {
    opacity: 0,
}, 'sct-4');

// Section 4: Circle rotate
tlAboutZoom.to(".cir-page-4", {
    marginLeft: "100%",
    rotate: 360,
}, 'sct-4');

// Section 5: ZOOM
tlAboutZoom.to(".cir-page-4", {
    scale: 40,
    transformOrigin: "center center",
    ease: "power1.inOut",
}, 'sct-5');

tlAboutZoom.to(".lft-page-4 h1, .rght-page-4", {
    opacity: 0,
    ease: "power1.inOut"
}, 'sct-5');

// Section 6: Fade page-4, show page-5
tlAboutZoom.to(".lft-page-4, .rght-page-4, .cir-page-4", {
    opacity: 0,
}, 'sct-6');

tlAboutZoom.to(".page-5", {
    opacity: 1,
    scale: 1,
    ease: "power2.out",
}, 'sct-6');

// Title muncul
tlAboutZoom.from(".page-5-title", {
    y: 100,
    opacity: 0,
    ease: "power2.out",
}, 'sct-6+=0.1');

// ========== Service Cards Animation - Naik satu per satu dari bawah ==========
// Set initial state untuk cards (hidden di bawah)
gsap.set(".service-card", {
    y: 150,
    opacity: 0
});

// Animasi cards muncul satu per satu dari bawah ke atas
const cards = gsap.utils.toArray(".service-card");
cards.forEach((card, index) => {
    tlAboutZoom.to(card, {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 0.5
    }, `sct-7+=${index * 0.15}`);
});

// ========== HORIZONTAL SCROLL Section - Muncul SETELAH service cards ==========
document.addEventListener("DOMContentLoaded", () => {
    let horizontalSection = document.querySelector('.horizontal');
    
    if (horizontalSection) {
        gsap.to(".horizontal", {
            x: () => -(horizontalSection.scrollWidth - window.innerWidth),
            scrollTrigger: {
                trigger: ".horizontal",
                start: 'center center',
                end: () => "+=" + (horizontalSection.scrollWidth),
                pin: "#horizontal-scroll",
                scrub: true,
                invalidateOnRefresh: true,
                markers: true
            }
        });

        // Individual card animation untuk horizontal scroll
        document.querySelectorAll(".horizontal .card").forEach((card) => {
            gsap.from(card, {
                x: 250,
                opacity: 0,
                duration: 0.6,
                scrollTrigger: {
                    trigger: card,
                    start: "left 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }
});

// Debug log
console.log("All timelines created successfully");
console.log("Service cards found:", cards.length);