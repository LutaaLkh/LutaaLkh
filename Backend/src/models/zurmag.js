import mongoose from 'mongoose';

const safetyMeasureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  details: { type: String, required: true },
});

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  equipment: { type: String },
  document_number: { type: String },
});

const technologyCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  TK_number: { type: String, required: true },
  organization: { type: organizationSchema, required: true },
  goal: { type: String, required: true },
});

const cardSchema = new mongoose.Schema({
  technology_card: { type: technologyCardSchema, required: true },
  risk_sources: { type: [String] },
  related_documents: { type: [String] },
  safety_measures: { type: [safetyMeasureSchema] },
});

const Card = mongoose.model('Card', cardSchema);
export default Card;
