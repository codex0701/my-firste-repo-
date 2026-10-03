/**
 * Vegetable Market - Main Application Controller
 * Academic Demonstration Project (2026)
 * Handles Catalog Filtering, Cart, Checkout, Order Tracking, Chart & Comparisons
 */

(function () {
  'use strict';

  // --- STATE ---
  const state = {
    cart: JSON.parse(localStorage.getItem('vm_cart')) || [],
    orders: JSON.parse(localStorage.getItem('vm_orders')) || [
      {
        id: "VM-2026-001",
        date: "2026-09-26 10:15 AM",
        customerName: "Rahul Sharma",
        phone: "9876543210",
        address: "Flat 402, Green Glen Layout, Bellandur",
        slot: "Morning (8:00 AM - 10:00 AM)",
        paymentMethod: "UPI — Demo",
        items: [
          { name: "Tomato (Tamatar)", price: 40, unit: "/kg", qty: 2, subtotal: 80 },
          { name: "Potato (Aloo)", price: 30, unit: "/kg", qty: 2, subtotal: 60 }
        ],
        subtotal: 140,
        deliveryFee: 30,
        total: 170,
        statusStep: 3 // Out for Delivery
      }
    ],
    currentOrder: null,
    searchQuery: '',
    category: 'all',
    priceFilter: 150,
    availabilityFilter: 'all',
    sellerFilter: 'all',
    sortBy: 'default',
    chartMetric: 'current', // 'current', 'previous', 'change'
    selectedComparisonVegId: 'veg-01',
    autoTrackTimer: null
  };

  // --- DOM REFERENCES ---
  const DOM = {
    productsGrid: document.getElementById('products-grid'),
    productCountText: document.getElementById('product-count-text'),
    searchInput: document.getElementById('search-input'),
    searchClearBtn: document.getElementById('search-clear-btn'),
    categoryChips: document.getElementById('category-chips'),
    priceRangeInput: document.getElementById('price-range-input'),
    priceRangeValue: document.getElementById('price-range-value'),
    availabilityFilter: document.getElementById('availability-filter'),
    sellerFilter: document.getElementById('seller-filter'),
    sortSelect: document.getElementById('sort-select'),
    resetFiltersBtn: document.getElementById('reset-filters-btn'),

    // Cart Elements
    cartBtn: document.getElementById('cart-btn'),
    cartBadge: document.getElementById('cart-badge'),
    cartDrawerOverlay: document.getElementById('cart-drawer-overlay'),
    closeCartBtn: document.getElementById('close-cart-btn'),
    cartItemsContainer: document.getElementById('cart-items-container'),
    cartSubtotal: document.getElementById('cart-subtotal'),
    cartDeliveryFee: document.getElementById('cart-delivery-fee'),
    cartTotal: document.getElementById('cart-total'),
    cartFreeDeliveryPrompt: document.getElementById('cart-free-delivery-prompt'),
    checkoutBtn: document.getElementById('checkout-btn'),
    continueShoppingBtn: document.getElementById('continue-shopping-btn'),

    // Checkout Modal
    checkoutModalOverlay: document.getElementById('checkout-modal-overlay'),
    closeCheckoutBtn: document.getElementById('close-checkout-btn'),
    checkoutForm: document.getElementById('checkout-form'),
    checkoutSummaryItems: document.getElementById('checkout-summary-items'),
    checkoutModalTotal: document.getElementById('checkout-modal-total'),

    // Tracking Modal
    trackingModalOverlay: document.getElementById('tracking-modal-overlay'),
    closeTrackingBtn: document.getElementById('close-tracking-btn'),
    trackingOrderId: document.getElementById('tracking-order-id'),
    trackingStatusBadge: document.getElementById('tracking-status-badge'),
    trackingItemsList: document.getElementById('tracking-items-list'),
    trackingTotal: document.getElementById('tracking-total'),
    trackingAddress: document.getElementById('tracking-address'),
    trackingEstTime: document.getElementById('tracking-est-time'),
    advanceTrackingBtn: document.getElementById('advance-tracking-btn'),
    stepperLine: document.getElementById('stepper-progress-line'),
    stepNodes: document.querySelectorAll('.step-node'),

    // Price Comparison
    comparisonVegSelect: document.getElementById('comparison-veg-select'),
    comparisonTableBody: document.getElementById('comparison-table-body'),

    // Dashboard & Chart
    dashTotalVeg: document.getElementById('dash-total-veg'),
    dashInStock: document.getElementById('dash-in-stock'),
    dashOrdersToday: document.getElementById('dash-orders-today'),
    dashAvgBasket: document.getElementById('dash-avg-basket'),
    chartSvg: document.getElementById('chart-svg'),
    chartToggles: document.querySelectorAll('.chart-toggle-btn'),

    // Feedback
    feedbackForm: document.getElementById('feedback-form'),
    feedbackSuccess: document.getElementById('feedback-success'),

    // Navigation & Mobile
    navLinks: document.querySelectorAll('.nav-links a'),
    mobileNavToggle: document.getElementById('mobile-nav-toggle'),
    mobileNavDrawer: document.getElementById('mobile-nav-drawer'),
    mobileNavLinks: document.querySelectorAll('.mobile-nav-drawer a'),

    // Toast Container
    toastContainer: document.getElementById('toast-container')
  };

  // --- INITIALIZATION ---
  function init() {
    if (!localStorage.getItem('vm_orders')) {
      localStorage.setItem('vm_orders', JSON.stringify(state.orders));
    }
    renderCategoryChips();
    populateSellerDropdown();
    populateComparisonSelect();
    renderProducts();
    updateCartUI();
    updateDashboardStats();
    renderComparisonTable(state.selectedComparisonVegId);
    renderPriceChart(state.chartMetric);
    setupEventListeners();
    setupScrollSpy();
  }

  // --- SCROLL SPY FOR NAVIGATION HIGHLIGHT ---
  function setupScrollSpy() {
    const sections = document.querySelectorAll('header[id], section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollY = window.pageYOffset;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      if (currentSectionId) {
        navAnchors.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === `#${currentSectionId}`) {
            a.classList.add('active');
          }
        });
      }
    }, { passive: true });
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    // Search
    DOM.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      DOM.searchClearBtn.classList.toggle('visible', state.searchQuery.length > 0);
      renderProducts();
    });

    DOM.searchClearBtn.addEventListener('click', () => {
      DOM.searchInput.value = '';
      state.searchQuery = '';
      DOM.searchClearBtn.classList.remove('visible');
      DOM.searchInput.focus();
      renderProducts();
    });

    // Price Range Filter
    if (DOM.priceRangeInput) {
      DOM.priceRangeInput.addEventListener('input', (e) => {
        state.priceFilter = Number(e.target.value);
        if (DOM.priceRangeValue) {
          DOM.priceRangeValue.textContent = `₹${state.priceFilter}`;
        }
        renderProducts();
      });
    }

    // Availability Filter
    if (DOM.availabilityFilter) {
      DOM.availabilityFilter.addEventListener('change', (e) => {
        state.availabilityFilter = e.target.value;
        renderProducts();
      });
    }

    // Seller Filter
    if (DOM.sellerFilter) {
      DOM.sellerFilter.addEventListener('change', (e) => {
        state.sellerFilter = e.target.value;
        renderProducts();
      });
    }

    // Sort Selection
    if (DOM.sortSelect) {
      DOM.sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderProducts();
      });
    }

    // Reset Filters
    if (DOM.resetFiltersBtn) {
      DOM.resetFiltersBtn.addEventListener('click', resetAllFilters);
    }

    // Cart Drawer Toggle
    DOM.cartBtn.addEventListener('click', openCartDrawer);
    DOM.closeCartBtn.addEventListener('click', closeCartDrawer);
    DOM.continueShoppingBtn.addEventListener('click', closeCartDrawer);
    DOM.cartDrawerOverlay.addEventListener('click', (e) => {
      if (e.target === DOM.cartDrawerOverlay) closeCartDrawer();
    });

    // Checkout Modal
    DOM.checkoutBtn.addEventListener('click', openCheckoutModal);
    DOM.closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
    DOM.checkoutModalOverlay.addEventListener('click', (e) => {
      if (e.target === DOM.checkoutModalOverlay) closeCheckoutModal();
    });
    DOM.checkoutForm.addEventListener('submit', handleCheckoutSubmit);

    // Payment Radio Selector visuals
    const paymentCards = document.querySelectorAll('.payment-radio-card');
    paymentCards.forEach(card => {
      card.addEventListener('click', () => {
        paymentCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const radio = card.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
      });
    });

    // Tracking Modal
    DOM.closeTrackingBtn.addEventListener('click', closeTrackingModal);
    DOM.trackingModalOverlay.addEventListener('click', (e) => {
      if (e.target === DOM.trackingModalOverlay) closeTrackingModal();
    });
    DOM.advanceTrackingBtn.addEventListener('click', advanceOrderStatus);

    // Comparison Selector
    DOM.comparisonVegSelect.addEventListener('change', (e) => {
      state.selectedComparisonVegId = e.target.value;
      renderComparisonTable(state.selectedComparisonVegId);
    });

    // Chart Toggles
    DOM.chartToggles.forEach(btn => {
      btn.addEventListener('click', () => {
        DOM.chartToggles.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.chartMetric = btn.dataset.metric;
        renderPriceChart(state.chartMetric);
      });
    });

    // Feedback Form
    DOM.feedbackForm.addEventListener('submit', handleFeedbackSubmit);

    // Mobile Navigation
    DOM.mobileNavToggle.addEventListener('click', () => {
      DOM.mobileNavDrawer.classList.toggle('open');
      const isExpanded = DOM.mobileNavDrawer.classList.contains('open');
      DOM.mobileNavToggle.setAttribute('aria-expanded', isExpanded);
    });

    DOM.mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        DOM.mobileNavDrawer.classList.remove('open');
        DOM.mobileNavToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Keyboard support: Escape closes overlays
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCartDrawer();
        closeCheckoutModal();
        closeTrackingModal();
        DOM.mobileNavDrawer.classList.remove('open');
      }
    });

    // Window resize for SVG Chart redraw
    window.addEventListener('resize', () => {
      renderPriceChart(state.chartMetric);
    });
  }

  // --- CATEGORIES & SELLERS POPULATION ---
  function renderCategoryChips() {
    DOM.categoryChips.innerHTML = CATEGORIES.map(cat => `
      <button type="button" class="category-chip ${cat.id === state.category ? 'active' : ''}" data-cat="${cat.id}">
        <span>${cat.icon}</span>
        <span>${cat.label}</span>
      </button>
    `).join('');

    DOM.categoryChips.querySelectorAll('.category-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        state.category = btn.dataset.cat;
        DOM.categoryChips.querySelectorAll('.category-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts();
      });
    });
  }

  function populateSellerDropdown() {
    const sellers = Array.from(new Set(VEGETABLES_DATA.map(v => v.seller)));
    DOM.sellerFilter.innerHTML = `<option value="all">All Local Sellers</option>` +
      sellers.map(s => `<option value="${s}">${s}</option>`).join('');
  }

  function populateComparisonSelect() {
    const comparisonVegs = Object.keys(PRICE_COMPARISONS);
    DOM.comparisonVegSelect.innerHTML = comparisonVegs.map(id => {
      const item = VEGETABLES_DATA.find(v => v.id === id);
      return `<option value="${id}">${item ? item.name : id}</option>`;
    }).join('');
  }

  // --- FILTER & SORT LOGIC ---
  function getFilteredProducts() {
    return VEGETABLES_DATA.filter(item => {
      // Search Match
      const matchesSearch = !state.searchQuery ||
        item.name.toLowerCase().includes(state.searchQuery) ||
        item.description.toLowerCase().includes(state.searchQuery) ||
        item.seller.toLowerCase().includes(state.searchQuery);

      // Category Match
      const matchesCategory = state.category === 'all' || item.category === state.category;

      // Price Match
      const matchesPrice = item.price <= state.priceFilter;

      // Availability Match
      let matchesAvail = true;
      if (state.availabilityFilter === 'in-stock') {
        matchesAvail = item.stock > 0;
      } else if (state.availabilityFilter === 'limited') {
        matchesAvail = item.status === 'limited';
      }

      // Seller Match
      const matchesSeller = state.sellerFilter === 'all' || item.seller === state.sellerFilter;

      return matchesSearch && matchesCategory && matchesPrice && matchesAvail && matchesSeller;
    }).sort((a, b) => {
      switch (state.sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'name-az': return a.name.localeCompare(b.name);
        case 'availability': return b.stock - a.stock;
        default: return 0;
      }
    });
  }

  function resetAllFilters() {
    state.searchQuery = '';
    state.category = 'all';
    state.priceFilter = 150;
    state.availabilityFilter = 'all';
    state.sellerFilter = 'all';
    state.sortBy = 'default';

    DOM.searchInput.value = '';
    DOM.searchClearBtn.classList.remove('visible');
    if (DOM.priceRangeInput) {
      DOM.priceRangeInput.value = 150;
      DOM.priceRangeValue.textContent = '₹150';
    }
    if (DOM.availabilityFilter) DOM.availabilityFilter.value = 'all';
    if (DOM.sellerFilter) DOM.sellerFilter.value = 'all';
    if (DOM.sortSelect) DOM.sortSelect.value = 'default';

    renderCategoryChips();
    renderProducts();
    showToast('Filters reset to default', 'info');
  }

  // --- PRODUCT CARDS RENDERING ---
  function renderProducts() {
    const products = getFilteredProducts();
    DOM.productCountText.textContent = `Showing ${products.length} of ${VEGETABLES_DATA.length} vegetables`;

    if (products.length === 0) {
      DOM.productsGrid.innerHTML = `
        <div class="empty-results-box">
          <div class="empty-icon">🥬</div>
          <h3>No Vegetables Found</h3>
          <p>We couldn't find any vegetable matching your current search or filters. Try adjusting your criteria or reset filters.</p>
          <button type="button" class="btn btn-primary btn-sm" id="empty-reset-btn">Reset All Filters</button>
        </div>
      `;
      const emptyResetBtn = document.getElementById('empty-reset-btn');
      if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetAllFilters);
      return;
    }

    DOM.productsGrid.innerHTML = products.map(item => {
      const cartItem = state.cart.find(c => c.id === item.id);
      const inCartQty = cartItem ? cartItem.qty : 0;
      const isOutOfStock = item.stock === 0;

      // Status Badge Config
      let badgeClass = 'badge-fresh';
      let badgeText = item.availability;
      let stockNote = `<span class="stock-note-available">● In Stock (${item.stock} kg available)</span>`;

      if (item.status === 'limited') {
        badgeClass = 'badge-limited';
        badgeText = 'Limited stock';
        stockNote = `<span class="stock-note-limited">● Only ${item.stock} kg left today!</span>`;
      } else if (item.status === 'out-of-stock') {
        badgeClass = 'badge-out';
        badgeText = 'Out of Stock';
        stockNote = `<span class="stock-note-out">● Arriving back tomorrow morning</span>`;
      }

      // Action control: Qty selector if already in cart, else Add button
      let actionControl = '';
      if (isOutOfStock) {
        actionControl = `<button type="button" class="btn btn-secondary btn-block btn-sm" disabled>Out of Stock</button>`;
      } else if (inCartQty > 0) {
        actionControl = `
          <div class="qty-controller">
            <button type="button" class="qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity for ${item.name}">−</button>
            <span class="qty-count-text">${inCartQty} ${item.unit.replace('/', '')}</span>
            <button type="button" class="qty-btn" data-action="increase" data-id="${item.id}" aria-label="Increase quantity for ${item.name}">+</button>
          </div>
        `;
      } else {
        actionControl = `
          <button type="button" class="btn btn-primary btn-block btn-sm add-to-cart-btn" data-id="${item.id}">
            <span>🛒 Add to Cart</span>
          </button>
        `;
      }

      return `
        <article class="product-card ${isOutOfStock ? 'out-of-stock' : ''}" data-id="${item.id}">
          <div class="product-image-container">
            <img 
              src="${item.image}" 
              alt="${item.name}" 
              class="product-card-img" 
              loading="lazy" 
              onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'product-img-fallback\\'>${item.icon}</div>';"
            />
            <span class="product-badge-status ${badgeClass}">${badgeText}</span>
            <span class="product-category-tag">${getCategoryLabel(item.category)}</span>
          </div>
          <div class="product-card-body">
            <div class="product-title-row">
              <h3 class="product-name">${item.name}</h3>
            </div>
            <div class="product-seller">
              <span>🏡 Seller:</span>
              <strong>${item.seller}</strong>
            </div>
            <p class="product-desc">${item.description}</p>
            <div class="product-price-row">
              <span class="product-price">₹${item.price}</span>
              <span class="product-unit">${item.unit}</span>
              ${item.prevPrice > item.price ? `<span class="product-prev-price">₹${item.prevPrice}</span>` : ''}
            </div>
            <div class="product-stock-note">${stockNote}</div>
            <div class="product-card-actions">
              ${actionControl}
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach dynamic click listeners
    DOM.productsGrid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        addToCart(id);
      });
    });

    DOM.productsGrid.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const action = e.currentTarget.dataset.action;
        if (action === 'increase') {
          updateCartItemQty(id, 1);
        } else {
          updateCartItemQty(id, -1);
        }
      });
    });
  }

  function getCategoryLabel(catId) {
    const found = CATEGORIES.find(c => c.id === catId);
    return found ? found.label.replace(/^[^\s]+\s/, '') : catId;
  }

  // --- CART MANAGEMENT ---
  function addToCart(vegId) {
    const veg = VEGETABLES_DATA.find(v => v.id === vegId);
    if (!veg || veg.stock === 0) return;

    const existingIndex = state.cart.findIndex(c => c.id === vegId);
    if (existingIndex > -1) {
      if (state.cart[existingIndex].qty >= veg.stock) {
        showToast(`Cannot add more. Max stock limit reached for ${veg.name}!`, 'info');
        return;
      }
      state.cart[existingIndex].qty += 1;
    } else {
      state.cart.push({
        id: veg.id,
        name: veg.name,
        price: veg.price,
        unit: veg.unit,
        seller: veg.seller,
        image: veg.image,
        icon: veg.icon,
        stock: veg.stock,
        qty: 1
      });
    }

    saveCart();
    updateCartUI();
    renderProducts(); // Update the card button to qty counter
    showToast(`${veg.name} added to cart!`, 'success');

    // Subtle bounce badge
    DOM.cartBadge.classList.add('bump');
    setTimeout(() => DOM.cartBadge.classList.remove('bump'), 300);
  }

  function updateCartItemQty(vegId, delta) {
    const itemIndex = state.cart.findIndex(c => c.id === vegId);
    if (itemIndex === -1) return;

    const item = state.cart[itemIndex];
    const newQty = item.qty + delta;

    if (newQty <= 0) {
      state.cart.splice(itemIndex, 1);
      showToast(`${item.name} removed from cart`, 'info');
    } else if (newQty > item.stock) {
      showToast(`Only ${item.stock} available in stock for ${item.name}!`, 'info');
      return;
    } else {
      item.qty = newQty;
    }

    saveCart();
    updateCartUI();
    renderProducts();
  }

  function removeCartItem(vegId) {
    const item = state.cart.find(c => c.id === vegId);
    if (item) {
      state.cart = state.cart.filter(c => c.id !== vegId);
      saveCart();
      updateCartUI();
      renderProducts();
      showToast(`${item.name} removed`, 'info');
    }
  }

  function saveCart() {
    localStorage.setItem('vm_cart', JSON.stringify(state.cart));
  }

  function updateCartUI() {
    // Total count of distinct or total items
    const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
    DOM.cartBadge.textContent = totalCount;

    if (state.cart.length === 0) {
      DOM.cartItemsContainer.innerHTML = `
        <div class="cart-empty-view">
          <div style="font-size: 3rem;">🧺</div>
          <p><strong>Your vegetable cart is empty.</strong><br>Explore our fresh morning arrivals and add healthy greens!</p>
          <button type="button" class="btn btn-outline btn-sm" id="empty-cart-shop-btn">Browse Vegetables</button>
        </div>
      `;
      const browseBtn = document.getElementById('empty-cart-shop-btn');
      if (browseBtn) {
        browseBtn.addEventListener('click', () => {
          closeCartDrawer();
          const target = document.getElementById('vegetables');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
      }

      DOM.cartSubtotal.textContent = '₹0';
      DOM.cartDeliveryFee.textContent = '₹0';
      DOM.cartTotal.textContent = '₹0';
      DOM.checkoutBtn.disabled = true;
      if (DOM.cartFreeDeliveryPrompt) {
        DOM.cartFreeDeliveryPrompt.innerHTML = 'Add items worth ₹200 for <strong>FREE Delivery</strong>!';
      }
      return;
    }

    // Populate list
    DOM.cartItemsContainer.innerHTML = state.cart.map(item => {
      const itemSubtotal = item.price * item.qty;
      return `
        <div class="cart-item" data-id="${item.id}">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            class="cart-item-img"
            onerror="this.onerror=null; this.parentElement.querySelector('.cart-item-img').style.display='none';"
          />
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-seller">Seller: ${item.seller}</div>
            <div class="cart-item-price-unit">₹${item.price} ${item.unit}</div>
            <div class="cart-item-controls">
              <button type="button" class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Decrease quantity">−</button>
              <span class="cart-item-qty">${item.qty}</span>
              <button type="button" class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="Increase quantity">+</button>
              <button type="button" class="cart-item-remove" data-id="${item.id}">Remove</button>
            </div>
          </div>
          <div class="cart-item-subtotal">₹${itemSubtotal}</div>
        </div>
      `;
    }).join('');

    // Attach listeners in drawer
    DOM.cartItemsContainer.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const action = e.currentTarget.dataset.action;
        updateCartItemQty(id, action === 'inc' ? 1 : -1);
      });
    });

    DOM.cartItemsContainer.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        removeCartItem(e.currentTarget.dataset.id);
      });
    });

    // Totals
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const freeDeliveryThreshold = 200;
    const deliveryFee = subtotal >= freeDeliveryThreshold ? 0 : 30;
    const total = subtotal + deliveryFee;

    DOM.cartSubtotal.textContent = `₹${subtotal}`;
    DOM.cartDeliveryFee.innerHTML = deliveryFee === 0 
      ? `<span class="cart-delivery-badge">FREE</span>` 
      : `₹${deliveryFee}`;
    DOM.cartTotal.textContent = `₹${total}`;
    DOM.checkoutBtn.disabled = false;

    // Delivery threshold prompt
    if (DOM.cartFreeDeliveryPrompt) {
      if (subtotal >= freeDeliveryThreshold) {
        DOM.cartFreeDeliveryPrompt.innerHTML = `<span style="color: var(--accent-green); font-weight: 600;">🎉 You qualified for FREE Delivery!</span>`;
      } else {
        const diff = freeDeliveryThreshold - subtotal;
        DOM.cartFreeDeliveryPrompt.innerHTML = `Add ₹${diff} more for <strong style="color: var(--primary);">FREE Delivery</strong>`;
      }
    }
  }

  function openCartDrawer() {
    DOM.cartDrawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    DOM.cartDrawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // --- CHECKOUT & ORDER SUBMISSION ---
  function openCheckoutModal() {
    if (state.cart.length === 0) return;
    closeCartDrawer();

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const deliveryFee = subtotal >= 200 ? 0 : 30;
    const total = subtotal + deliveryFee;

    DOM.checkoutSummaryItems.innerHTML = state.cart.map(i => `
      <div style="display:flex; justify-content:space-between; margin-bottom: 0.35rem; font-size: 0.85rem;">
        <span>${i.name} (x${i.qty})</span>
        <strong>₹${i.price * i.qty}</strong>
      </div>
    `).join('') + `
      <div style="display:flex; justify-content:space-between; margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px dashed var(--border-light); font-size: 0.85rem;">
        <span>Subtotal:</span>
        <span>₹${subtotal}</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size: 0.85rem; color: var(--text-muted);">
        <span>Delivery Fee:</span>
        <span>${deliveryFee === 0 ? 'FREE' : '₹' + deliveryFee}</span>
      </div>
    `;

    DOM.checkoutModalTotal.textContent = `₹${total}`;
    DOM.checkoutModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCheckoutModal() {
    DOM.checkoutModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function handleCheckoutSubmit(e) {
    e.preventDefault();

    const formData = new FormData(DOM.checkoutForm);
    const name = formData.get('customerName').trim();
    const phone = formData.get('customerPhone').trim();
    const address = formData.get('deliveryAddress').trim();
    const slot = formData.get('deliverySlot');
    const payment = formData.get('paymentMethod');

    // Simple validation
    if (!name || !phone || !address) {
      showToast('Please fill all mandatory delivery details', 'info');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      showToast('Please enter a valid 10-digit mobile number', 'info');
      return;
    }

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const deliveryFee = subtotal >= 200 ? 0 : 30;
    const total = subtotal + deliveryFee;

    const orderNumber = state.orders.length + 1;
    const newOrder = {
      id: `VM-2026-${String(orderNumber).padStart(3, '0')}`,
      date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      customerName: name,
      phone: phone,
      address: address,
      slot: slot,
      paymentMethod: payment,
      items: state.cart.map(i => ({
        name: i.name,
        price: i.price,
        unit: i.unit,
        qty: i.qty,
        subtotal: i.price * i.qty
      })),
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      total: total,
      statusStep: 1 // 1: Confirmed, 2: Preparing, 3: Out for Delivery, 4: Delivered
    };

    // Save
    state.orders.unshift(newOrder);
    localStorage.setItem('vm_orders', JSON.stringify(state.orders));
    state.currentOrder = newOrder;

    // Reset Cart
    state.cart = [];
    saveCart();
    updateCartUI();
    renderProducts();

    // Update Dashboard metrics
    updateDashboardStats();

    // Close checkout and open tracking
    closeCheckoutModal();
    DOM.checkoutForm.reset();
    openTrackingModal(newOrder);
    showToast('🎉 Demo order placed successfully!', 'success');
  }

  // --- ORDER TRACKING ---
  function openTrackingModal(order) {
    state.currentOrder = order || state.orders[0];
    if (!state.currentOrder) return;

    renderOrderTrackingUI();
    DOM.trackingModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeTrackingModal() {
    DOM.trackingModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (state.autoTrackTimer) {
      clearInterval(state.autoTrackTimer);
      state.autoTrackTimer = null;
    }
  }

  function renderOrderTrackingUI() {
    const order = state.currentOrder;
    if (!order) return;

    DOM.trackingOrderId.textContent = order.id;
    DOM.trackingAddress.textContent = `${order.address} • Contact: ${order.phone}`;
    DOM.trackingTotal.textContent = `₹${order.total}`;
    DOM.trackingEstTime.textContent = order.slot || '30–60 minutes';

    // Status steps logic
    const step = order.statusStep || 1;
    const progressPercent = ((step - 1) / 3) * 100;
    DOM.stepperLine.style.width = `calc(${progressPercent}% * 0.85)`;

    const stepStatuses = [
      "Order Confirmed ✓",
      "Preparing Fresh Vegetables 🥬",
      "Out for Delivery 🛵",
      "Delivered to Doorstep 🎉"
    ];

    DOM.trackingStatusBadge.textContent = stepStatuses[step - 1];

    DOM.stepNodes.forEach((node, idx) => {
      const nodeStep = idx + 1;
      node.classList.remove('active', 'completed');
      if (nodeStep < step) {
        node.classList.add('completed');
      } else if (nodeStep === step) {
        node.classList.add('active');
      }
    });

    // Items list
    DOM.trackingItemsList.innerHTML = order.items.map(item => `
      <div style="display:flex; justify-content:space-between; margin-bottom: 0.3rem;">
        <span>${item.name} (${item.qty} ${item.unit || ''})</span>
        <strong>₹${item.subtotal}</strong>
      </div>
    `).join('');

    // Advance button text
    if (step >= 4) {
      DOM.advanceTrackingBtn.textContent = 'Order Completed (Reset to Stage 1)';
    } else {
      DOM.advanceTrackingBtn.textContent = `Simulate Next Stage (${stepStatuses[step]})`;
    }
  }

  function advanceOrderStatus() {
    if (!state.currentOrder) return;

    if (state.currentOrder.statusStep >= 4) {
      state.currentOrder.statusStep = 1;
    } else {
      state.currentOrder.statusStep += 1;
    }

    // Persist
    localStorage.setItem('vm_orders', JSON.stringify(state.orders));
    renderOrderTrackingUI();
    showToast(`Order status updated to Stage ${state.currentOrder.statusStep}`, 'info');
  }

  // --- PRICE COMPARISON SECTION ---
  function renderComparisonTable(vegId) {
    const comparisonData = PRICE_COMPARISONS[vegId];
    if (!comparisonData) {
      DOM.comparisonTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 2rem;">No comparison data available for this vegetable.</td></tr>`;
      return;
    }

    const sortedSellers = [...comparisonData.sellers].sort((a, b) => a.price - b.price);
    const minPrice = sortedSellers[0].price;

    DOM.comparisonTableBody.innerHTML = sortedSellers.map(s => {
      const isLowest = s.price === minPrice;
      return `
        <tr class="${isLowest ? 'highlight-best' : ''}">
          <td>
            <strong>${s.seller}</strong>
            ${isLowest ? '<span class="best-value-badge">Lowest Price ★</span>' : ''}
          </td>
          <td>${s.location}</td>
          <td>${s.freshness}</td>
          <td>
            <strong style="font-size: 1.05rem; color: var(--primary-dark);">₹${s.price}</strong> 
            <span style="font-size: 0.8rem; color: var(--text-subtle);">${comparisonData.unit}</span>
          </td>
          <td>
            <button type="button" class="btn btn-outline btn-sm quick-compare-add" data-id="${vegId}" data-seller="${s.seller}" data-price="${s.price}">
              Add to Cart
            </button>
          </td>
        </tr>
      `;
    }).join('');

    DOM.comparisonTableBody.querySelectorAll('.quick-compare-add').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        addToCart(id);
      });
    });
  }

  // --- MARKET DASHBOARD & INTERACTIVE SVG CHART ---
  function updateDashboardStats() {
    const inStockCount = VEGETABLES_DATA.filter(v => v.stock > 0).length;
    const totalOrders = state.orders.length;
    
    // Calculate dynamic average basket value
    let avgBasket = 285;
    if (state.orders.length > 0) {
      const sum = state.orders.reduce((acc, o) => acc + o.total, 0);
      avgBasket = Math.round(sum / state.orders.length);
    }

    if (DOM.dashTotalVeg) DOM.dashTotalVeg.textContent = VEGETABLES_DATA.length;
    if (DOM.dashInStock) DOM.dashInStock.textContent = inStockCount;
    if (DOM.dashOrdersToday) DOM.dashOrdersToday.textContent = 32 + (totalOrders - 1);
    if (DOM.dashAvgBasket) DOM.dashAvgBasket.textContent = `₹${avgBasket}`;
  }

  function renderPriceChart(metric) {
    if (!DOM.chartSvg) return;

    // Vegetables featured in chart
    const featuredKeys = ['veg-01', 'veg-02', 'veg-03', 'veg-04', 'veg-06', 'veg-08'];
    const items = featuredKeys.map(k => VEGETABLES_DATA.find(v => v.id === k)).filter(Boolean);

    // Chart dimensions
    const width = 560;
    const height = 220;
    const padding = { top: 25, right: 30, bottom: 45, left: 45 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    let svgContent = '';

    if (metric === 'change') {
      // Show percentage drop or rise
      const maxChange = 25;
      const zeroY = padding.top + chartH / 2;

      // Zero axis line
      svgContent += `<line x1="${padding.left}" y1="${zeroY}" x2="${width - padding.right}" y2="${zeroY}" stroke="#9ca3af" stroke-dasharray="3,3" stroke-width="1.5" />`;
      svgContent += `<text x="${padding.left - 8}" y="${zeroY + 4}" fill="#6b7280" font-size="10" text-anchor="end">0%</text>`;

      const barWidth = chartW / items.length - 20;

      items.forEach((item, idx) => {
        const changePct = Math.round(((item.price - item.prevPrice) / item.prevPrice) * 100);
        const barHeight = Math.abs(changePct) * (chartH / (maxChange * 2));
        const x = padding.left + (idx * (chartW / items.length)) + 10;
        const y = changePct <= 0 ? zeroY : zeroY - barHeight;
        const barColor = changePct <= 0 ? '#15803d' : '#dc2626'; // Green if cheaper, Red if costlier

        svgContent += `
          <rect x="${x}" y="${y}" width="${barWidth}" height="${Math.max(barHeight, 3)}" fill="${barColor}" rx="3">
            <title>${item.name}: ${changePct > 0 ? '+' : ''}${changePct}% vs last week</title>
          </rect>
          <text x="${x + barWidth / 2}" y="${changePct <= 0 ? y + barHeight + 14 : y - 4}" fill="${barColor}" font-size="11" font-weight="700" text-anchor="middle">
            ${changePct > 0 ? '+' : ''}${changePct}%
          </text>
          <text x="${x + barWidth / 2}" y="${height - 12}" fill="#374151" font-size="11" font-weight="600" text-anchor="middle">
            ${item.icon} ${item.name.split(' ')[0]}
          </text>
        `;
      });
    } else {
      // Price representation
      const maxPrice = 100;
      const barSlot = chartW / items.length;
      const barWidth = 22;

      // Horizontal grid lines
      [0, 25, 50, 75, 100].forEach(val => {
        const y = padding.top + chartH - (val / maxPrice * chartH);
        svgContent += `
          <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#e5e7eb" stroke-width="1" />
          <text x="${padding.left - 8}" y="${y + 4}" fill="#9ca3af" font-size="10" text-anchor="end">₹${val}</text>
        `;
      });

      items.forEach((item, idx) => {
        const currentY = padding.top + chartH - (item.price / maxPrice * chartH);
        const prevY = padding.top + chartH - (item.prevPrice / maxPrice * chartH);
        const slotX = padding.left + (idx * barSlot);

        if (metric === 'current') {
          // Current price primary bar
          const barH = padding.top + chartH - currentY;
          svgContent += `
            <rect x="${slotX + 16}" y="${currentY}" width="${barWidth + 8}" height="${barH}" fill="#2e7d32" rx="4">
              <title>${item.name}: ₹${item.price}${item.unit}</title>
            </rect>
            <text x="${slotX + 16 + (barWidth + 8) / 2}" y="${currentY - 6}" fill="#1b4332" font-size="11" font-weight="700" text-anchor="middle">
              ₹${item.price}
            </text>
          `;
        } else {
          // Comparison dual bars (Current vs Previous)
          const currH = padding.top + chartH - currentY;
          const prevH = padding.top + chartH - prevY;

          svgContent += `
            <rect x="${slotX + 8}" y="${currentY}" width="${barWidth}" height="${currH}" fill="#2e7d32" rx="3">
              <title>Current: ₹${item.price}</title>
            </rect>
            <rect x="${slotX + 12 + barWidth}" y="${prevY}" width="${barWidth}" height="${prevH}" fill="#94a3b8" rx="3">
              <title>Last Week: ₹${item.prevPrice}</title>
            </rect>
            <text x="${slotX + 8 + barWidth / 2}" y="${currentY - 4}" fill="#2e7d32" font-size="10" font-weight="700" text-anchor="middle">
              ₹${item.price}
            </text>
            <text x="${slotX + 12 + barWidth + barWidth / 2}" y="${prevY - 4}" fill="#64748b" font-size="10" font-weight="600" text-anchor="middle">
              ₹${item.prevPrice}
            </text>
          `;
        }

        // X-axis label
        svgContent += `
          <text x="${slotX + barSlot / 2}" y="${height - 12}" fill="#374151" font-size="11" font-weight="600" text-anchor="middle">
            ${item.icon} ${item.name.split(' ')[0]}
          </text>
        `;
      });
    }

    DOM.chartSvg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    DOM.chartSvg.innerHTML = svgContent;
  }

  // --- FEEDBACK FORM ---
  function handleFeedbackSubmit(e) {
    e.preventDefault();
    const nameInput = document.getElementById('feedback-name');
    const emailInput = document.getElementById('feedback-email');
    const msgInput = document.getElementById('feedback-msg');

    if (!nameInput.value.trim() || !msgInput.value.trim()) {
      showToast('Please provide your name and message', 'info');
      return;
    }

    const feedbackEntry = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: msgInput.value.trim(),
      timestamp: new Date().toISOString()
    };

    const feedbacks = JSON.parse(localStorage.getItem('vm_feedback') || '[]');
    feedbacks.push(feedbackEntry);
    localStorage.setItem('vm_feedback', JSON.stringify(feedbacks));

    DOM.feedbackForm.reset();
    DOM.feedbackSuccess.style.display = 'block';
    showToast('Thanks! Your feedback has been recorded for this project demo.', 'success');

    setTimeout(() => {
      DOM.feedbackSuccess.style.display = 'none';
    }, 6000);
  }

  // --- TOAST NOTIFICATIONS ---
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✓' : 'ℹ';
    toast.innerHTML = `<span style="font-weight: bold;">${icon}</span><span>${message}</span>`;

    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  // Expose global demo utility for easy console checking if needed
  window.VegetableMarket = {
    state,
    addToCart,
    openCartDrawer,
    openTrackingModal,
    showToast
  };

  // Launch app when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
