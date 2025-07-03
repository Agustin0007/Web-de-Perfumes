import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api';
import './AuthPage.css';

const Register = ({ onRegister }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await registerUser({ nombre, email, password });
      setSuccess('Usuario registrado correctamente. Ahora puedes iniciar sesión.');
      setNombre(''); setEmail(''); setPassword('');
      if (onRegister) onRegister();
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
        <h2>Registrarse</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
          <button className="animated-btn btn-primary" type="submit" disabled={loading}>Registrarse</button>
        </form>
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}
        <div className="auth-nav-btns" style={{alignItems:'center', justifyContent:'center'}}>
          <button className="animated-btn btn-secondary" onClick={() => navigate('/')}>Volver al inicio</button>
          <button className="btn btn-link animated-btn" onClick={() => navigate('/login')}>
            ¿Ya tienes cuenta? <span className="highlight-link">Inicia sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register; 