import mongoose from 'mongoose';

// Connects to MongoDB and builds the indexes declared in the models.
const connectToMongoDb = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cab-booking';
  await mongoose.connect(uri);
  await mongoose.syncIndexes();
  console.log('Connected to MongoDB');
};

export default connectToMongoDb;
