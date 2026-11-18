import 'dotenv/config'; // first, so every module sees the .env values
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routes/auth.router.js';
import bookingsRouter from './routes/bookings.router.js';
import contentRouter from './routes/content.router.js';
import ridesRouter from './routes/rides.router.js';

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cab-booking')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRouter);
app.use('/api/rides', ridesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/content', contentRouter);

// Health check
app.get('/', (req, res) => res.send('Cab Booking API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
