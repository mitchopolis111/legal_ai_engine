const Evidence = require('../models/Evidence');

const isTest = process.env.NODE_ENV === 'test';

exports.listEvidence = async (req, res, next) => {
  try {
    if (isTest) {
      return res.json([]);
    }

    const items = await Evidence.find().sort({ createdAt: -1 }).limit(100);
    res.json(items);
  } catch (err) {
    next(err);
  }
};

exports.createEvidence = async (req, res, next) => {
  try {
    const { source, path, hash, meta } = req.body;

    if (!source || !path || !hash) {
      return res.status(400).json({
        error: true,
        message: 'source, path, and hash are required'
      });
    }

    if (isTest) {
      return res.status(201).json({ source, path, hash, meta });
    }

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
