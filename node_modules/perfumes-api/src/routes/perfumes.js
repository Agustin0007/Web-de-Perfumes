import express from 'express';
import Perfume from '../models/Perfume.js';
import { auth } from './users.js';

const router = express.Router();

// Obtener todos los perfumes
router.get('/', async (req, res) => {
    try {
        const perfumes = await Perfume.find();
        res.json(perfumes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un perfume por ID
router.get('/:id', async (req, res) => {
    try {
        const perfume = await Perfume.findById(req.params.id);
        if (perfume) {
            res.json(perfume);
        } else {
            res.status(404).json({ message: 'Perfume no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un nuevo perfume
router.post('/', auth, async (req, res) => {
    console.log('Intentando crear perfume. Body recibido:', req.body);
    if (req.user.rol !== 'admin') {
        console.log('Permiso denegado: no es admin');
        return res.status(403).json({ message: 'Solo el administrador puede crear perfumes.' });
    }
    const perfume = new Perfume({
        nombre: req.body.nombre,
        marca: req.body.marca,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        categoria: req.body.categoria,
        stock: req.body.stock,
        destacado: req.body.destacado
    });

    try {
        const nuevoPerfume = await perfume.save();
        console.log('Perfume guardado correctamente:', nuevoPerfume);
        res.status(201).json(nuevoPerfume);
    } catch (error) {
        console.error('Error al guardar perfume:', error);
        res.status(400).json({ message: error.message });
    }
});

// Actualizar un perfume
router.put('/:id', auth, async (req, res) => {
    if (req.user.rol !== 'admin') return res.status(403).json({ message: 'Solo el administrador puede actualizar perfumes.' });
    try {
        const perfume = await Perfume.findById(req.params.id);
        if (perfume) {
            Object.assign(perfume, req.body);
            const perfumeActualizado = await perfume.save();
            res.json(perfumeActualizado);
        } else {
            res.status(404).json({ message: 'Perfume no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un perfume
router.delete('/:id', auth, async (req, res) => {
    if (req.user.rol !== 'admin') return res.status(403).json({ message: 'Solo el administrador puede eliminar perfumes.' });
    try {
        const perfume = await Perfume.findByIdAndDelete(req.params.id);
        if (perfume) {
            res.json({ message: 'Perfume eliminado' });
        } else {
            res.status(404).json({ message: 'Perfume no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router; 