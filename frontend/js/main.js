/**
 * Discord Clone - Main App Utilities
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Detect Operating System for the download button text
  const downloadBtns = document.querySelectorAll('.hero__btn-download, .cta-banner .btn');
  const userAgent = window.navigator.userAgent.toLowerCase();

  let osName = 'Windows';
  if (userAgent.indexOf('mac') !== -1) {
    osName = 'Mac';
  } else if (userAgent.indexOf('linux') !== -1) {
    osName = 'Linux';
  }

  downloadBtns.forEach((btn) => {
    // Keep icon, just update the text node if applicable
    if (btn.textContent.includes('Windows') && osName !== 'Windows') {
      btn.innerHTML = btn.innerHTML.replace('Windows', osName);
    }
  });

  console.log('Discord clone initialized successfully.');
});
