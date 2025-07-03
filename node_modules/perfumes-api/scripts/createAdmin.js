import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../src/models/User.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/perfumes_db';

async function createAdmin() {
  await mongoose.connect(MONGODB_URI);
  const email = 'admin@admin.com';
  const password = '1234';
  const nombre = 'Admin';
  const rol = 'admin';

  const hash = await bcrypt.hash(password, 10);
  const existe = await User.findOne({ email });
  if (existe) {
    existe.password = hash;
    existe.rol = rol;
    existe.nombre = nombre;
    await existe.save();
    console.log('Usuario admin actualizado:', existe);
    await mongoose.disconnect();
    return;
  }
  const user = new User({ nombre, email, password: hash, rol });
  await user.save();
  console.log('Usuario admin creado:', user);
  await mongoose.disconnect();
}

createAdmin().catch(err => {
  console.error(err);
  mongoose.disconnect();
}); 