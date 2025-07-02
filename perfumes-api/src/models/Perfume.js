import mongoose from 'mongoose';

const perfumeSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true,
        enum: ['Hombre', 'Mujer', 'Unisex']
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    destacado: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default mongoose.model('Perfume', perfumeSchema); 