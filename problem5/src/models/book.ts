import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  price: number;
  publishedYear: number;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  publishedYear: { type: Number, required: true }
}, {
  timestamps: true
});

export default mongoose.model<IBook>('Book', BookSchema); 