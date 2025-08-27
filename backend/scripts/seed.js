require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connectDb = require('../config/dbConnection');
const Admin = require('../models/admin');
const Service = require('../models/services');

async function seed() {
  try {
    if (!process.env.MONGO_URL) throw new Error('Missing MONGO_URL in .env');
    await connectDb();

    // 1) Seed admin user
    const email = 'admin@gmail.com';
    const password = 'admin123';
    let admin = await Admin.findOne({ email });
    if (!admin) {
      const passwordHash = await bcrypt.hash(password, 10);
      admin = await Admin.create({ email, username: 'Admin', passwordHash, role: 'admin' });
      console.log(`Created admin user: ${email} (password: ${password})`);
    } else {
      console.log(`Admin user already exists: ${email}`);
    }

    // 2) Seed example services
    const samples = [
      {
        name: 'City Transport',
        description: 'Real-time bus and metro schedules for Addis.',
        category: 'Transportation',
        link: 'https://example.com/transport',
        apiurl: '',
        keywords: ['bus', 'metro', 'transport'],
        isActive: true,
      },
      {
        name: 'Health Portal',
        description: 'Book clinic appointments and access eHealth records.',
        category: 'Health',
        link: 'https://example.com/health',
        apiurl: '',
        keywords: ['health', 'clinic', 'hospital'],
        isActive: true,
      },
      {
        name: 'Utilities Bill Pay',
        description: 'Pay water and electricity bills online.',
        category: 'Utilities',
        link: 'https://example.com/utilities',
        apiurl: '',
        keywords: ['utilities', 'billing', 'electricity', 'water'],
        isActive: true,
      },
    ];

    for (const s of samples) {
      await Service.updateOne(
        { name: s.name },
        { $set: s },
        { upsert: true }
      );
      console.log(`Upserted service: ${s.name}`);
    }

    console.log('Seeding complete.');
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();
