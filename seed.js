require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Customer = require('./models/Customer');
const Vendor = require('./models/Vendor');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('DB Connected');

  await Customer.deleteMany({ email: { $in: ['customer@demo.com'] } });
  await Vendor.deleteMany({ email: { $in: ['vendor@demo.com'] } });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash('Demo@1234', salt);

  await Customer.create({
    name: 'Demo Customer',
    email: 'customer@demo.com',
    password: hash,
    phone_num: 9876543210,
    Address: '123 Demo Street, New Delhi'
  });

  await Vendor.create({
    name: 'Demo Vendor',
    email: 'vendor@demo.com',
    password: hash,
    phone_num: 9123456780,
    Shop_number: 101,
    Gst_Number: 123456789012345
  });

  console.log('Seeded successfully!');
  console.log('Customer → email: customer@demo.com | password: Demo@1234');
  console.log('Vendor   → email: vendor@demo.com   | password: Demo@1234');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
