const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const evidenceRoutes = require('./routes/evidenceRoutes');

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(morgan('dev'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'legal_ai_engine' });
});

// Version metadata
const commit = process.env.COMMIT || 'unknown';
const startTime = Date.now();

app.get('/version', (req, res) => {
  res.json({
    service: 'legal_ai_engine',
    version: '1.0.0',
    node: process.version,
    environment: process.env.NODE_ENV || 'dev',
    commit,
    uptime_seconds: Math.floor((Date.now() - startTime) / 1000),
    timestamp: new Date().toISOString()
  });
});

// Evidence routes
app.use('/api/evidence', evidenceRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Internal server error'
  });
});

module.exports = app;       // IMPORTANT — MUST EXPORT THE EXPRESS APP
