import express from 'express';
import { connectDB } from './config/database';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes';

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log('MongoDB Connected Successfully');
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  });

app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 