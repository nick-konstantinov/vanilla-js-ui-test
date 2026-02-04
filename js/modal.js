const modalTemplates = {
  time: `
    <h2>Спецпредложение</h2>
    <p>Предлагаем скидку в 10%!</p>
  `,

  footer: `
    <h2>Давайте обсудим ваш проект</h2>
  `,

  contact: `
    <h2>Связаться</h2>
    <form id="contactForm">
      <input name="name" placeholder="Имя" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit">Отправить</button>
    </form>
  `
};

const modal = document.getElementById('modal');
const content = modal.querySelector('.modal__content');
const closeBtn = modal.querySelector('.modal__close');
const overlay = modal.querySelector('.modal__overlay');

const SESSION_KEY = 'modalState';

function getState() {
  return sessionStorage.getItem(SESSION_KEY);
}

function setState(value) {
  sessionStorage.setItem(SESSION_KEY, value);
}

function openModal(type) {
  const state = getState();

  if (state && state !== 'contact' && type !== 'contact') return;

  content.innerHTML = modalTemplates[type];
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  if (type !== 'contact') setState(type);

  attachFormHandler();
}

function closeModal() {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Time trigger
let timeTrigger = setTimeout(() => {
  if (!getState()) {
    openModal('time');
  }
}, 40000);

// Footer trigger
const footer = document.querySelector('#footer');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    if (!getState()) {
      clearTimeout(timeTrigger);
      openModal('footer');
    }
  });
}, { threshold: 0.3 });

if (footer) observer.observe(footer);

// Contact button trigger
document
  .getElementById('contactBtn')
  .addEventListener('click', () => {
    openModal('contact');
  });


function attachFormHandler() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    content.innerHTML = `
      <h2>Спасибо!</h2>
      <p>Мы скоро свяжемся с вами.</p>
    `;
  });
}
