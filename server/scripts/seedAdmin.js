import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import UserModel from '../models/user.model.js';
import connectDB from '../config/connectDB.js';
import 'dotenv/config';

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = 'admin@anjali';
    const adminPassword = 'Anjali';

    const existingAdmin = await UserModel.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin user already exists.');
      return;
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(adminPassword, salt);

    const adminUser = new UserModel({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN',
      verify_email: true,
    });

    await adminUser.save();
    console.log('Admin user created successfully!');
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedAdmin();
