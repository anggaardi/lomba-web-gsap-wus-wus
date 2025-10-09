document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#main");
  const menuToggle = document.querySelector(".menu-toggle");
  const menuOverlay = document.querySelector(".menu-overlay");
  const menuContent = document.querySelector(".menu-content");
  const menuPreviewImg = document.querySelector(".menu-preview-img");
  const menuLinks = document.querySelectorAll(".link a");
  const closeMenuBtn = document.getElementById("close-menu");
  let isOpen = false;
  let isAnimating = false;

  let lenis = null; // Declare lenis variable

  // Initialize Lenis
  if (window.Lenis) {
    lenis = new Lenis({
      duration: 1.2, // Duration for scroll
      easing: 'ease', // Easing function
      smoothWheel: true, // Enable smooth scroll on mouse wheel
      smoothTouch: true, // Enable smooth scroll on touch devices
      direction: 'vertical', // Set scroll direction
      gestureDirection: 'vertical',
    });

    // Start Lenis smooth scrolling
    lenis.start();
  }

  menuToggle.addEventListener("click", () => {
    if (!isOpen) openMenu();
    else closeMenu();
  });

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (isOpen) closeMenu();
    });
  }

  function resetPreviewImage() {
    if (!menuPreviewImg) return;
    menuPreviewImg.innerHTML = "";
    const defaultPreviewImg = document.createElement("img");
    defaultPreviewImg.src = "./image/latte copy.png";
    defaultPreviewImg.alt = "";
    menuPreviewImg.appendChild(defaultPreviewImg);
  }

  function changePreviewImage(imgSrc) {
    if (!menuPreviewImg) return;
    const currentImg = menuPreviewImg.querySelector("img");
    if (!currentImg) return;

    gsap.to(currentImg, {
      opacity: 0,
      scale: 0.8,
      rotation: -10,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        currentImg.src = imgSrc;
        gsap.to(currentImg, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });
  }

  function animateMenuToggle(isOpening) {
    const open = document.querySelector("p#menu-open");
    const close = document.querySelector("p#menu-close");

    if (open && close) {
      gsap.to(isOpening ? open : close, {
        x: isOpening ? -5 : 5,
        y: isOpening ? -10 : 10,
        rotation: isOpening ? -5 : 5,
        opacity: 0,
        delay: 0.25,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(isOpening ? close : open, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        delay: 0.5,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }

  function openMenu() {
    if (isAnimating || isOpen) return;
    isAnimating = true;

    if (container) {
      gsap.to(container, {
        rotation: 10,
        x: 300,
        y: 450,
        scale: 1.5,
        duration: 1.25,
        ease: "power4.inOut",
      });
    }

    animateMenuToggle(true);

    gsap.to(menuContent, {
      rotation: 0,
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1.25,
      ease: "power4.inOut",
    });

    gsap.to([".link a", ".social a"], {
      y: "0%",
      opacity: 1,
      duration: 1,
      delay: 0.75,
      stagger: 0.1,
      ease: "power3.out",
    });

    gsap.to(menuOverlay, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.25,
      ease: "power4.inOut",
      onComplete: () => {
        isOpen = true;
        isAnimating = false;
        menuOverlay.classList.add("active");
      },
    });
  }

  function closeMenu() {
    if (isAnimating || !isOpen) return;
    isAnimating = true;

    if (container) {
      gsap.to(container, {
        rotation: 0,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.25,
        ease: "power4.inOut",
      });
    }

    animateMenuToggle(false);

    gsap.to(menuContent, {
      rotation: -15,
      x: -100,
      y: -100,
      scale: 1.5,
      opacity: 0.25,
      duration: 1.25,
      ease: "power4.inOut",
    });

    gsap.to(menuOverlay, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1.25,
      ease: "power4.inOut",
      onComplete: () => {
        isOpen = false;
        isAnimating = false;
        menuOverlay.classList.remove("active");
        gsap.set([".link a", ".social a"], { y: "120%" });
        resetPreviewImage();
      },
    });
  }

  menuLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      if (!isOpen || isAnimating) return;

      const imgSrc = link.getAttribute("data-img");
      if (!imgSrc) return;

      changePreviewImage(imgSrc);
    });
  });

  window.addEventListener("resize", () => {
    if (lenis && !isOpen) {
      lenis.resize();
    }
  });

  window.addEventListener("load", () => {
    if (lenis && !isOpen) {
      setTimeout(() => {
        lenis.resize();
      }, 100);
    }
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (isAnimating || !isOpen) return;

      e.preventDefault();

      animateMenuToggle(false);

      gsap.to(menuContent, {
        rotation: -15,
        x: -100,
        y: -100,
        scale: 1.5,
        opacity: 0.25,
        duration: 1.25,
        ease: "power4.inOut",
      });

      gsap.to(menuOverlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.25,
        ease: "power4.inOut",
        onComplete: () => {
          isOpen = false;
          isAnimating = false;
          menuOverlay.classList.remove("active");
          gsap.set([".link a", ".social a"], { y: "120%" });
          resetPreviewImage();

          const targetPage = link.getAttribute("href");
          window.location.href = targetPage;
        },
      });
    });
  });

  const menuLinksChange = document.querySelectorAll(".link a");

  function changePage(page) {
    history.pushState(null, '', page);
    
    const newContent = `Content for ${page}`; // Fix placeholder; ganti dengan load actual jika perlu

    document.querySelector('#main').innerHTML = newContent;

    if (lenis) {
      lenis.resize();
    }
  }

  menuLinksChange.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();

      const page = this.getAttribute("href");
      changePage(page);
    });
  });
});
