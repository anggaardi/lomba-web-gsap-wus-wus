import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "Lenis";

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const spotlightImages = document.querySelector(".spotlight-images");
    const maskContainer = document.querySelector(".mask-container"); // Fixed typo
    const maskImage = document.querySelector(".mask-img");
    const maskHeader = document.querySelector(".mask-container .header h1");

    const spotlightContainerHeight = spotlightImages.offsetHeight; // Fixed typo
    const viewportHeight = window.innerHeight;
    const initialOffset = spotlightContainerHeight * 0.05;
    const totalMovement = spotlightContainerHeight + initialOffset + viewportHeight;

    let headerSplit = null;
    if (maskHeader) {
        headerSplit = SplitText.create(maskHeader, {
            type: "words",
            wordsClass: "spotlight-wood",
        });
        gsap.set(headerSplit.words, { opacity: 0 });
    }

    ScrollTrigger.create({
        trigger: ".spotlight",
        start: "top top",
        end: `+=${window.innerHeight * 7}px`,
        pin: true,
        pinspacing: true,
        scrub: 1,
        onupdate: (self) => {
            const progress = self.progress;

            if (progress < 0.5) {
                const imagesMoveProgress = progress / 0.5;

                const startY = 5;
                const endY = -(totalMovement / spotlightContainerHeight) * 100;
                const currentY = startY + (endY - startY) * imagesMoveProgress;

                gsap.to(spotlightImages, {
                    y: `${currentY}%`,
                });
            }
            if (maskContainer && maskImage) {
                if (progress > 0.25 && progress < 0.75) {
                    const maskProgress = (progress - 0.25) / 0.5;
                    const maskSize = `${maskProgress * 450}%`;
                    const imageScale = 1.5 - maskProgress * 0.5;

                    maskContainer.style.setProperty("-webkit-mask-size", maskSize);
                    maskContainer.style.setProperty("mask-size", maskSize);

                    gsap.set(maskImage, {
                        scale: imageScale,
                    });
                } else if (progress < 0.25) {
                    maskContainer.style.setProperty("-webkit-mask-size", "0%");
                    maskContainer.style.setProperty("mask-size", "0%");
                    gsap.set(maskImage, {
                        scale: 1.5,
                    });
                } else if (progress < 0.75) {
                    maskContainer.style.setProperty("-webkit-mask-size", "450%");
                    maskContainer.style.setProperty("mask-size", "450%");
                    gsap.set(maskImage, {
                        scale: 1,
                    });
                }
            }
            if (headerSplit && headerSplit.words.length > 0) { // Fixed typo
                if (progress > 0.75 && progress < 0.95) {
                    const totalWords = headerSplit.words.length; // Fixed typo

                    headerSplit.words.forEach((word, index) => { // Fixed syntax error in forEach
                        const wordRevealProgress = index / totalWords;

                        if (progress > wordRevealProgress) { // Fixed typo (changed textProgress to progress)
                            gsap.set(word, { opacity: 1 });
                        } else {
                            gsap.set(word, { opacity: 0 });
                        }
                    });
                }
            } else if (progress < 0.75) {
                gsap.set(headerSplit.words, { opacity: 0 });
            } else if (progress > 0.95) {
                gsap.set(headerSplit.words, {
                    opacity: 1,
                });
            }
        },
    });
});
