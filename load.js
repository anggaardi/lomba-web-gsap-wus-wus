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
        document.querySelector('.load-container').style.display = "none"
    })
}