// Main Entry Point - Import all modules and styles
import '../css/main.css';

// Import JavaScript modules
import { initCursor } from './cursor';
import { initNavigation } from './navigation';
import { initLoading } from './loading';
import { initAnimations } from './animations';
import { initScroll } from './scroll';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Portfolio Website Loaded');
  
  // Initialize all modules
  initLoading();
  initCursor();
  initNavigation();
  initAnimations();
  initScroll();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('Page hidden');
  } else {
    console.log('Page visible');
  }
});