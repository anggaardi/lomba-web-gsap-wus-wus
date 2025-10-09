gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
    // Create a timeline for each section
    const sections = document.querySelectorAll(".content section");
    sections.forEach((section, index) => {
        const img = section.querySelector(".image-container img");
        if (img) {
            gsap
                .timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "center center",
                        end: "+=150%",
                        pin: true,
                        scrub: true,
                        markers: true // Uncomment for debugging
                    }
                })
                .to(img, {
                    scale: 2,
                    z: 350,
                    transformOrigin: "center center",
                    ease: "power1.inOut"
                })
                .to(section, {
                    scale: 1.1,
                    transformOrigin: "center center",
                    ease: "power1.inOut"
                }, "<");
        }
    });
});