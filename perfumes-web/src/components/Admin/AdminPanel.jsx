import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';
import { getAllPerfumes, createPerfume, updatePerfume, deletePerfume } from '../../services/api';

const initialForm = {
  nombre: '',
  marca: '',
  categoria: '',
  descripcion: '',
  precio: '',
  stock: '',
  imagen: ''
};

const AdminPanel = ({ user }) => {
  const navigate = useNavigate();
  const [perfumes, setPerfumes] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [imgModal, setImgModal] = useState({ open: false, src: '', alt: '' });

  useEffect(() => {
    // Si no es admin, redirigir a home
    if (!user || user.rol !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const fetchPerfumes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPerfumes();
      setPerfumes(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPerfumes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (editingId) {
        await updatePerfume(editingId, form);
        setSuccess('Perfume actualizado correctamente.');
      } else {
        await createPerfume(form);
        setSuccess('Perfume creado correctamente.');
      }
      setForm(initialForm);
      setEditingId(null);
      fetchPerfumes();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleEdit = (perfume) => {
    setForm({ ...perfume });
    setEditingId(perfume._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este perfume?')) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await deletePerfume(id);
      setSuccess('Perfume eliminado correctamente.');
      fetchPerfumes();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  return (
    <div className="admin-panel-standalone">
      <h1>Panel de Administración</h1>
      <div className="admin-panel">
        <h2>Panel de Administración</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
          <input name="marca" value={form.marca} onChange={handleChange} placeholder="Marca" required />
          <select name="categoria" value={form.categoria} onChange={handleChange} required>
            <option value="">Selecciona categoría</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
            <option value="Unisex">Unisex</option>
          </select>
          <input name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" required />
          <input name="precio" value={form.precio} onChange={handleChange} placeholder="Precio" type="number" min="0" step="0.01" required />
          <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" min="0" required />
          <input name="imagen" value={form.imagen} onChange={handleChange} placeholder="URL de Imagen" required />
          <div className="admin-form-actions">
            <button className="btn btn-primary" type="submit" disabled={loading}>{editingId ? 'Actualizar' : 'Crear'}</button>
            {editingId && <button className="btn btn-secondary" type="button" onClick={handleCancel}>Cancelar</button>}
          </div>
        </form>
        {error && <div className="admin-error">{error}</div>}
        {success && <div className="admin-success">{success}</div>}
        <div className="admin-list">
          <h3>Lista de Perfumes</h3>
          {/* Tabla solo en desktop */}
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Categoría</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {perfumes.map(perfume => (
                <tr key={perfume._id}>
                  <td>{perfume.nombre}</td>
                  <td>{perfume.marca}</td>
                  <td>{perfume.categoria}</td>
                  <td style={{whiteSpace:'pre-line',maxWidth:220}}>{perfume.descripcion}</td>
                  <td>${perfume.precio}</td>
                  <td>{perfume.stock}</td>
                  <td>
                    <img 
                      src={perfume.imagen} 
                      alt={perfume.nombre} 
                      onClick={() => setImgModal({ open: true, src: perfume.imagen, alt: perfume.nombre })}
                      style={{cursor:'pointer'}}
                    />
                    <button className="view-img-btn" onClick={e => {e.preventDefault(); setImgModal({ open: true, src: perfume.imagen, alt: perfume.nombre })}}>Ver</button>
                  </td>
                  <td className="admin-actions">
                    <button className="auth-menu-btn" onClick={() => handleEdit(perfume)}>
                      EDITAR
                    </button>
                    <button className="auth-menu-btn delete-btn" onClick={() => handleDelete(perfume._id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Modal para ver imagen grande */}
          {imgModal.open && (
            <div className="admin-img-modal-overlay" onClick={() => setImgModal({ open: false, src: '', alt: '' })}>
              <div className="admin-img-modal" onClick={e => e.stopPropagation()}>
                <img src={imgModal.src} alt={imgModal.alt} />
                <button onClick={() => setImgModal({ open: false, src: '', alt: '' })}>Cerrar</button>
              </div>
            </div>
          )}
          {/* Tarjetas en mobile */}
          <div className="admin-cards-list">
            {perfumes.map(perfume => (
              <div className="admin-card" key={perfume._id}>
                <img src={perfume.imagen} alt={perfume.nombre} />
                <div><b>Nombre:</b> {perfume.nombre}</div>
                <div><b>Marca:</b> {perfume.marca}</div>
                <div><b>Categoría:</b> {perfume.categoria}</div>
                <div><b>Descripción:</b> {perfume.descripcion}</div>
                <div><b>Precio:</b> ${perfume.precio}</div>
                <div><b>Stock:</b> {perfume.stock}</div>
                <div className="admin-actions">
                  <button className="auth-menu-btn" onClick={() => handleEdit(perfume)}>
                    EDITAR
                  </button>
                  <button className="auth-menu-btn delete-btn" onClick={() => handleDelete(perfume._id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 