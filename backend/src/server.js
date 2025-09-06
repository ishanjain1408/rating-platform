import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB, sequelize } from './config/database.js';
import './models/index.js'; // registers associations & constraint

const PORT = process.env.PORT || 4000;

const start = async () => {
  await connectDB();

  // Sync models
  const doSync = process.argv.includes('--sync');
  if (doSync) {
    await sequelize.sync({ alter: true });
    console.log('🔁 Sequelize sync complete');
  }

  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
};

start();
