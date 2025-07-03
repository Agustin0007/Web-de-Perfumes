import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import ProductGrid from './components/ProductGrid/ProductGrid'
import About from './components/About/About'
import Footer from './components/Footer/Footer'
import Cart from './components/Cart/Cart'
import AdminPanel from './components/Admin/AdminPanel'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import AuthMenu from './components/Auth/AuthMenu'
import { getAllPerfumes, getMe, deleteUser } from './services/api'

function AppContent() {
  const [cartItems, setCartItems] = useState(() => {
    // Cargar carrito desde localStorage al iniciar
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [totalItems, setTotalItems] = useState(0)
  const [perfumes, setPerfumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAdmin, setShowAdmin] = useState(false)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [showAuthPanel, setShowAuthPanel] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authModalType, setAuthModalType] = useState('login')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const data = await getAllPerfumes();
        setPerfumes(data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los perfumes');
        setLoading(false);
      }
    };

    fetchPerfumes();
  }, []);

  useEffect(() => {
    setTotalItems(cartItems.reduce((acc, item) => acc + item.quantity, 0))
  }, [cartItems])

  useEffect(() => {
    if (token) {
      getMe(token).then(setUser).catch(() => {
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
      });
    }
  }, [token]);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === product._id)
      if (existingItem) {
        return prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
      return
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const handleLogin = (data) => {
    setToken(data.token);
    localStorage.setItem('token', data.token);
    setUser(data.user);
    setShowAuthPanel(false);
    setShowLogin(false);
    setShowRegister(false);
    navigate('/');
  };

  const handleLogout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('¿Seguro que deseas borrar tu cuenta? Esta acción no se puede deshacer.')) return;
    try {
      await deleteUser(token);
      alert('Cuenta eliminada correctamente.');
      handleLogout();
      navigate('/');
    } catch (err) {
      alert('Error al borrar la cuenta: ' + (err.message || 'Intenta de nuevo.'));
    }
  };

  if (loading) return <div className="loading">Cargando...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="app">
      <Navbar 
        isCartOpen={isCartOpen} 
        setIsCartOpen={setIsCartOpen}
        totalItems={totalItems}
        user={user}
        onLogout={handleLogout}
        rightActions={
          !user && (
            <AuthMenu 
              onLoginClick={() => navigate('/login')}
              onRegisterClick={() => navigate('/register')}
            />
          )
        }
        onDeleteAccount={handleDeleteAccount}
      />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={()=>navigate('/login')} />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="*" element={
          <>
            <Cart 
              isOpen={isCartOpen} 
              setIsOpen={setIsCartOpen}
              items={cartItems}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
            <main>
              <Hero />
              <ProductGrid perfumes={perfumes} addToCart={addToCart} />
              <About />
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
