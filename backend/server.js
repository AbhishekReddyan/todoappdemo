const express = require('express');
const cors = require('cors');
require('dotenv').config();

const todosRouter = require('./routes/todos');
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

// health
app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));

app.use('/api/todos', todosRouter);

const PORT = Number(process.env.PORT) || 3000;  
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
