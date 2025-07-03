import './Hero.css'
import { FaArrowDown } from 'react-icons/fa'

const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products')
    productsSection.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero-section" id="home">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-title-main">Perfumes</span>
          <span className="hero-title-sub">Fragancias Exclusivas</span>
        </h1>
        <p className="hero-description">
          Descubre nuestra colección de perfumes exclusivos
        </p>
        <div className="hero-buttons">
          <button className="hero-button primary" onClick={scrollToProducts}>
            Ver Catálogo
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero 