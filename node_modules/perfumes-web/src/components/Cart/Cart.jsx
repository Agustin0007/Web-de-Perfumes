import { useEffect } from 'react'
import './Cart.css'
import { FaTimes, FaTrash, FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa'

const Cart = ({ isOpen, setIsOpen, items, removeFromCart, updateQuantity }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, setIsOpen])

  const total = items.reduce((sum, item) => sum + item.precio * item.quantity, 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  if (!isOpen) return null

  return (
    <div className="cart-overlay" onClick={() => setIsOpen(false)}>
      <div className="cart-container" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <div className="cart-title">
            <FaShoppingBag className="cart-icon" />
            <h2>Tu Carrito</h2>
            <span className="items-count">({totalItems} items)</span>
          </div>
          <button className="close-cart" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <FaShoppingBag className="empty-cart-icon" />
            <p>Tu carrito está vacío</p>
            <button className="continue-shopping" onClick={() => setIsOpen(false)}>
              Continuar Comprando
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div key={item._id} className="cart-item">
                  <div className="cart-item-image-container">
                    <img 
                      src={item.imagen} 
                      alt={item.nombre} 
                      className="cart-item-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-perfume.jpg';
                      }}
                    />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <div>
                        <h3>{item.nombre}</h3>
                        <p className="cart-item-brand">{item.marca}</p>
                      </div>
                      <button 
                        className="remove-item" 
                        onClick={() => removeFromCart(item._id)}
                        title="Eliminar producto"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <p className="cart-item-price">${item.precio.toFixed(2)}</p>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="quantity-btn"
                        disabled={item.quantity <= 1}
                        title="Disminuir cantidad"
                      >
                        <FaMinus />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="quantity-btn"
                        disabled={item.quantity >= item.stock}
                        title={item.quantity >= item.stock ? "Stock máximo alcanzado" : "Aumentar cantidad"}
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <p className="item-total">Total: ${(item.precio * item.quantity).toFixed(2)}</p>
                    {item.quantity >= item.stock && (
                      <p className="stock-warning">Stock máximo disponible</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Envío:</span>
                  <span>Gratis</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="checkout-btn">
                Proceder al Pago
              </button>
              <button className="continue-shopping-link" onClick={() => setIsOpen(false)}>
                Continuar Comprando
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart 