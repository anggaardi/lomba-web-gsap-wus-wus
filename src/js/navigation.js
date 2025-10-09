// Navigation & Menu Module

export function initNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const closeMenu = document.querySelector('#close-menu');
  const menuOverlay = document.querySelector('.menu-overlay');
  const menuLinks = document.querySelectorAll('.menu-links a');
  const menuSocials = document.querySelectorAll('.menu-socials a');

  if (!menuToggle || !menuOverlay) {
    console.log('⚠️ Menu elements not found');
    return;
  }

  // Open menu
  menuToggle.addEventListener('click', () => {
    menuOverlay.classList.add('active');
    
    // Animate menu open with GSAP (if available)
    if (typeof gsap !== 'undefined') {
      gsap.to(menuOverlay, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 0.8,
        ease: 'power4.inOut'
      });

      gsap.to('.menu-content', {
        opacity: 1,
        rotate: 0,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: 0.3,
        ease: 'power3.out'
      });

      // Animate menu items
      gsap.to(menuLinks, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.5,
        ease: 'power3.out'
      });

      gsap.to(menuSocials, {
        y: 0,
        opacity: 0.7,
        duration: 0.6,
        stagger: 0.05,
        delay: 0.7,
        ease: 'power3.out'
      });
    }
  });

  // Close menu
  if (closeMenu) {
    closeMenu.addEventListener('click', closeMenuHandler);
  }

  // Close menu on link click
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenuHandler);
  });

  function closeMenuHandler() {
    if (typeof gsap !== 'undefined') {
      gsap.to('.menu-content', {
        opacity: 0.25,
        rotate: -15,
        x: -100,
        y: -100,
        scale: 1.5,
        duration: 0.4,
        ease: 'power3.in'
      });

      gsap.to(menuOverlay, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 0.6,
        delay: 0.2,
        ease: 'power4.inOut',
        onComplete: () => {
          menuOverlay.classList.remove('active');
        }
      });
    } else {
      menuOverlay.classList.remove('active');
    }
  }

  // Close menu on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
      closeMenuHandler();
    }
  });

  console.log('🧭 Navigation initialized');
}