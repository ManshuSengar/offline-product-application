import './Header.css';

export function Header({ totalItems, onCartOpen, isOnline, onThemeToggle, isDark }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <span className="brand-icon">🛍</span>
          <span className="brand-name">OfflineShop</span>
          <span className={`status-pill ${isOnline ? 'online' : 'offline'}`}>
            <span className="status-dot" />
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>

        <div className="header-actions">
          <button
            className="theme-btn"
            onClick={onThemeToggle}
            aria-label="Toggle theme"
            title="Toggle dark/light mode"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          <button className="cart-btn" onClick={onCartOpen}>
            <span className="cart-icon">🛒</span>
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
