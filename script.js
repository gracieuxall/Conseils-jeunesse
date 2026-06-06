// GESTION DU MODE SOMBRE
const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeToggleBtn.textContent = 'dark_mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = 'light_mode';
    }
});

// GESTION DE LA FENÊTRE DE PUBLICATION (MODAL)
const modal = document.getElementById('post-modal');
const openModalBtn = document.getElementById('add-post-btn');
const closeModalBtn = document.getElementById('close-modal');
const articleForm = document.getElementById('article-form');
const newsContainer = document.getElementById('news-container');

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// PUBLICATION EN DIRECT D'UN ARTICLE
articleForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const source = document.getElementById('post-source').value;
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const imgUrl = document.getElementById('post-img').value || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600';

    // Création de la structure HTML de la nouvelle carte
    const newCard = document.createElement('article');
    newCard.className = 'news-card';

    newCard.innerHTML = `
        <div class="card-content">
            <span class="source">${source} • À l'instant</span>
            <h3>${title}</h3>
            <p>${content}</p>
            <a href="#" class="read-more">Lire la suite</a>
        </div>
    `;

    // Ajouter l'article tout en haut de la liste
    newsContainer.insertBefore(newCard, newsContainer.firstChild);

    // Réinitialiser et fermer le formulaire
    articleForm.reset();
    modal.style.display = 'none';
});

// RECHERCHE D'ARTICLES
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', (e) => {
    const filter = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.news-card');

    cards.forEach(card => {
        const title = card.querySelector('h2, h3').textContent.toLowerCase();
        const text = card.querySelector('p').textContent.toLowerCase();

        if (title.includes(filter) || text.includes(filter)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});
