import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro';

// Registrar usuario
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ message: 'El email ya está registrado.' });
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ nombre, email, password: hash, rol: rol || 'usuario' });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado correctamente.' });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar usuario.' });
  }
});

// Login usuario
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Credenciales incorrectas.' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Credenciales incorrectas.' });
    const token = jwt.sign({ id: user._id, rol: user.rol, nombre: user.nombre, email: user.email }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, user: { id: user._id, nombre: user.nombre, email: user.email, rol: user.rol } });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión.' });
  }
});

// Middleware para verificar JWT
const auth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token requerido.' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido.' });
  }
};

// Obtener usuario autenticado
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });
    res.json(user);
  } catch {
    res.status(500).json({ message: 'Error al obtener usuario.' });
  }
});

// Borrar usuario autenticado
router.delete('/me', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });
    res.json({ message: 'Cuenta eliminada correctamente.' });
  } catch {
    res.status(500).json({ message: 'Error al borrar usuario.' });
  }
});

export { auth };
export default router; 