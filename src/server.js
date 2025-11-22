require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

const start = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`[SERVER] legal_ai_engine running on port ${PORT}`);
  });
};

start().catch((err) => {
  console.error('[SERVER] Failed to start:', err);
  process.exit(1);
});
