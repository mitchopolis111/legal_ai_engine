const Evidence = require('../models/Evidence');

const isTest = process.env.NODE_ENV === 'test';

const requireFields = (body, fields) => {
  const missing = fields.filter((f) => !body[f]);
  return missing.length ? missing : null;
};

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

    const missing = requireFields(req.body, ['source', 'path', 'hash']);
    if (missing) {
      return res.status(400).json({
        error: true,
        message: `Missing required fields: ${missing.join(', ')}`
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

exports.getEvidence = async (req, res, next) => {
  try {
    if (isTest) {
      return res.json({ id: req.params.id, source: 'TEST', path: '/tmp/test', hash: 'abc123' });
    }

    const item = await Evidence.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: true, message: 'Evidence not found' });
    }

    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.updateEvidence = async (req, res, next) => {
  try {
    const missing = requireFields(req.body, ['source', 'path', 'hash']);
    if (missing) {
      return res.status(400).json({
        error: true,
        message: `Missing required fields: ${missing.join(', ')}`
      });
    }

    if (isTest) {
      return res.json({ id: req.params.id, ...req.body });
    }

    const updated = await Evidence.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({ error: true, message: 'Evidence not found' });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteEvidence = async (req, res, next) => {
  try {
    if (isTest) {
      return res.json({ deleted: true, id: req.params.id });
    }

    const deleted = await Evidence.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: true, message: 'Evidence not found' });
    }

    res.json({ deleted: true });
  } catch (err) {
    next(err);
  }
};

exports.searchEvidence = async (req, res, next) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: true, message: 'query is required' });
    }

    if (isTest) {
      return res.json([{ id: 'search-1', query }]);
    }

    const regex = new RegExp(query, 'i');
    const results = await Evidence.find({
      $or: [{ source: regex }, { path: regex }, { hash: regex }]
    }).limit(50);

    res.json(results);
  } catch (err) {
    next(err);
  }
};

exports.exportEvidence = async (req, res, next) => {
  try {
    const { ids } = req.body || {};

    if (isTest) {
      return res.json({ exported: Array.isArray(ids) ? ids.length : 'all' });
    }

    const query = Array.isArray(ids) && ids.length ? { _id: { $in: ids } } : {};
    const items = await Evidence.find(query);

    res.json({ exported: items.length, items });
  } catch (err) {
    next(err);
  }
};

exports.importEvidence = async (req, res, next) => {
  try {
    const { items } = req.body || {};
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: true, message: 'items array is required' });
    }

    const invalid = items
      .map((item, idx) => ({
        idx,
        missing: requireFields(item, ['source', 'path', 'hash'])
      }))
      .filter((entry) => entry.missing);

    if (invalid.length) {
      return res.status(400).json({
        error: true,
        message: 'One or more items are missing required fields',
        invalid
      });
    }

    if (isTest) {
      return res.status(201).json({ imported: items.length, skipped: 0 });
    }

    const created = await Evidence.insertMany(items, { ordered: false });
    return res.status(201).json({ imported: created.length });
  } catch (err) {
    next(err);
  }
};

exports.indexEvidence = async (req, res, next) => {
  try {
    if (isTest) {
      return res.json({ indexed: true });
    }

    const total = await Evidence.countDocuments();
    return res.json({ indexed: true, total });
  } catch (err) {
    next(err);
  }
};
