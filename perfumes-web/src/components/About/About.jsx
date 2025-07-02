import './About.css'
import { FaLeaf, FaGem, FaHistory, FaUserFriends } from 'react-icons/fa'

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-content">
        <h2 className="about-title">Sobre Nosotros</h2>
        
        <div className="about-description">
          <p>
            Nos especializamos en ofrecer las mejores fragancias y perfumes
            de alta calidad. Nuestro compromiso es brindar productos excepcionales
            y una experiencia de compra única.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaLeaf />
            </div>
            <h3>Calidad Garantizada</h3>
            <p>
              Todos nuestros productos son cuidadosamente seleccionados
              para garantizar la más alta calidad.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaGem />
            </div>
            <h3>Productos Premium</h3>
            <p>
              Ofrecemos una selección exclusiva de las mejores marcas
              y fragancias del mercado.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaHistory />
            </div>
            <h3>Experiencia</h3>
            <p>
              Contamos con amplia experiencia en el sector de
              perfumería y fragancias.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaUserFriends />
            </div>
            <h3>Atención Personalizada</h3>
            <p>
              Brindamos asesoramiento experto para ayudarte a
              encontrar tu perfume ideal.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 