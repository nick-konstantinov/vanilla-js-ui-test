// Hide/Show the middle header line
const headerMiddle = document.querySelector('.header__middle');
const middleContent = headerMiddle.querySelector('.header__middle-content');

let lastScrollY = window.scrollY;
let ticking = false;

function updateMiddleHeight() {
  headerMiddle.style.height = middleContent.offsetHeight + 'px';
}

window.addEventListener('resize', updateMiddleHeight);

updateMiddleHeight();

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScroll = window.scrollY;

      const delta = currentScroll - lastScrollY;

      if (delta > 10 && currentScroll > 50) {
        headerMiddle.classList.add('shrink');
        headerMiddle.style.height = '0';
      } else if (delta < -10) {
        headerMiddle.classList.remove('shrink');
        updateMiddleHeight();
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