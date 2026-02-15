import { useState } from 'react';
import './ProductCard.css';

export function ProductCard({ product, onAddToCart, onViewDetail }) {
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0];
    onAddToCart(product, defaultSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <article className="product-card" onClick={() => onViewDetail(product)}>
      <div className="card-image" style={{ background: product.color }}>
        <span className="product-emoji">{product.emoji}</span>

        {product.tag && (
          <span className={`product-tag tag-${product.tag.toLowerCase().replace(' ', '-')}`}>
            {product.tag}
          </span>
        )}

        {discount && (
          <span className="discount-badge">−{discount}%</span>
        )}

        <button
          className={`quick-add-btn ${added ? 'added' : ''}`}
          onClick={handleQuickAdd}
          aria-label="Quick add to cart"
        >
          {added ? '✓ Added' : '+ Cart'}
        </button>
      </div>

      <div className="card-body">
        <p className="card-category">{product.category}</p>
        <h3 className="card-name">{product.name}</h3>

        <div className="card-footer">
          <div className="price-group">
            <span className="price-current">${product.price}</span>
            {product.originalPrice && (
              <span className="price-original">${product.originalPrice}</span>
            )}
          </div>
          <div className="rating">
            <span className="star">★</span>
            <span className="rating-value">{product.rating}</span>
            <span className="review-count">({product.reviews})</span>
          </div>
        </div>
      </div>
    </article>
  );
}
