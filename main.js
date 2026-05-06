/* ============================================
   PENN'S CABINET — Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Sticky header shadow on scroll ----
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // ---- Mobile menu toggle ----
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ---- Search overlay ----
  const searchBtn     = document.querySelector('.search-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchInput   = document.getElementById('search-input');
  const searchClose   = document.querySelector('.search-close');

  searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('open');
    setTimeout(() => searchInput.focus(), 200);
  });

  searchClose.addEventListener('click', () => {
    searchOverlay.classList.remove('open');
  });

  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) searchOverlay.classList.remove('open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') searchOverlay.classList.remove('open');
  });

  // ---- Placeholder product data ----
  // Replace this array with Shopify Buy SDK product fetch later.
  // The `filter` field maps each item to a category subpage.
  const placeholderProducts = [
    // Cards
    { title: 'Charizard Base Set Holo',        category: 'Trading Cards',     filter: 'cards',       price: 249.99,  badge: 'Hot' },
    { title: 'PSA 10 Pikachu VMAX',            category: 'Graded Cards',      filter: 'cards',       price: 189.00,  oldPrice: 225.00, badge: 'Sale' },
    { title: 'Scarlet & Violet Booster Box',   category: 'Sealed Product',    filter: 'cards',       price: 129.99 },
    { title: 'BGS 9.5 Lugia Neo Genesis',      category: 'Graded Cards',      filter: 'cards',       price: 549.00,  badge: 'Rare' },
    { title: 'Japanese Vintage Booster Pack',  category: 'Sealed Product',    filter: 'cards',       price: 79.99 },
    { title: 'Black Lotus (Unlimited)',        category: 'Trading Cards',     filter: 'cards',       price: 4200.00, badge: 'Grail' },
    { title: 'MTG Modern Horizons 3 Bundle',   category: 'Sealed Product',    filter: 'cards',       price: 49.99 },
    { title: 'Yu-Gi-Oh! Blue-Eyes White Dragon (LOB 1st)', category: 'Trading Cards', filter: 'cards', price: 320.00, badge: 'Vintage' },

    // Comics
    { title: 'Amazing Spider-Man #300',        category: 'Comics',            filter: 'comics',      price: 389.00,  badge: 'Key Issue' },
    { title: 'Uncanny X-Men #141 (CGC 7.5)',   category: 'Comics — Graded',   filter: 'comics',      price: 520.00,  badge: 'Rare' },
    { title: 'TMNT #1 (First Print)',          category: 'Comics',            filter: 'comics',      price: 1250.00, badge: 'Grail' },
    { title: 'Saga: Compendium One',           category: 'Trade Paperback',   filter: 'comics',      price: 49.99 },
    { title: 'Batman: The Killing Joke (1st Print)', category: 'Comics',      filter: 'comics',      price: 89.00 },
    { title: 'Watchmen #1 (CGC 9.4)',          category: 'Comics — Graded',   filter: 'comics',      price: 275.00,  badge: 'Key Issue' },
    { title: 'Sandman Vol. 1 — Preludes & Nocturnes', category: 'Trade Paperback', filter: 'comics', price: 24.99 },
    { title: 'Daredevil #168 (1st Elektra)',   category: 'Comics',            filter: 'comics',      price: 215.00,  badge: 'Key Issue' },

    // Figurines
    { title: 'Vintage He-Man Figure (MOC)',    category: 'Action Figures',    filter: 'figurines',   price: 145.00 },
    { title: 'Star Wars Black Series Boba Fett', category: 'Action Figures',  filter: 'figurines',   price: 34.99 },
    { title: 'Marvel Legends Retro Wave Set',  category: 'Action Figures',    filter: 'figurines',   price: 89.99,   oldPrice: 109.99, badge: 'Sale' },
    { title: 'Funko Pop! Iron Man (Glow)',     category: 'Vinyl Figures',     filter: 'figurines',   price: 18.99 },
    { title: 'Bandai S.H. Figuarts Goku',      category: 'Action Figures',    filter: 'figurines',   price: 64.99 },
    { title: 'NECA Predator (Ultimate)',       category: 'Action Figures',    filter: 'figurines',   price: 42.00 },
    { title: 'Hot Toys Iron Man Mark VII (1/6)', category: 'Premium Figures', filter: 'figurines',   price: 449.00,  badge: 'Premium' },
    { title: 'Sideshow Premium Format Hulk',   category: 'Premium Figures',   filter: 'figurines',   price: 899.00,  badge: 'Grail' },

    // Accessories
    { title: 'Premium Card Sleeves (100ct)',   category: 'Accessories',       filter: 'accessories', price: 12.99 },
    { title: 'Ultra Pro Top Loaders (25ct)',   category: 'Accessories',       filter: 'accessories', price: 8.99 },
    { title: 'Dragon Shield Binder (12-pocket)', category: 'Accessories',     filter: 'accessories', price: 34.99 },
    { title: 'Acrylic Card Display Stand',     category: 'Accessories',       filter: 'accessories', price: 14.99 },
    { title: 'Comic Bag & Board Combo (50ct)', category: 'Accessories',       filter: 'accessories', price: 22.50 },
    { title: 'Magnetic One-Touch Holder (35pt)', category: 'Accessories',     filter: 'accessories', price: 4.99 },
    { title: 'UV-Protected Slab Wall Mount',   category: 'Accessories',       filter: 'accessories', price: 27.00,   badge: 'New' },
    { title: 'Figure Display Case (8\")',       category: 'Accessories',      filter: 'accessories', price: 19.99 },
  ];

  // ---- Render product cards ----
  const productGrid = document.getElementById('product-grid');

  function renderProducts(products) {
    if (!productGrid) return;

    if (!products.length) {
      productGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          No products in this category yet — check back soon.
        </div>`;
      return;
    }

    productGrid.innerHTML = products.map((p, i) => `
      <div class="product-card fade-in" style="transition-delay: ${i * 0.08}s">
        <div class="product-img">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        </div>
        <div class="product-info">
          <h3>${p.title}</h3>
          <p class="product-meta">${p.category}</p>
          <p class="product-price">
            $${p.price.toFixed(2)}
            ${p.oldPrice ? `<span class="old-price">$${p.oldPrice.toFixed(2)}</span>` : ''}
          </p>
        </div>
        <button class="quick-add" data-product="${p.title}">
          Add to Cart
        </button>
      </div>
    `).join('');

    // Re-observe new elements for scroll animation
    observeFadeIns();
  }

  // ---- Sorting ----
  function sortProducts(list, mode) {
    const sorted = [...list];
    switch (mode) {
      case 'price-asc':  return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc': return sorted.sort((a, b) => b.price - a.price);
      case 'name':       return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:           return sorted; // 'featured'
    }
  }

  // ---- Decide which products to show ----
  // Subpages set <body data-category="cards|comics|figurines|accessories">
  const pageCategory = document.body.dataset.category;
  const visibleProducts = pageCategory
    ? placeholderProducts.filter(p => p.filter === pageCategory)
    : placeholderProducts;

  let currentSort = 'featured';
  renderProducts(sortProducts(visibleProducts, currentSort));

  // Update result count if a counter element exists on the page
  const filterCount = document.getElementById('filter-count');
  if (filterCount) filterCount.textContent = visibleProducts.length;

  // Wire up the sort dropdown if the subpage has one
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts(sortProducts(visibleProducts, currentSort));
    });
  }

  // ---- Scroll-triggered fade-in (IntersectionObserver) ----
  function observeFadeIns() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }

  // Also observe static sections
  document.querySelectorAll('.category-card, .trust-badge').forEach(el => {
    el.classList.add('fade-in');
  });
  observeFadeIns();

  // ---- Cart count (placeholder) ----
  // Increment cart badge on "Add to Cart" click — replace with Shopify logic later
  const cartCountEl = document.querySelector('.cart-count');
  let cartCount = 0;

  if (productGrid) productGrid.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.quick-add');
    if (!addBtn) return;

    cartCount++;
    cartCountEl.textContent = cartCount;
    cartCountEl.style.transform = 'scale(1.4)';
    setTimeout(() => cartCountEl.style.transform = 'scale(1)', 200);

    // Visual feedback
    addBtn.textContent = '✓ Added!';
    addBtn.style.background = 'var(--color-accent)';
    addBtn.style.color = '#fff';
    setTimeout(() => {
      addBtn.textContent = 'Add to Cart';
      addBtn.style.background = '';
      addBtn.style.color = '';
    }, 1200);
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});

/*
  ============================================
  SHOPIFY INTEGRATION NOTES
  ============================================

  To connect this storefront to Shopify, you have two main options:

  1. SHOPIFY BUY SDK (Recommended for GitHub Pages)
     ─────────────────────────────────────────────
     Add this script to your HTML:
     <script src="https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js"></script>

     Then initialize a Shopify client:

     const client = ShopifyBuy.buildClient({
       domain: 'your-store.myshopify.com',
       storefrontAccessToken: 'your-storefront-access-token',
     });

     Fetch products:
     client.product.fetchAll().then(products => {
       renderProducts(products.map(p => ({
         title: p.title,
         category: p.productType,
         price: parseFloat(p.variants[0].price.amount),
         image: p.images[0]?.src,
         shopifyId: p.id,
       })));
     });

     Add to cart:
     const checkout = await client.checkout.create();
     await client.checkout.addLineItems(checkout.id, [{
       variantId: product.variants[0].id,
       quantity: 1,
     }]);
     window.open(checkout.webUrl); // redirect to Shopify checkout

  2. SHOPIFY STOREFRONT API (GraphQL)
     ─────────────────────────────────
     For more control, use the Storefront API directly:
     POST https://your-store.myshopify.com/api/2024-01/graphql.json

     With headers:
     X-Shopify-Storefront-Access-Token: your-token

     Query products, collections, and manage a cart via GraphQL.

  Either way, replace the `placeholderProducts` array and the
  cart logic in the click handler above with real Shopify calls.
*/
