import { useState, useEffect } from 'react'
import './Navbar.css'
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ isCartOpen, setIsCartOpen, totalItems, user, onLogout, rightActions, onDeleteAccount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <div className="nav-logo" onClick={() => scrollToSection('home')} style={{ cursor: 'pointer' }}>
          <span>Arabian Scents</span>
        </div>
        <div className="nav-links">
          <a href="#home" onClick={() => scrollToSection('home')}>Inicio</a>
          <a href="#products" onClick={() => scrollToSection('products')}>Productos</a>
          <a href="#about" onClick={() => scrollToSection('about')}>Sobre Nosotros</a>
          <a href="#contact" onClick={() => scrollToSection('contact')}>Contacto</a>
        </div>
        <div className="nav-actions">
          <button 
            className="cart-btn" 
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <FaShoppingCart />
            {totalItems > 0 && (
              <span className="cart-count">{totalItems}</span>
            )}
          </button>
          {user && (
            <button className="auth-hamburger" onClick={() => setIsMenuOpen(true)}>
              <FaBars />
            </button>
          )}
          {!user && rightActions}
        </div>
      </div>

      {/* Menú lateral hamburguesa solo para usuario y cerrar sesión */}
      {isMenuOpen && user && (
        <div className="auth-menu-overlay" onClick={() => setIsMenuOpen(false)}>
          <aside className="auth-menu-panel" onClick={e => e.stopPropagation()}>
            <button className="auth-menu-close" onClick={() => setIsMenuOpen(false)}><FaTimes /></button>
            <div className="auth-menu-actions">
              <div style={{color:'var(--color-gold)', fontWeight:600, marginBottom:'1rem', textAlign:'center'}}>
                {user.nombre} ({user.rol})
              </div>
              {user.rol === 'admin' && (
                <button className="auth-menu-btn" style={{marginBottom:'1rem'}} onClick={() => { setIsMenuOpen(false); window.open('/admin-panel', '_blank'); }}>
                  Panel Admin
                </button>
              )}
              <button className="auth-menu-btn" onClick={() => { setIsMenuOpen(false); onLogout(); }}>Cerrar sesión</button>
              <button className="auth-menu-btn" style={{background:'none',color:'red',border:'2px solid red',marginTop:'1rem'}} onClick={() => { setShowDeleteModal(true); }}>Borrar cuenta</button>
            </div>
          </aside>
          {showDeleteModal && (
            <div className="delete-modal-overlay" onClick={() => setShowDeleteModal(false)}>
              <div className="delete-modal" onClick={e => e.stopPropagation()}>
                <h3>¿Seguro que deseas borrar tu cuenta?</h3>
                <p>Esta acción <b>no se puede deshacer</b>.</p>
                <div className="delete-modal-actions">
                  <button className="delete-modal-btn delete-modal-confirm" onClick={() => { setShowDeleteModal(false); onDeleteAccount(); }}>Sí, borrar</button>
                  <button className="delete-modal-btn delete-modal-cancel" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar 