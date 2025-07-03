import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../src/models/User.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/perfumes_db';

async function createAdmin() {
  await mongoose.connect(MONGODB_URI);
  const email = 'admin@admin.com';
  const password = 'admin123';
  const nombre = 'Admin';
  const rol = 'admin';

  const existe = await User.findOne({ email });
  if (existe) {
    console.log('El usuario admin ya existe.');
    await mongoose.disconnect();
    return;
  }
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ nombre, email, password: hash, rol });
  await user.save();
  console.log('Usuario admin creado:', user);
  await mongoose.disconnect();
}

createAdmin().catch(err => {
  console.error(err);
  mongoose.disconnect();
}); 