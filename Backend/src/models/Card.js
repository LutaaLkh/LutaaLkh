// models/Card.js
import mongoose from 'mongoose';

// Аюулгүй ажиллагааны арга хэмжээний схем
const safetyMeasureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  details: { type: String, required: true },
});

// Байгууллагын схем
const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  equipment: { type: String },
  document_number: { type: String },
});

// Технологийн картын схем
const technologyCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  TK_number: { type: String, required: true },
  organization: { type: organizationSchema, required: true },
  goal: { type: String, required: true },
});

// Картын үндсэн схем
const cardSchema = new mongoose.Schema({
  technology_card: { type: technologyCardSchema, required: true },
  risk_sources: { type: [String] },  // Аюултай эх үүсвэрүүд
  related_documents: { type: [String] },  // Холбогдсон баримт бичиг
  safety_measures: { type: [safetyMeasureSchema] },  // Аюулгүй ажиллагааны арга хэмжээ
  createdAt: { type: Date, default: Date.now },  // Үүсгэсэн огноо
  updatedAt: { type: Date, default: Date.now },  // Шинэчилсэн огноо
});

const Card = mongoose.model('Card', cardSchema);
export default Card;
