const mongoose = require('mongoose');

const EvidenceSchema = new mongoose.Schema(
  {
    source: { type: String, required: true }, // OFW, MCFD, BCFMA, TEXTLOG, etc.
    path:   { type: String, required: true },
    hash:   { type: String, required: true, unique: true },
    meta:   { type: Object, default: {} }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Evidence', EvidenceSchema);
