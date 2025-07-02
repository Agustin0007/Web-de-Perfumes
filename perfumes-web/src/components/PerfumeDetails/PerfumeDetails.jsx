import './PerfumeDetails.css'
import { FaTimes, FaStar, FaWind, FaHeart, FaFeather, FaShoppingCart } from 'react-icons/fa'

const PerfumeDetails = ({ perfume, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !perfume) return null

  const handleAddToCart = () => {
    onAddToCart(perfume)
    onClose()
  }

  return (
    <div className="perfume-modal-overlay" onClick={onClose}>
      <div className="perfume-modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="perfume-modal-grid">
          <div className="perfume-modal-image">
            <img src={perfume.image} alt={perfume.name} />
          </div>
          
          <div className="perfume-modal-info">
            <h2>{perfume.name}</h2>
            
            <div className="perfume-rating">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < perfume.rating ? 'active' : ''} />
              ))}
            </div>
            
            <p className="perfume-description">{perfume.description}</p>
            
            <div className="perfume-notes">
              <div className="note-group">
                <div className="note-header">
                  <FaWind />
                  <h3>Notas de Salida</h3>
                </div>
                <p>{perfume.notes.top.join(', ')}</p>
              </div>
              
              <div className="note-group">
                <div className="note-header">
                  <FaHeart />
                  <h3>Notas de Corazón</h3>
                </div>
                <p>{perfume.notes.heart.join(', ')}</p>
              </div>
              
              <div className="note-group">
                <div className="note-header">
                  <FaFeather />
                  <h3>Notas de Fondo</h3>
                </div>
                <p>{perfume.notes.base.join(', ')}</p>
              </div>
            </div>
            
            <div className="perfume-additional-info">
              <div className="info-item">
                <h4>Familia Olfativa</h4>
                <p>{perfume.category}</p>
              </div>
              <div className="info-item">
                <h4>Concentración</h4>
                <p>{perfume.concentration || 'Eau de Parfum'}</p>
              </div>
              <div className="info-item">
                <h4>Duración</h4>
                <p>{perfume.duration || '8-12 horas'}</p>
              </div>
            </div>
            
            <div className="perfume-actions">
              <span className="perfume-price">${perfume.price}</span>
              <button 
                className="add-to-cart-btn" 
                onClick={handleAddToCart}
              >
                <FaShoppingCart />
                Añadir al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerfumeDetails 