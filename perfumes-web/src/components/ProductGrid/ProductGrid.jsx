import { useState, useEffect } from 'react'
import './ProductGrid.css'
import { FaSearch, FaUser, FaMale, FaFemale, FaStar } from 'react-icons/fa'

const categories = [
  { id: 'all', name: 'Todos', icon: <FaStar /> },
  { id: 'Hombre', name: 'Hombre', icon: <FaMale /> },
  { id: 'Mujer', name: 'Mujer', icon: <FaFemale /> },
  { id: 'Unisex', name: 'Unisex', icon: <FaUser /> }
]

const ProductGrid = ({ perfumes, addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredProducts = perfumes.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.categoria === selectedCategory
    const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.marca.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section className="products" id="products">
      <div className="products-content">
        <h2 className="section-title">Catálogo de Perfumes</h2>
        <p className="section-subtitle">
          Explora nuestra colección de fragancias
        </p>
        
        <div className="filters">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por nombre, marca o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p>No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          <div className={`products-grid ${isVisible ? 'visible' : ''}`}>
            {filteredProducts.map(product => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  <img 
                    src={product.imagen} 
                    alt={product.nombre} 
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder-perfume.jpg';
                    }}
                  />
                  <div className="product-overlay">
                    <div className="product-actions">
                      <button 
                        className="btn btn-primary"
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                      >
                        {product.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="product-info">
                  <h3>{product.nombre}</h3>
                  <p className="product-brand">{product.marca}</p>
                  <p className="product-category">{product.categoria}</p>
                  <p className="product-description">{product.descripcion}</p>
                  <div className="product-price-container">
                    <div className="product-price">
                      US${product.precio.toFixed(2)}
                    </div>
                    <button 
                      className="btn btn-primary mobile-add-cart-btn"
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                    >
                      {product.stock === 0 ? 'Agotado' : 'Agregar'}
                    </button>
                  </div>
                  {product.stock < 5 && product.stock > 0 && (
                    <p className="stock-warning">¡Quedan solo {product.stock} unidades!</p>
                  )}
                  {product.stock === 0 && (
                    <p className="out-of-stock">Agotado</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductGrid