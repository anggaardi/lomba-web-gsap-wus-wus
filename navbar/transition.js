let lenis;

function initializeLenis() {
  if (lenis) lenis.destroy();

  lenis = new Lenis({
    autoRaf: true,
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

function initializeAnimations() {
  gsap.from("nav a", {
    y: -20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out"
  });

  if (document.querySelector(".hero h1")) {
    const heroText = new SplitType(".hero h1", { types: "chars" });
    gsap.from(heroText.chars, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "power4.out"
    });
  }

  if (document.querySelector(".info p")) {
    const text = new SplitType(".info p", { types: "lines" });
    gsap.from(text.lines, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power4.out"
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initializeLenis();
  initializeAnimations();
});
if (navigation?.addEventListener) {
  navigation.addEventListener("navigate", (event) => {
    if (!event.destination.url.includes(document.location.origin)) return;

    const url = new URL(event.destination.url);
    let direction = "up";
    if (url.pathname.includes("about")) direction = "right";
    if (url.pathname.includes("work")) direction = "left";

    document.documentElement.setAttribute("data-direction", direction);

    event.intercept({
      scroll: "manual",
      handler: async () => {
        const response = await fetch(event.destination.url);
        const text = await response.text();

        document.startViewTransition(() => {
          const bodyMatch = text.match(/<body[^>]*>([\s\S]*)<\/body>/i);
          if (bodyMatch) document.body.innerHTML = bodyMatch[1];

          const titleMatch = text.match(/<title[^>]*>(.*?)<\/title>/i);
          if (titleMatch) document.title = titleMatch[1];
        }).ready.then(() => {
          window.scrollTo(0, 0);
        });
      },
      scroll:"manual"
    });
  });
}
