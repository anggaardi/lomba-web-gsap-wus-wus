// ========== Lenis Smooth Scroll Initialization ==========
const lenis = new Lenis();

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ========== Timeline 1: Page 1 Image Grid Animation ==========
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".page-1",
        start: "50% 50%",
        end: "250% 50%",
        scrub: true,
        markers: true,
        pin: true,
    }
});

// Rotate and scale the main container
tl.to(".rotate-div", {
    rotate: -15,
    scale: 0.8,
    force3D: true,
}, 'a');

// Animate row margins to create stagger effect
tl.to("#row-div-2", {
    marginTop: "5%",
    force3D: true,
}, 'a');

tl.to("#row-div-3", {
    marginTop: "-2%",
    force3D: true,
}, 'a');

tl.to("#row-div-4", {
    marginTop: "-8%",
    force3D: true,
}, 'a');

tl.to("#row-div-5", {
    marginTop: "-10%",
    force3D: true,
}, 'a');

// Fade in overlay text
tl.to(".overlay-div h1", {
    opacity: 1,
    force3D: true,
}, 'a');

// Fade in overlay background
tl.to(".overlay-div", {
    opacity: 1,
    delay: 0.1,
    force3D: true,
}, 'a');

// Darken overlay background
tl.to(".overlay-div", {
    backgroundColor: "#000000b4",
    force3D: true,
}, 'a');

// Animate scroll indicator
tl.to(".scrolling", {
    width: "100%",
    force3D: true,
}, 'a');

// ========== Timeline 2: Page 2 Rounded Div Animation ==========
const tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page-2",
        start: "0% 70%",
        end: "50% 50%",
        scrub: true,
        markers: true,
    }
});

tl2.to(".rounded-div-wrapper", {
    height: 0,
    marginTop: 0,
});

// ========== Timeline 3: Page 2 Text Reveal Animation ==========
const tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".content-2",
        start: "20% 50%",
        end: "100% 50%",
        scrub: 1,
        markers: true,
    },
});

// Reveal first line of text
tl3.to(".text-area-hover h1", {
    width: "100%",
}, 'reveal');

// Reveal second line of text simultaneously but with slight delay
tl3.to(".text-area-hover h2", {
    width: "100%"
}, 'reveal+=0.2');

// ========== Timeline 4: Page 4 Content Animation + Zoom ==========
const tl4 = gsap.timeline({
    scrollTrigger: {
        trigger: ".lft-page-4",
        start: "50% 50%",
        end: "400% 50%", // Perpanjang end agar ada ruang untuk zoom
        pin: true,
        scrub: 1,
        markers: true,
    },
});

// Section 1: First content appears
tl4.to(".c-one", {
    marginTop: "-25%",
    opacity: 1,
}, 'sct-1');

// Section 2: Second content appears, first fades
tl4.to(".c-two", {
    opacity: 1
}, 'sct-2');

tl4.to(".c-one", {
    marginTop: "-100%",
    opacity:1,
}, 'sct-2');

// Section 3: Third content appears, second fades
tl4.to(".c-three", {
    opacity: 1
}, 'sct-3');

tl4.to(".c-two", {
    opacity: 0,
}, 'sct-3');

tl4.to(".c-one", {
    marginTop: "-230%",
}, 'sct-3');

tl4.to(".c-three", {
    opacity: 0,
}, 'sct-4');

// Section 4: Circle animation (rotate selesai dulu)
tl4.to(".cir-page-4", {
    marginLeft: "100%",
    rotate: 360,
}, 'sct-4');

// Section 5: ZOOM - Dimulai setelah rotate selesai
tl4.to(".cir-page-4", {
    scale: 60,
    transformOrigin: "center center",
    ease: "power1.inOut",
    duration: 2 // Durasi lebih lama untuk zoom
}, 'sct-5'); // Label baru untuk zoom

// Fade out other content saat zoom
tl4.to(".lft-page-4 h1, .rght-page-4", {
    opacity: 0,
    ease: "power1.inOut"
}, 'sct-5');