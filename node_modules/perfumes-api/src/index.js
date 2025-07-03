import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import perfumesRoutes from './routes/perfumes.js';
import usersRoutes from './routes/users.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/perfumes_db')
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error conectando a MongoDB:', err));

// Rutas
app.use('/api/perfumes', perfumesRoutes);
app.use('/api/users', usersRoutes);

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../../perfumes-web/dist')));

// Para cualquier ruta que no sea API, devolver el index.html del frontend
app.get('*', (req, res) => {
  if (req.originalUrl.startsWith('/api/')) return res.status(404).json({ error: 'Not found' });
  res.sendFile(path.join(__dirname, '../../perfumes-web/dist/index.html'));
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
}); 