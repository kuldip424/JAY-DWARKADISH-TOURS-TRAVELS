// Makes a user an admin, or creates a new admin account if the email is new.
// Usage: node admin-setup.js user@example.com
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'node:url';
import { DEFAULT_ADMIN_PASSWORD, promoteToAdmin } from './services/auth/auth.service.js';

dotenv.config({ path: fileURLToPath(new URL('.env', import.meta.url)) });

const email = process.argv[2];
if (!email) {
  console.log('Please provide an email address. Usage: node admin-setup.js user@example.com');
  process.exit(1);
}

try {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cab-booking');
  console.log('Connected to MongoDB...');

  const { user, created } = await promoteToAdmin(email);
  if (created) {
    console.log('New admin account created!');
    console.log(`Email: ${email}`);
    console.log(`Password: ${DEFAULT_ADMIN_PASSWORD} (Please change this after logging in)`);
  } else {
    console.log(`Successfully promoted existing user ${email} to admin!`);
  }
  console.log('Final Status:', { name: user.name, email: user.email, role: user.role });

  await mongoose.disconnect();
  process.exit(0);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
