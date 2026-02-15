import { useState, useMemo } from 'react';
import { products, categories } from './data/products';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { useCart } from './hooks/useCart';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { NetworkBanner } from './components/NetworkBanner';
import './App.css';

export default function App() {
  const { isOnline, wasOffline } = useOnlineStatus();
  const { cart, addToCart, removeFromCart, updateQty, totalItems, totalPrice } = useCart();

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="app" data-theme={isDark ? 'dark' : 'light'}>
      <Header
        totalItems={totalItems}
        onCartOpen={() => setCartOpen(true)}
        isOnline={isOnline}
        onThemeToggle={() => setIsDark(d => !d)}
        isDark={isDark}
      />

      <main className="main">
        {/* Hero */}
        <section className="hero">
          <div className="hero-text">
            <span className="hero-eyebrow">PWA · Works Offline</span>
            <h1 className="hero-title">Shop Without<br /><em>Limits</em></h1>
            <p className="hero-sub">Browse, add to cart, and explore — even with no internet connection.</p>
          </div>
          <div className="hero-decoration">
            <span>👟</span><span>🧥</span><span>👜</span>
          </div>
        </section>

        {/* Search */}
        <div className="search-bar-wrap">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="categories-wrap">
          <div className="categories">
            {categories.map(cat => (
              <button
                key={cat}
                className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <p>{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
          {!isOnline && (
            <span className="offline-tag">📦 Cached</span>
          )}
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="product-grid">
            {filtered.map((product, i) => (
              <div key={product.id} style={{ animationDelay: `${i * 0.06}s` }}>
                <ProductCard
                  product={product}
                  onAddToCart={addToCart}
                  onViewDetail={setSelectedProduct}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>🔎</span>
            <p>No products match "<strong>{searchQuery}</strong>"</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
              Clear filters
            </button>
          </div>
        )}

        {/* Offline Info Card */}
        <div className="pwa-info-card">
          <div className="pwa-info-icon">{isOnline ? '☁️' : '💾'}</div>
          <div>
            <h3>This app works offline</h3>
            <p>
              Powered by a <strong>Service Worker</strong> — all assets and product data are 
              cached on first visit. Your cart is saved in <strong>localStorage</strong> and 
              persists across sessions.
            </p>
          </div>
        </div>
      </main>

      {/* Modals & Drawers */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onUpdateQty={updateQty}
          totalPrice={totalPrice}
        />
      )}

      <NetworkBanner isOnline={isOnline} wasOffline={wasOffline} />
    </div>
  );
}
