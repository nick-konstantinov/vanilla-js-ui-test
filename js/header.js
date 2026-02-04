// Hide the middle header line
const headerMiddle = document.querySelector('.header__middle');
let lastScrollY = window.scrollY;
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY + 5 && currentScroll > 50) {
        headerMiddle.classList.add('shrink');
      } else if (currentScroll < lastScrollY - 5) {
        headerMiddle.classList.remove('shrink');
      }

      lastScrollY = currentScroll;
      ticking = false;
    });

    ticking = true;
  }
});

// Burger menu
const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__menu');
const menuLinks = menu.querySelectorAll('a');

burger.addEventListener('click', (e) => {
  menu.classList.toggle('open');
  e.stopPropagation();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    menu.classList.remove('open');
  }
});

document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && !burger.contains(e.target)) {
    menu.classList.remove('open');
  }
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
  });
});