import { useState, useEffect } from 'react';
import './ProductModal.css';

export function ProductModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent scroll behind modal
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-image" style={{ background: product.color }}>
          <span className="modal-emoji">{product.emoji}</span>
        </div>

        <div className="modal-content">
          <span className="modal-category">{product.category}</span>
          <h2 className="modal-title">{product.name}</h2>

          <div className="modal-pricing">
            <span className="modal-price">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="modal-original">${product.originalPrice}</span>
                <span className="modal-discount">−{discount}%</span>
              </>
            )}
          </div>

          <div className="modal-rating">
            <span>★ {product.rating}</span>
            <span className="modal-reviews">{product.reviews} reviews</span>
          </div>

          <p className="modal-description">{product.description}</p>

          {product.sizes.length > 1 && (
            <div className="size-section">
              <p className="size-label">Size</p>
              <div className="size-grid">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            className={`modal-add-btn ${added ? 'added' : ''}`}
            onClick={handleAdd}
          >
            {added ? '✓ Added to Cart!' : `Add to Cart — $${product.price}`}
          </button>
        </div>
      </div>
    </div>
  );
}
