document.addEventListener("DOMContentLoaded", () => {
    // Initialize Locomotive Scroll untuk .main container
    let locoScroll;
    
    function initLocomotiveScroll() {
        locoScroll = new LocomotiveScroll({
            el: document.querySelector('.main'),
            smooth: true,
            multiplier: 1,
            class: 'is-reveal'
        });
        
        // Update ScrollTrigger when Locomotive Scroll updates
        if (typeof ScrollTrigger !== 'undefined') {
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
                        height: window.innerHeight
                    };
                },
                pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
            });
            
            ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
            ScrollTrigger.refresh();
        }
    }
    
    // Initialize on load
    initLocomotiveScroll();
    
    const container = document.querySelector(".container");
    const menuToggle = document.querySelector(".menu-toggle");
    const menuOverlay = document.querySelector(".menu-overlay");
    const menuContent = document.querySelector(".menu-content");
    const menuPreviewImg = document.querySelector(".menu-preview-img");
    const menuLinks = document.querySelectorAll(".link a");
    const closeMenuBtn = document.getElementById("close-menu");
    let isOpen = false;
    let isAnimating = false;

    // Cursor
    var crsr = document.querySelector(".cursor");
    document.addEventListener("mousemove", function(dets) {
        if (crsr) {
            crsr.style.left = dets.x + 20 + "px";
            crsr.style.top = dets.y + 20 + "px";
        }
    });

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

        // Animate out current image
        gsap.to(currentImg, {
            opacity: 0,
            scale: 0.8,
            rotation: -10,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
                // Change image source
                currentImg.src = imgSrc;
                
                // Animate in new image
                gsap.to(currentImg, {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
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
                ease: "power2.out"
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

        // Disable scroll when menu opens
        if (locoScroll) {
            locoScroll.stop();
        }

        // Animate container background
        if (container) {
            gsap.to(container, {
                rotation: 10,
                x: 300,
                y: 450,
                scale: 1.5,
                duration: 1.25,
                ease: "power4.inOut"
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
                menuOverlay.classList.add('active');
            }
        });
    }

    function closeMenu() {
        if (isAnimating || !isOpen) return;
        isAnimating = true;

        // Reset container
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
                menuOverlay.classList.remove('active');
                gsap.set([".link a", ".social a"], { y: "120%" });
                resetPreviewImage();
                
                // Re-enable scroll when menu closes
                if (locoScroll) {
                    locoScroll.start();
                    locoScroll.update();
                }
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

    // Refresh locomotive scroll on window resize
    window.addEventListener('resize', () => {
        if (locoScroll && !isOpen) {
            locoScroll.update();
        }
    });

    // Refresh locomotive scroll when images load
    window.addEventListener('load', () => {
        if (locoScroll && !isOpen) {
            setTimeout(() => {
                locoScroll.update();
            }, 100);
        }
    });
    menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        if (isAnimating || !isOpen) return;  // Prevent if animation is running or menu is closed

        e.preventDefault(); // Prevent default anchor behavior

        // Apply the same animation as close
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
                menuOverlay.classList.remove('active');
                gsap.set([".link a", ".social a"], { y: "120%" });
                resetPreviewImage();

                // Trigger page navigation after animation
                const targetPage = link.getAttribute("href");
                window.location.href = targetPage;
            },
        });
    });
});

});


    function initLocomotiveScroll() {
        locoScroll = new LocomotiveScroll({
            el: document.querySelector('.main'),
            smooth: true,
            multiplier: 1,
            class: 'is-reveal'
        });

        if (typeof ScrollTrigger !== 'undefined') {
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
                        height: window.innerHeight
                    };
                },
                pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
            });

            ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
            ScrollTrigger.refresh();
        }
        
    }
    
    const menuLinks = document.querySelectorAll(".link a");

    function changePage(page) {
        history.pushState(null, '', page);
        
        // const newContent = `${page}`;  // Example content, you can load actual content dynamically

        document.querySelector('.main').innerHTML = newContent;

        // Reinitialize the scroll after content update
        initLocomotiveScroll();
    }

    menuLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();  // Prevent default link behavior

            const page = this.getAttribute("href");  // Get the target page from the href attribute
            changePage(page);  // Change the page without reload
        });
    });




