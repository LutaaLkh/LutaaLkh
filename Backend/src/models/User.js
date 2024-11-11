// models/User.js
import mongoose from 'mongoose';

// Хэрэглэгчийн схемийг шинэчилж, картуудыг холбож өгнө
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdBy: { type: String }, // Хэнд үүсгэсэн
    deleted: { type: Boolean, default: false }, // Устгасан эсэх
    createdAt: { type: Date, default: Date.now }, // Үүсгэсэн огноо
    updatedAt: { type: Date, default: Date.now }, // Шинэчлэгдсэн огноо
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }], // User-д холбогдсон олон Card
  },
  { timestamps: true } // createdAt, updatedAt-ийг автоматаар хадгална
);

// Моделийг үүсгэх
const User = mongoose.model('User', userSchema);

export default User;
