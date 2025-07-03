import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './AuthMenu.css';

const AuthMenu = ({ onLoginClick, onRegisterClick }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="auth-hamburger" onClick={() => setOpen(true)}>
        <FaBars />
      </button>
      {open && (
        <div className="auth-menu-overlay" onClick={() => setOpen(false)}>
          <aside className="auth-menu-panel" onClick={e => e.stopPropagation()}>
            <button className="auth-menu-close" onClick={() => setOpen(false)}><FaTimes /></button>
            <div className="auth-menu-actions">
              <button className="auth-menu-btn" onClick={() => { setOpen(false); onLoginClick(); }}>Iniciar sesión</button>
              <button className="auth-menu-btn" onClick={() => { setOpen(false); onRegisterClick(); }}>Registrarse</button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default AuthMenu; 