// database.js эсвэл index.js (үүнд серверийн холболт тохируулсан байж болно)
import dotenv from 'dotenv';

dotenv.config(); // .env файл уншиж, тохиргоог ачаалж байна
import mongoose from 'mongoose';

//'mongodb+srv://lkhagvanyam:DtXQ023SsbvJG2FQ@cluster0.srph3.mongodb.net/'
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://lkhagvanyam:DtXQ023SsbvJG2FQ@cluster0.srph3.mongodb.net/zurmag-db');
    console.log('MongoDB-тэй амжилттай холбогдлоо');
  } catch (error) {
    console.error('MongoDB холболт алдаа:', error.message);
    process.exit(1);
  }
};

export default connectDB;
