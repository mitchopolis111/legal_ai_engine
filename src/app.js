const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const evidenceRoutes = require('./routes/evidenceRoutes');

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'legal_ai_engine' });
});

app.use('/api/evidence', evidenceRoutes);

app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Internal server error'
  });
});

module.exports = app;
