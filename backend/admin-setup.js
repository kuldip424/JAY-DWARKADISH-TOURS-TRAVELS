const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const promoteToAdmin = async (email) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cab-booking');
        console.log('Connected to MongoDB...');

        let user = await User.findOneAndUpdate(
            { email: email },
            { role: 'admin' },
            { new: true }
        );

        if (!user) {
            console.log(`User with email ${email} not found. Creating a new admin account...`);
            user = await User.create({
                name: 'Admin User',
                email: email,
                password: 'admin123', // Default password for new auto-created admin
                role: 'admin'
            });
            console.log(`New admin account created!`);
            console.log(`Email: ${email}`);
            console.log(`Password: admin123 (Please change this after logging in)`);
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
};

// Get email from command line argument
const email = process.argv[2];
if (!email) {
    console.log('Please provide an email address. Usage: node admin-setup.js user@example.com');
    process.exit(1);
}

promoteToAdmin(email);
