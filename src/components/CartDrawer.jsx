import { useEffect } from 'react';
import './CartDrawer.css';

export function CartDrawer({ cart, onClose, onRemove, onUpdateQty, totalPrice }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2 className="cart-title">Your Cart</h2>
          <span className="cart-count">{cart.length} item{cart.length !== 1 ? 's' : ''}</span>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <span className="empty-icon">🛒</span>
            <p>Your cart is empty</p>
            <button className="keep-shopping" onClick={onClose}>Keep Shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="cart-item">
                  <div className="item-thumb" style={{ background: item.color }}>
                    <span>{item.emoji}</span>
                  </div>
                  <div className="item-info">
                    <p className="item-name">{item.name}</p>
                    <p className="item-size">Size: {item.selectedSize}</p>
                    <div className="item-actions">
                      <div className="qty-control">
                        <button onClick={() => onUpdateQty(item.id, item.selectedSize, item.qty - 1)}>−</button>
                        <span>{item.qty}</span>
                        <button onClick={() => onUpdateQty(item.id, item.selectedSize, item.qty + 1)}>+</button>
                      </div>
                      <span className="item-total">${(item.price * item.qty).toFixed(0)}</span>
                    </div>
                  </div>
                  <button
                    className="item-remove"
                    onClick={() => onRemove(item.id, item.selectedSize)}
                    aria-label="Remove"
                  >✕</button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-summary">
                <span>Subtotal</span>
                <span className="cart-total">${totalPrice.toFixed(0)}</span>
              </div>
              <button className="checkout-btn">
                Checkout — ${totalPrice.toFixed(0)}
              </button>
              <p className="offline-note">💾 Cart saved locally — persists offline</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
