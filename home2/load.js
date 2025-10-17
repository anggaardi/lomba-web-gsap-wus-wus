// Prevent all scroll events
function preventDefault(e) {
    e.preventDefault();
}

// Disable scroll dengan multiple methods
function disableScroll() {
    // Method 1: CSS overflow
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
   
    // Method 2: Event listeners untuk semua scroll events
    window.addEventListener('wheel', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });
    window.addEventListener('scroll', preventDefault, { passive: false });
   
    // Method 3: Stop Lenis jika sudah ada
    if (window.lenis) {
        window.lenis.stop();
    }
}

// Enable scroll kembali dengan improved checking
function enableScroll() {
    // Remove CSS overflow
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
   
    // Remove event listeners
    window.removeEventListener('wheel', preventDefault);
    window.removeEventListener('touchmove', preventDefault);
    window.removeEventListener('scroll', preventDefault);
   
    // Function to start Lenis
    function startLenis() {
        if (window.lenis) {
            window.lenis.start();
            console.log('✅ Lenis started successfully');
           
            // Refresh ScrollTrigger setelah loading selesai
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
                console.log('✅ ScrollTrigger refreshed');
            }
            return true;
        }
        return false;
    }
   
    // Try to start Lenis immediately
    if (!startLenis()) {
        console.log('⏳ Lenis not ready, waiting...');
       
        // Jika Lenis belum ready, tunggu dengan interval
        let attempts = 0;
        const maxAttempts = 20; // Max 2 detik (20 x 100ms)
       
        const checkLenis = setInterval(() => {
            attempts++;
           
            if (startLenis()) {
                clearInterval(checkLenis);
            } else if (attempts >= maxAttempts) {
                clearInterval(checkLenis);
                console.error('❌ Lenis not found after waiting!');
                // Fallback: ensure scroll works even without Lenis
                document.body.style.overflow = 'auto';
                document.documentElement.style.overflow = 'auto';
            }
        }, 100);
    }
}

// Disable scroll immediately
disableScroll();

window.addEventListener('load', loader);

function loader(){
    // Hitung ukuran responsif hanya untuk mobile
    let containerSize = 400; // Default desktop
   
    if(window.innerWidth <= 768) {
        containerSize = Math.min(window.innerWidth * 0.85, 350);
    }
    if(window.innerWidth <= 480) {
        containerSize = Math.min(window.innerWidth * 0.8, 280);
    }
    if(window.innerWidth <= 360) {
        containerSize = Math.min(window.innerWidth * 0.75, 240);
    }

    const TLLOAD = gsap.timeline({
        default: {
            ease: "power2"
        }
    })

    TLLOAD
    .to('.images-container', {height: containerSize, duration: 1.3, delay: 0.4})
    .to('.bloc-txt', {height: "auto", duration: 0.6}, '-=0.8')
    .to('.bloc-txt h2', {y: 0}, '-=0.6')
    .to('.f2', {y: 0, duration: 0.6})
    .to('.flip-img1', {display: "none", duration: 0})
    .to('.f2', {y: "-100%"})
    .to('.load-container', {autoAlpha: 0, duration: 0.8, delay: 0.7})
    .add(() => {
        const video = document.querySelector('video');
        if(video) video.play();
    }, '-=0.8')
    .add(() => {
        // Hide loading container
        const loadContainer = document.querySelector('.load-container');
        if (loadContainer) {
            loadContainer.style.display = "none";
        }
       
        // Enable scroll kembali
        enableScroll();
       
        console.log('🎉 Loading complete - Scroll should be enabled');
    })
}