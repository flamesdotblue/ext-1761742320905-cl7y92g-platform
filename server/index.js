const express = require('express');
const cors = require('cors');
const path = require('path');
const DataStore = require('./store');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const dbPath = path.join(__dirname, '..', 'db', 'data.json');
const store = new DataStore(dbPath);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/items', (req, res) => {
  const items = store.getAll();
  res.json(items);
});

app.get('/api/items/:id', (req, res) => {
  const item = store.getById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

app.post('/api/items', (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email) return res.status(400).json({ error: 'name and email are required' });
  const created = store.create({ name, email, message });
  res.status(201).json(created);
});

app.put('/api/items/:id', (req, res) => {
  const updated = store.update(req.params.id, req.body || {});
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

app.delete('/api/items/:id', (req, res) => {
  const ok = store.delete(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
