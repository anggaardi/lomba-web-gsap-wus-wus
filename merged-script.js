// ========== GSAP & Lenis Initialization ==========
gsap.registerPlugin(ScrollTrigger);

// Gunakan Lenis untuk smooth scroll (lebih modern dari Locomotive)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sync Lenis dengan ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ========== HOME ANIMATIONS (dari home.js) ==========

// Timeline Home 1: Page 1 Image Grid Animation
const tlHome1 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page-1",
        start: "50% 50%",
        end: "250% 50%",
        scrub: true,
        markers: false,
        pin: true,
    }
});

tlHome1.to(".rotate-div", {
    rotate: -15,
    scale: 0.8,
    force3D: true,
}, 'a');

tlHome1.to("#row-div-2", {
    marginTop: "5%",
    force3D: true,
}, 'a');

tlHome1.to("#row-div-3", {
    marginTop: "-2%",
    force3D: true,
}, 'a');

tlHome1.to("#row-div-4", {
    marginTop: "-8%",
    force3D: true,
}, 'a');

tlHome1.to("#row-div-5", {
    marginTop: "-10%",
    force3D: true,
}, 'a');

tlHome1.to(".overlay-div h1", {
    opacity: 1,
    force3D: true,
}, 'a');

tlHome1.to(".overlay-div", {
    opacity: 1,
    delay: 0.1,
    force3D: true,
}, 'a');

tlHome1.to(".overlay-div", {
    backgroundColor: "#000000b4",
    force3D: true,
}, 'a');

tlHome1.to(".scrolling", {
    width: "100%",
    force3D: true,
}, 'a');

// Timeline Home 2: Page 2 Rounded Div Animation
const tlHome2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page-2",
        start: "0% 70%",
        end: "50% 50%",
        scrub: true,
        markers: false,
    }
});

tlHome2.to(".rounded-div-wrapper", {
    height: 0,
    marginTop: 0,
});

// Timeline Home 3: Page 2 Text Reveal Animation
const tlHome3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".content-2",
        start: "20% 50%",
        end: "100% 50%",
        scrub: 1,
        markers: false,
    },
});

tlHome3.to(".text-area-hover h1", {
    width: "100%",
}, 'reveal');

tlHome3.to(".text-area-hover h2", {
    width: "100%"
}, 'reveal+=0.2');

// Timeline Home 4: Page 4 Content Animation + Zoom
const tlHome4 = gsap.timeline({
    scrollTrigger: {
        trigger: ".lft-page-4",
        start: "50% 50%",
        end: "400% 50%",
        pin: true,
        scrub: 1,
        markers: false,
    },
});

tlHome4.to(".c-one", {
    marginTop: "-25%",
    opacity: 1,
}, 'sct-1');

tlHome4.to(".c-two", {
    opacity: 1
}, 'sct-2');

tlHome4.to(".c-one", {
    marginTop: "-100%",
    opacity: 1,
}, 'sct-2');

tlHome4.to(".c-three", {
    opacity: 1
}, 'sct-3');

tlHome4.to(".c-two", {
    opacity: 0,
}, 'sct-3');

tlHome4.to(".c-one", {
    marginTop: "-230%",
}, 'sct-3');

tlHome4.to(".c-three", {
    opacity: 0,
}, 'sct-4');

tlHome4.to(".cir-page-4", {
    marginLeft: "100%",
    rotate: 360,
}, 'sct-4');

// ZOOM - Dimulai setelah rotate selesai
tlHome4.to(".cir-page-4", {
    scale: 40,
    transformOrigin: "center center",
    ease: "power1.inOut",
    duration: 2
}, 'sct-5');

tlHome4.to(".lft-page-4 h1, .rght-page-4", {
    opacity: 0,
    ease: "power1.inOut"
}, 'sct-5');

// ========== DUO STUDIO ANIMATIONS (dari script.js) ==========

// Animasi awal page1
gsap.from(".page1 h1, .page1 h2", {
    y: 10,
    rotate: 10,
    opacity: 0,
    delay: 0.3,
    duration: 0.7,
});

// Timeline Duo 1 - Animasi scroll page1
const tlDuo1 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        start: "top 27%",
        end: "top 0",
        scrub: 3,
        markers: false,
    },
});

tlDuo1.to(".page1 h1", {
    x: -100,
}, "anim");

tlDuo1.to(".page1 h2", {
    x: 100,
}, "anim");

tlDuo1.to(".page1 video", {
    width: "90%",
}, "anim");

// Timeline Duo 2 - Background color change to white
const tlDuo2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        start: "top -115%",
        end: "top -120%",
        scrub: 3,
        markers: false,
    },
});

tlDuo2.to("#main", {
    backgroundColor: "#fff",
});

// Timeline Duo 3 - Background color change to dark
const tlDuo3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        start: "top -280%",
        end: "top -300%",
        scrub: 3,
        markers: false,
    },
});

tlDuo3.to("#main", {
    backgroundColor: "#0F0D0D",
});

// ========== CURSOR EFFECTS ==========

var crsr = document.querySelector(".cursor");

// Fungsi cursor dasar
document.addEventListener("mousemove", function (dets) {
    gsap.to(crsr, {
        x: dets.x,
        y: dets.y,
        duration: 0.3,
        ease: "power2.out",
    });
});

// Cursor effect untuk boxes
var boxes = document.querySelectorAll(".box");
boxes.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
        var att = elem.getAttribute("data-image");
        crsr.style.width = "470px";
        crsr.style.height = "370px";
        crsr.style.borderRadius = "0";
        crsr.style.backgroundImage = `url(${att})`;
    });
    elem.addEventListener("mouseleave", function () {
        elem.style.backgroundColor = "transparent";
        crsr.style.width = "20px";
        crsr.style.height = "20px";
        crsr.style.borderRadius = "50%";
        crsr.style.backgroundImage = `none`;
    });
});

// Cursor effect untuk image
var image = document.querySelector("#image");
if (image) {
    image.addEventListener("mouseenter", function () {
        crsr.innerHTML = "View More";
        gsap.to(crsr, {
            scale: 4,
            backgroundColor: "#EDBFFF",
            duration: 0.3,
        });
        crsr.style.mixBlendMode = "normal";
    });
    image.addEventListener("mouseleave", function () {
        crsr.innerHTML = "";
        gsap.to(crsr, {
            scale: 1,
            duration: 0.3,
        });
        crsr.style.mixBlendMode = "difference";
    });
}

// Cursor effect untuk video - mute/unmute control
var videos = document.querySelectorAll("video");
var currentPlayingVideo = null;

videos.forEach(function (video) {
    video.muted = true;

    video.addEventListener("mouseenter", function () {
        if (video.muted) {
            crsr.innerHTML = "Unmute";
        } else {
            crsr.innerHTML = "Mute";
        }
        gsap.to(crsr, {
            scale: 4,
            backgroundColor: "#EDBFFF",
            duration: 0.3,
        });
        crsr.style.mixBlendMode = "normal";
        crsr.style.cursor = "pointer";
    });

    video.addEventListener("mouseleave", function () {
        crsr.innerHTML = "";
        gsap.to(crsr, {
            scale: 1,
            duration: 0.3,
        });
        crsr.style.mixBlendMode = "difference";
    });

    video.addEventListener("click", function () {
        if (!video.muted) {
            video.muted = true;
            currentPlayingVideo = null;
            crsr.innerHTML = "Unmute";
        } else {
            if (currentPlayingVideo && currentPlayingVideo !== video) {
                currentPlayingVideo.muted = true;
            }
            video.muted = false;
            currentPlayingVideo = video;
            crsr.innerHTML = "Mute";
        }

        gsap.to(crsr, {
            scale: 3.5,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
        });
    });
});