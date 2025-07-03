import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api';
import './AuthPage.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser({ email, password });
      onLogin(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-page-bg perfume-bg">
      <div className="auth-page-overlay"></div>
      <div className="auth-perfume-hero"></div>
      <div className="auth-page-container fade-in">
        <h2>Iniciar Sesión</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
          <button className="animated-btn btn-primary" type="submit" disabled={loading}>ENTRAR</button>
        </form>
        {error && <div className="auth-error">{error}</div>}
        <div className="auth-nav-btns" style={{alignItems:'center', justifyContent:'center'}}>
          <button className="animated-btn btn-secondary" onClick={() => navigate('/')}>Volver al inicio</button>
          <button className="btn btn-link animated-btn" onClick={() => navigate('/register')}>
            ¿No tienes cuenta? <span className="highlight-link">Regístrate</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login; 