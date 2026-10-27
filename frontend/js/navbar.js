/**
 * Discord Clone - Navbar Interactivity
 */
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navClose = document.getElementById('navClose');
  const mobileDrawer = document.getElementById('mobileDrawer');

  // 1. Scroll effect for navbar
  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // 2. Mobile drawer open/close
  if (navToggle && mobileDrawer) {
    navToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  }

  if (navClose && mobileDrawer) {
    navClose.addEventListener('click', () => {
      mobileDrawer.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Close drawer if clicking outside drawer content
  document.addEventListener('click', (e) => {
    if (
      mobileDrawer &&
      mobileDrawer.classList.contains('active') &&
      !mobileDrawer.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      mobileDrawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});
