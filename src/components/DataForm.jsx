import React, { useState } from 'react';

const API_BASE = `${window.location.protocol}//${window.location.hostname}:3000/api`;

export default function DataForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${API_BASE}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to create');
      setForm({ name: '', email: '', message: '' });
      setStatus('success');
      window.dispatchEvent(new CustomEvent('items:refresh'));
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-gray-300 mb-1">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          required
          className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Ada Lovelace"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-300 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          required
          className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="ada@analytics.dev"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-300 mb-1">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          rows={3}
          className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Tell us what data you want to capture..."
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-medium px-4 py-2 transition"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Saving...' : 'Save'}
        </button>
        {status === 'success' && <span className="text-green-400 text-sm">Saved</span>}
        {status === 'error' && <span className="text-red-400 text-sm">Error</span>}
      </div>
    </form>
  );
}
