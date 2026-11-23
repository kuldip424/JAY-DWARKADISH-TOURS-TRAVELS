import 'dotenv/config'; // first, so every module sees the .env values
import express from 'express';
import cors from 'cors';
import connectToMongoDb from './db/connect_to_mongoDb.js';
import errorHandler from './middlewares/errorHandler.js';
import authRouter from './routes/auth.router.js';
import bookingsRouter from './routes/bookings.router.js';
import contentRouter from './routes/content.router.js';

// Without a secret, anyone could forge a login token, so don't start at all.
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not set. Add it to backend/.env (see .env.example).');
  process.exit(1);
}

// Only our own site may call the API. Set CLIENT_URL on the server
// (comma-separated for more than one site).
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',');

const app = express();
app.set('trust proxy', 1); // Render/Cloudflare sit in front, so req.ip is the real visitor
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/content', contentRouter);

// Health check
app.get('/', (req, res) => res.send('Cab Booking API is running...'));

app.use(errorHandler); // last: every thrown error ends up here

const PORT = process.env.PORT || 5000;
connectToMongoDb()
  .then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
