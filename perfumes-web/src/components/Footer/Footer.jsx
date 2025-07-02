import './Footer.css'
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterest, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <img 
              src="https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=400&auto=format&fit=crop"
              alt="Arabian Scents Logo"
            />
          </div>
          <p className="footer-description">
            Descubre la magia de los perfumes árabes tradicionales, elaborados con las más finas esencias y aceites naturales.
          </p>
          <div className="social-links">
            <a href="#" className="social-link"><FaFacebookF /></a>
            <a href="#" className="social-link"><FaInstagram /></a>
            <a href="#" className="social-link"><FaTwitter /></a>
            <a href="#" className="social-link"><FaPinterest /></a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Enlaces Rápidos</h3>
          <ul className="footer-links">
            <li><a href="#home">Inicio</a></li>
            <li><a href="#products">Productos</a></li>
            <li><a href="#about">Sobre Nosotros</a></li>
            <li><a href="#contact">Contacto</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contacto</h3>
          <ul className="footer-links">
            <li>
              <a href="#">
                <FaMapMarkerAlt />
                Calle Principal 123, Madrid
              </a>
            </li>
            <li>
              <a href="tel:+34912345678">
                <FaPhone />
                +34 912 345 678
              </a>
            </li>
            <li>
              <a href="mailto:info@arabianscents.com">
                <FaEnvelope />
                info@arabianscents.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Arabian Scents. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer 