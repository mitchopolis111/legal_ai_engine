const Evidence = require('../models/Evidence');

exports.listEvidence = async (req, res, next) => {
  try {
    const items = await Evidence.find().sort({ createdAt: -1 }).limit(100);
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.createEvidence = async (req, res, next) => {
  try {
    const { source, path, hash, meta } = req.body;

    const created = await Evidence.create({
      source,
      path,
      hash,
      meta
    });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};
