const fs = require('fs');
const path = require('path');

class DataStore {
  constructor(filepath) {
    this.file = filepath;
    this._ensure();
    this._load();
  }

  _ensure() {
    const dir = path.dirname(this.file);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(this.file)) {
      fs.writeFileSync(this.file, JSON.stringify({ items: [] }, null, 2), 'utf8');
    }
  }

  _load() {
    try {
      const raw = fs.readFileSync(this.file, 'utf8');
      this.db = JSON.parse(raw);
      if (!this.db.items) this.db.items = [];
    } catch (e) {
      this.db = { items: [] };
    }
  }

  _save() {
    fs.writeFileSync(this.file, JSON.stringify(this.db, null, 2), 'utf8');
  }

  _id() {
    return Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-6);
  }

  getAll() {
    // return newest first
    return [...this.db.items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getById(id) {
    return this.db.items.find((i) => i.id === id);
  }

  create(partial) {
    const now = new Date().toISOString();
    const item = {
      id: this._id(),
      name: String(partial.name || '').trim(),
      email: String(partial.email || '').trim(),
      message: String(partial.message || '').trim(),
      createdAt: now,
      updatedAt: now,
    };
    this.db.items.push(item);
    this._save();
    return item;
  }

  update(id, updates) {
    const idx = this.db.items.findIndex((i) => i.id === id);
    if (idx === -1) return null;
    const now = new Date().toISOString();
    const current = this.db.items[idx];
    const next = {
      ...current,
      ...updates,
      updatedAt: now,
      id: current.id,
      createdAt: current.createdAt,
    };
    this.db.items[idx] = next;
    this._save();
    return next;
  }

  delete(id) {
    const before = this.db.items.length;
    this.db.items = this.db.items.filter((i) => i.id !== id);
    const after = this.db.items.length;
    if (after !== before) this._save();
    return after !== before;
  }
}

module.exports = DataStore;
