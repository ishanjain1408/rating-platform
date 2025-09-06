import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import storeRoutes from './routes/storeRoutes.js';
import ownerRoutes from './routes/ownerRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.send({ status: 'OK', service: 'Rating Platform API' }));

app.use(authRoutes);
app.use(storeRoutes);
app.use(ownerRoutes);
app.use(adminRoutes);

app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

export default app;
