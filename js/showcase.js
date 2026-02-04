const products = [
  {
    id: 1,
    title: "Фирменный стиль кофейни",
    category: "Брендинг",
    image: "https://placehold.co/400x300?text=1"
  },
  {
    id: 2,
    title: "Логотип IT-стартапа",
    category: "Брендинг",
    image: "https://placehold.co/400x300?text=2"
  },
  {
    id: 3,
    title: "Айдентика фестиваля",
    category: "Брендинг",
    image: "https://placehold.co/400x300?text=3"
  },
  {
    id: 4,
    title: "Ребрендинг сети пекарен",
    category: "Брендинг",
    image: "https://placehold.co/400x300?text=4"
  },

  {
    id: 5,
    title: "Лендинг мобильного приложения",
    category: "Веб-дизайн",
    image: "https://placehold.co/400x300?text=5"
  },
  {
    id: 6,
    title: "Интернет-магазин одежды",
    category: "Веб-дизайн",
    image: "https://placehold.co/400x300?text=6"
  },
  {
    id: 7,
    title: "Сайт архитектурного бюро",
    category: "Веб-дизайн",
    image: "https://placehold.co/400x300?text=7"
  },
  {
    id: 8,
    title: "Дизайн платформы онлайн-курсов",
    category: "Веб-дизайн",
    image: "https://placehold.co/400x300?text=8"
  },

  {
    id: 9,
    title: "Иллюстрации для детской книги",
    category: "Иллюстрации",
    image: "https://placehold.co/400x300?text=9"
  },
  {
    id: 10,
    title: "Персонажи для мобильной игры",
    category: "Иллюстрации",
    image: "https://placehold.co/400x300?text=10"
  },
  {
    id: 11,
    title: "Редакционные иллюстрации",
    category: "Иллюстрации",
    image: "https://placehold.co/400x300?text=11"
  }
];


const grid = document.getElementById("showcaseGrid");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");

function renderCards(items) {
  if (items.length === 0) {
    grid.innerHTML = `<div class="showcase__empty animate-fade">Ничего не найдено</div>`;
    return;
  }

  grid.innerHTML = items.map((item, index) => `
    <article class="showcase-card">
      <div class="showcase-card__inner" style="animation-delay: ${index * 0.05}s">
        <img src="${item.image}" alt="${item.title}">
        <div class="showcase-card__text">
          <h3>${item.title}</h3>
          <span class="showcase-card__tag">${item.category}</span>
        </div>
      </div>
    </article>
  `).join('');
}

function filterShowcase() {
  const search = searchInput.value.toLowerCase().trim();
  const category = categorySelect.value;

  const filtered = products.filter(item =>
    item.title.toLowerCase().includes(search) &&
    (category === "Все" || item.category === category)
  );

  renderCards(filtered);
}

function debounce(fn, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

searchInput.addEventListener("input", debounce(filterShowcase, 250));
categorySelect.addEventListener("change", filterShowcase);

renderCards(products);