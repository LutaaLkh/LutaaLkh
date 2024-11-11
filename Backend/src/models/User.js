// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdBy: { type: String },
    deleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    cards:[{type:mongoose.Schema.Types.ObjectId, Card}],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
