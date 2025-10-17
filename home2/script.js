// ========== Lenis Smooth Scroll Initialization ==========
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});
window.lenis = lenis;

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ========== Timeline Image Grid: Page 1 Image Grid Animation ==========
const tlImageGrid = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-1",
    start: "50% 50%",
    end: "250% 50%",
    scrub: true,
    pin: true,
  },
});

tlImageGrid.to(
  ".rotate-div",
  {
    rotate: -15,
    scale: 0.8,
    force3D: true,
  },
  "a"
);

tlImageGrid.to(
  "#row-div-2",
  {
    marginTop: "5%",
    force3D: true,
  },
  "a"
);

tlImageGrid.to(
  "#row-div-3",
  {
    marginTop: "-2%",
    force3D: true,
  },
  "a"
);

tlImageGrid.to(
  "#row-div-4",
  {
    marginTop: "-8%",
    force3D: true,
  },
  "a"
);

tlImageGrid.to(
  "#row-div-5",
  {
    marginTop: "-10%",
    force3D: true,
  },
  "a"
);

tlImageGrid.to(
  ".overlay-div h1",
  {
    opacity: 1,
    force3D: true,
  },
  "a"
);

tlImageGrid.to(
  ".overlay-div",
  {
    opacity: 1,
    delay: 0.1,
    force3D: true,
  },
  "a"
);

tlImageGrid.to(
  ".overlay-div",
  {
    backgroundColor: "#000000b4",
    force3D: true,
  },
  "a"
);

tlImageGrid.to(
  ".scrolling",
  {
    width: "100%",
    force3D: true,
  },
  "a"
);

// ========== Timeline Rounded Div: Page 2 Rounded Div Animation ==========
const tlRoundedDiv = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-2",
    start: "0% 70%",
    end: "50% 50%",
    scrub: true,
  },
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
  },
});

tlTextReveal.to(
  ".text-area-hover h1",
  {
    width: "100%",
  },
  "reveal"
);

tlTextReveal.to(
  ".text-area-hover h2",
  {
    width: "100%",
  },
  "reveal+=0.2"
);

// ========== Timeline About Zoom: Page 4 Content Animation + Zoom + PAGE 5 ==========
const tlAboutZoom = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-4",
    start: "center center",
    end: "+=500%",
    scrub: 1,
    pin: true,
  },
});

tlAboutZoom.to(
  ".c-one",
  {
    marginTop: "-25%",
    opacity: 1,
  },
  "sct-1"
);

tlAboutZoom.to(
  ".c-two",
  {
    opacity: 1,
  },
  "sct-2"
);

tlAboutZoom.to(
  ".c-one",
  {
    marginTop: "-100%",
    opacity: 1,
  },
  "sct-2"
);

tlAboutZoom.to(
  ".c-three",
  {
    opacity: 1,
  },
  "sct-3"
);

tlAboutZoom.to(
  ".c-two",
  {
    opacity: 0,
  },
  "sct-3"
);

tlAboutZoom.to(
  ".c-one",
  {
    marginTop: "-230%",
  },
  "sct-3"
);

tlAboutZoom.to(
  ".c-three",
  {
    opacity: 0,
  },
  "sct-4"
);

tlAboutZoom.to(
  ".cir-page-4",
  {
    marginLeft: "100%",
    rotate: 360,
  },
  "sct-4"
);

tlAboutZoom.to(
  ".cir-page-4",
  {
    scale: 40,
    transformOrigin: "center center",
    ease: "power1.inOut",
  },
  "sct-5"
);

tlAboutZoom.to(
  ".lft-page-4 h1, .rght-page-4",
  {
    opacity: 0,
    ease: "power1.inOut",
  },
  "sct-5"
);

tlAboutZoom.to(
  ".lft-page-4, .rght-page-4, .cir-page-4",
  {
    opacity: 0,
  },
  "sct-6"
);

tlAboutZoom.to(
  ".page-5",
  {
    opacity: 1,
    scale: 1,
    zIndex: 10,
    pointerEvents: "auto",
    ease: "power2.out",
  },
  "sct-6"
);

// ========== PAGE 5 - Hero Section Animation ==========
gsap.registerPlugin(ScrollTrigger);

gsap.set(".page-5 .top h1 svg path", {
  y: "100%",
  opacity: 0,
});

const tlPage5 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-5",
    start: "top 80%",
    toggleActions: "play none none none",
  },
});

tlPage5.to(".page-5 .top h1 svg path", {
  y: 0,
  opacity: 1,
  stagger: 0.1,
  duration: 1,
  ease: "power2.out",
});

gsap.from(".page-5 .bottom .left svg", {
  y: 30,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".page-5 .bottom",
    start: "top 80%",
    toggleActions: "play none none none",
  },
});

gsap.from(".page-5 .bottom .left p", {
  y: 30,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
  delay: 0.2,
  scrollTrigger: {
    trigger: ".page-5 .bottom",
    start: "top 80%",
    toggleActions: "play none none none",
  },
});

gsap.from(".page-5 .bottom .left button", {
  y: 30,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
  delay: 0.4,
  scrollTrigger: {
    trigger: ".page-5 .bottom",
    start: "top 80%",
    toggleActions: "play none none none",
  },
});

gsap.from(".page-5 .bottom .middle", {
  y: 30,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
  delay: 0.2,
  scrollTrigger: {
    trigger: ".page-5 .bottom",
    start: "top 80%",
    toggleActions: "play none none none",
  },
});

gsap.from(".page-5 .bottom .right p", {
  y: 30,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
  delay: 0.4,
  scrollTrigger: {
    trigger: ".page-5 .bottom",
    start: "top 80%",
    toggleActions: "play none none none",
  },
});

gsap.from(".page-5 .bottom .right h2", {
  y: 30,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
  delay: 0.6,
  scrollTrigger: {
    trigger: ".page-5 .bottom",
    start: "top 80%",
    toggleActions: "play none none none",
  },
});

// ========== PAGE 6 - Services Section Animation ==========
const text6 = document.querySelectorAll(".page-6 h2 span");

text6.forEach((text) => {
  gsap.set(text, { y: "100%", opacity: 0 });
});

gsap.to(text6, {
  y: 0,
  opacity: 1,
  stagger: 0.2,
  duration: 1,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".page-6",
    start: "top 100%",
    toggleActions: "play none none none",
  },
});

gsap.to(".ek", {
  duration: 3,
  scrollTrigger: {
    trigger: ".ek",
    start: "top 10%",
    end: "bottom -27%",
    scrub: true,
    pin: true,
    pinSpacing: false,
  },
});

gsap.to(".do", {
  duration: 3,
  scrollTrigger: {
    trigger: ".do",
    start: "top 27%",
    end: "bottom 40%",
    scrub: true,
    pin: true,
    pinSpacing: false,
  },
});

gsap.to(".tin", {
  duration: 3,
  scrollTrigger: {
    trigger: ".tin",
    start: "top 45%",
    end: "bottom 100%",
    scrub: true,
    pin: true,
    pinSpacing: false,
  },
});

// ========== PAGE 7 - Selected Works Section Animation ==========
const text7 = document.querySelectorAll(".page-7 h2 span");

text7.forEach((text) => {
  gsap.set(text, { y: "100%", opacity: 0 });
});

gsap.to(text7, {
  y: 0,
  opacity: 1,
  stagger: 0.2,
  duration: 1,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".page-7",
    start: "top 100%",
    toggleActions: "play none none none",
  },
});

// ========== Card Hover Effect ==========
function cardHoverEffect() {
  let showingImage;

  document.querySelectorAll(".cnt").forEach(function (cnt) {
    cnt.addEventListener("mousemove", function (dets) {
      const cursorElement = document.querySelector("#cursor");
      if (
        !cursorElement ||
        !cursorElement.children[dets.target.dataset.index]
      ) {
        return;
      }

      cursorElement.children[dets.target.dataset.index].style.opacity = 1;
      showingImage = dets.target;
      cursorElement.children[
        dets.target.dataset.index
      ].style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
      showingImage.style.filter = "grayscale(1)";

      document.querySelector("#work").style.backgroundColor =
        "#" + dets.target.dataset.color;
    });

    cnt.addEventListener("mouseleave", function (dets) {
      const cursorElement = document.querySelector("#cursor");
      if (
        !cursorElement ||
        !showingImage ||
        !cursorElement.children[showingImage.dataset.index]
      ) {
        return;
      }

      cursorElement.children[showingImage.dataset.index].style.opacity = 0;
      showingImage.style.filter = "grayscale(0)";
      document.querySelector("#work").style.backgroundColor = "#111";
    });
  });
}

cardHoverEffect();

// Debug log
console.log("All timelines created successfully");
console.log("PAGE 6 text spans found:", text6.length);
console.log("PAGE 7 text spans found:", text7.length);