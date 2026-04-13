/* ============================================
   THE CARD PARLOUR — Main JS
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
  // Replace this array with Shopify Buy SDK product fetch later
  const placeholderProducts = [
    {
      title: 'Charizard Base Set Holo',
      category: 'Trading Cards',
      price: 249.99,
      badge: 'Hot',
      emoji: '🔥',
    },
    {
      title: 'Amazing Spider-Man #300',
      category: 'Comics',
      price: 389.00,
      badge: 'Key Issue',
      emoji: '🕷️',
    },
    {
      title: 'Vintage He-Man Figure (MOC)',
      category: 'Action Figures',
      price: 145.00,
      emoji: '⚔️',
    },
    {
      title: 'PSA 10 Pikachu VMAX',
      category: 'Graded Cards',
      price: 189.00,
      oldPrice: 225.00,
      badge: 'Sale',
      emoji: '⚡',
    },
    {
      title: 'Scarlet & Violet Booster Box',
      category: 'Sealed Product',
      price: 129.99,
      emoji: '📦',
    },
    {
      title: 'Uncanny X-Men #141 (CGC 7.5)',
      category: 'Comics — Graded',
      price: 520.00,
      badge: 'Rare',
      emoji: '📖',
    },
    {
      title: 'Star Wars Black Series Boba Fett',
      category: 'Action Figures',
      price: 34.99,
      emoji: '🚀',
    },
    {
      title: 'BGS 9.5 Lugia Neo Genesis',
      category: 'Graded Cards',
      price: 549.00,
      badge: 'Rare',
      emoji: '🌊',
    },
    {
      title: 'Japanese Vintage Booster Pack',
      category: 'Sealed Product',
      price: 79.99,
      emoji: '🇯🇵',
    },
    {
      title: 'TMNT #1 (First Print)',
      category: 'Comics',
      price: 1250.00,
      badge: 'Grail',
      emoji: '🐢',
    },
    {
      title: 'Marvel Legends Retro Wave Set',
      category: 'Action Figures',
      price: 89.99,
      oldPrice: 109.99,
      badge: 'Sale',
      emoji: '🦸',
    },
    {
      title: 'Premium Card Sleeves (100ct)',
      category: 'Accessories',
      price: 12.99,
      emoji: '🛡️',
    },
  ];

  // ---- Render product cards ----
  const productGrid = document.getElementById('product-grid');

  function renderProducts(products) {
    productGrid.innerHTML = products.map((p, i) => `
      <div class="product-card fade-in" style="transition-delay: ${i * 0.08}s">
        <div class="product-img">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
          <span>${p.emoji}</span>
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

  renderProducts(placeholderProducts);

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

  productGrid.addEventListener('click', (e) => {
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
