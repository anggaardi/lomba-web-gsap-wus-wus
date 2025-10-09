function init() {
  // Hanya jalankan Locomotive Scroll di desktop
  if (window.innerWidth > 768) {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".main"),
      smooth: true,
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.querySelector(".main").style.transform
        ? "transform"
        : "fixed",
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
  } else {
    // Mobile: gunakan scroll biasa tanpa Locomotive
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();
  }
}

init();

// Cursor elements
var crsr = document.querySelector(".cursor");
var main = document.querySelector(".main");

// Fungsi cursor dasar - mengikuti mouse dengan GSAP untuk smooth movement
document.addEventListener("mousemove", function (dets) {
  gsap.to(crsr, {
    x: dets.x,
    y: dets.y,
    duration: 0.3,
    ease: "power2.out",
  });
});

// Animasi awal page1
gsap.from(".page1 h1,.page1 h2", {
  y: 10,
  rotate: 10,
  opacity: 0,
  delay: 0.3,
  duration: 0.7,
});

// Deteksi apakah desktop atau mobile
var isMobile = window.innerWidth <= 768;
var scrollerValue = isMobile ? undefined : ".main";

// Timeline 1 - Animasi scroll page1
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: scrollerValue,
    start: "top 27%",
    end: "top 0",
    scrub: 3,
  },
});
tl.to(
  ".page1 h1",
  {
    x: -100,
  },
  "anim"
);
tl.to(
  ".page1 h2",
  {
    x: 100,
  },
  "anim"
);
tl.to(
  ".page1 video",
  {
    width: "90%",
  },
  "anim"
);

// Timeline 2 - Background color change to white
var tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: scrollerValue,
    start: "top -115%",
    end: "top -120%",
    scrub: 3,
  },
});
tl2.to(".main", {
  backgroundColor: "#fff",
});

// Timeline 3 - Background color change to dark
var tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: scrollerValue,
    start: "top -280%",
    end: "top -300%",
    scrub: 3,
  },
});
tl3.to(".main", {
  backgroundColor: "#0F0D0D",
});

// Cursor effect untuk boxes - menampilkan gambar
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

// Cursor effect untuk image - menampilkan text "View More"
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

// Cursor effect untuk video - mute/unmute control (SMART VERSION)
var videos = document.querySelectorAll("video");
var currentPlayingVideo = null; // Track video yang sedang playing audio

videos.forEach(function (video) {
  // Set default muted state
  video.muted = true;

  video.addEventListener("mouseenter", function () {
    // Tampilkan status sesuai kondisi video
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
    // SMART LOGIC: Mute video lain jika ada yang playing
    if (!video.muted) {
      // User mau mute video ini
      video.muted = true;
      currentPlayingVideo = null;
      crsr.innerHTML = "Unmute";
    } else {
      // User mau unmute video ini
      // Mute video lain yang sedang playing
      if (currentPlayingVideo && currentPlayingVideo !== video) {
        currentPlayingVideo.muted = true;
      }
      // Unmute video ini
      video.muted = false;
      currentPlayingVideo = video;
      crsr.innerHTML = "Mute";
    }

    // Animasi feedback saat klik
    gsap.to(crsr, {
      scale: 3.5,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
  });
});

// Purple hover effect untuk navigation

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    mobileMenu.style.display =
      mobileMenu.style.display === "flex" ? "none" : "flex";
  });
}
