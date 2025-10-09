import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Smooth scroll alternatif tanpa Lenis
    document.documentElement.style.scrollBehavior = 'smooth';

    initSpotlightAnimations();
    
    // Debounce resize untuk performa
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.getAll().forEach(st => st.kill());
            initSpotlightAnimations();
        }, 250);
    });

    function initSpotlightAnimations() {
        const images = document.querySelectorAll(".img");
        const coverImg = document.querySelector(".spotlight-cover-img");
        const introHeader = document.querySelector(".spotlight-intro-header h1");
        const outroHeader = document.querySelector(".spotlight-outro-header h1");

        // Split text manual
        function splitTextToWords(element) {
            const text = element.textContent;
            const words = text.split(' ');
            element.innerHTML = '';
            const wordElements = [];
            
            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.textContent = word;
                span.style.display = 'inline-block';
                span.style.whiteSpace = 'pre';
                element.appendChild(span);
                wordElements.push(span);
                
                if (index < words.length - 1) {
                    element.appendChild(document.createTextNode(' '));
                }
            });
            
            return wordElements;
        }

        const introHeaderWords = splitTextToWords(introHeader);
        const outroHeaderWords = splitTextToWords(outroHeader);

        gsap.set(introHeaderWords, { opacity: 1 });
        gsap.set(outroHeaderWords, { opacity: 0 });
        gsap.set(outroHeader, { opacity: 1 });

        const scatterDirections = [
            { x: 1.3, y: 0.7 },
            { x: -1.5, y: 1.0 },
            { x: 1.1, y: -1.3 },
            { x: -1.7, y: -0.8 },
            { x: 0.8, y: 1.5 },
            { x: -1.0, y: -1.4 },
            { x: 1.6, y: 0.3 },
            { x: -0.7, y: 1.7 },
            { x: 1.2, y: -1.6 },
            { x: -1.4, y: 0.9 },
            { x: 1.8, y: -0.5 },
            { x: -1.1, y: -1.8 },
            { x: 0.9, y: 1.8 },
            { x: -1.9, y: 0.4 },
            { x: 1.0, y: -1.9 },
            { x: -0.8, y: 1.9 },
            { x: 1.7, y: -1.0 },
            { x: -1.3, y: -1.2 },
            { x: 0.7, y: 2.0 },
            { x: 1.25, y: -0.2 }
        ];

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const isMobile = screenWidth < 1000;
        const scatterMultiplier = isMobile ? 2.5 : 0.5;

        const startPositions = Array.from(images).map(() => ({
            x: 0,
            y: 0,
            z: -1000,
            scale: 0,
        }));

        const endPositions = scatterDirections.map((dir) => ({
            x: dir.x * screenWidth * scatterMultiplier,
            y: dir.y * screenHeight * scatterMultiplier,
            z: 2000,
            scale: 1,
        }));

        // Set initial positions dengan will-change
        images.forEach((img, index) => {
            gsap.set(img, {
                ...startPositions[index],
                force3D: true,
                transformPerspective: 2000
            });
        });

        gsap.set(coverImg, {
            z: -1000,
            scale: 0,
            x: 0,
            y: 0,
            force3D: true,
            transformPerspective: 2000
        });

        // Cache calculations untuk menghindari recalculation
        let lastProgress = -1;
        const progressThreshold = 0.001; // Update hanya jika progress berubah signifikan

        ScrollTrigger.create({
            trigger: ".spotlight",
            start: "top top",
            end: `+=${window.innerHeight * 15}px`,
            pin: true,
            pinSpacing: true,
            scrub: 0.5, // Dikurangi dari 1 ke 0.5 untuk lebih smooth
            anticipatePin: 1,
            onUpdate: (self) => {
                const progress = self.progress;

                // Skip jika progress tidak berubah signifikan
                if (Math.abs(progress - lastProgress) < progressThreshold) return;
                lastProgress = progress;

                // Gunakan requestAnimationFrame untuk smooth update
                requestAnimationFrame(() => {
                    // Batch DOM updates untuk performa lebih baik
                    images.forEach((img, index) => {
                        const staggerDelay = index * 0.03;
                        const scaleMultiplier = isMobile ? 4 : 2;
                        let imagesProgress = Math.max(0, (progress - staggerDelay) * 4);
                        
                        // Clamp progress to 0-1
                        imagesProgress = Math.min(imagesProgress, 1);
                        
                        const start = startPositions[index];
                        const end = endPositions[index];

                        // Interpolate values
                        const zValue = start.z + (end.z - start.z) * imagesProgress;
                        const scaleValue = start.scale + (end.scale - start.scale) * imagesProgress * scaleMultiplier;
                        const xValue = start.x + (end.x - start.x) * imagesProgress;
                        const yValue = start.y + (end.y - start.y) * imagesProgress;

                        // Gunakan transform matrix untuk performa lebih baik
                        gsap.set(img, {
                            x: xValue,
                            y: yValue,
                            z: zValue,
                            scale: scaleValue,
                            force3D: true
                        });
                    });

                    // Cover image animation
                    const coverProgress = Math.max(0, Math.min((progress - 0.7) * 4, 1));
                    const coverZValue = -1000 + 1000 * coverProgress;
                    const coverScaleValue = Math.min(1, coverProgress * 2);

                    gsap.set(coverImg, {
                        z: coverZValue,
                        scale: coverScaleValue,
                        x: 0,
                        y: 0,
                        force3D: true
                    });

                    // Text fade animation - optimized
                    if (introHeaderWords && introHeaderWords.length > 0) {
                        if (progress >= 0.6 && progress <= 0.75) {
                            const introFadeProgress = (progress - 0.6) / 0.15;
                            const totalWords = introHeaderWords.length;

                            introHeaderWords.forEach((word, index) => {
                                const wordFadeProgress = index / totalWords;
                                const fadeRange = 0.1;
                                
                                let wordOpacity;
                                if (introFadeProgress >= wordFadeProgress + fadeRange) {
                                    wordOpacity = 0;
                                } else if (introFadeProgress <= wordFadeProgress) {
                                    wordOpacity = 1;
                                } else {
                                    wordOpacity = 1 - (introFadeProgress - wordFadeProgress) / fadeRange;
                                }
                                
                                gsap.set(word, { opacity: wordOpacity });
                            });
                        } else if (progress < 0.6) {
                            gsap.set(introHeaderWords, { opacity: 1 });
                        } else if (progress > 0.75) {
                            gsap.set(introHeaderWords, { opacity: 0 });
                        }
                    }
                });
            },
        });
    }
});