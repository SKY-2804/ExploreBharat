// ==========================================
// ExploreBharat Wishlist
// ==========================================

const WISHLIST_KEY = 'explorebharat_wishlist';

const getWishlist = () => JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');

const setWishlist = (items) => localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));

// ==========================================
// Heart Buttons
// ==========================================

const updateHearts = () => {
  const wishlist = getWishlist();

  document.querySelectorAll('.wishlist-btn').forEach((button) => {
    const saved = wishlist.some((item) => String(item.id) === String(button.dataset.id));

    button.classList.toggle('active', saved);
    button.setAttribute('aria-pressed', saved);

    const icon = button.querySelector('svg');

    if (!icon) return;

    icon.style.fill = saved ? '#ef4444' : 'none';
    icon.style.stroke = saved ? '#ef4444' : '#374151';
  });
};
document.addEventListener('click', (event) => {
  const button = event.target.closest('.wishlist-btn');

  if (!button) return;

  event.preventDefault();

  const destination = {
    id: button.dataset.id,
    name: button.dataset.name,
    location: button.dataset.location,
    category: button.dataset.category,
    image: button.dataset.image,
  };

  const wishlist = getWishlist();

  const index = wishlist.findIndex((item) => String(item.id) === String(destination.id));

  if (index === -1) {
    wishlist.push(destination);
  } else {
    wishlist.splice(index, 1);
  }

  setWishlist(wishlist);

  updateHearts();

  renderWishlist();
});

// ==========================================
// Wishlist Page
// ==========================================

const renderWishlist = () => {
  const grid = document.querySelector('#wishlistGrid');

  if (!grid) return;

  const empty = document.querySelector('#wishlistEmpty');

  const count = document.querySelector('#wishlistCount');

  const wishlist = getWishlist();

  grid.innerHTML = '';

  if (count) {
    count.textContent = wishlist.length;
  }

  if (!wishlist.length) {
    grid.style.display = 'none';

    if (empty) {
      empty.style.display = 'block';
    }

    return;
  }

  grid.style.display = 'grid';

  if (empty) {
    empty.style.display = 'none';
  }

  wishlist.forEach((item) => {
    const card = document.createElement('article');

    card.className = 'wishlist-card';

    card.innerHTML = `

            <div class="wishlist-card-image">

                <img
                    src="../${item.image}"
                    alt="${item.name}"
                >

                <button
                    class="wishlist-remove"
                    data-id="${item.id}"
                    aria-label="Remove from wishlist"
                >
                    ♥
                </button>

            </div>

            <div class="wishlist-card-content">

                <h3>${item.name}</h3>

                <p>${item.location}</p>

                <span>${item.category}</span>

            </div>

        `;

    grid.appendChild(card);
  });
};

// ==========================================
// Remove From Wishlist Page
// ==========================================

document.addEventListener('click', (event) => {
  const button = event.target.closest('.wishlist-remove');

  if (!button) return;

  const wishlist = getWishlist();

  const updated = wishlist.filter((item) => String(item.id) !== String(button.dataset.id));

  setWishlist(updated);

  renderWishlist();

  updateHearts();
});

// ==========================================
// Start
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  updateHearts();

  renderWishlist();
});

// ==========================================
// Sync Between Pages
// ==========================================

window.addEventListener('storage', () => {
  updateHearts();

  renderWishlist();
});
