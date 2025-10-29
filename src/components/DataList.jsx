import React, { useEffect, useState, useCallback } from 'react';
import { Trash2 } from 'lucide-react';

const API_BASE = `${window.location.protocol}//${window.location.hostname}:3000/api`;

export default function DataList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/items`);
      const data = await res.json();
      setItems(data);
    } catch (e) {
      // ignore in UI
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
    const handler = () => fetchItems();
    window.addEventListener('items:refresh', handler);
    return () => window.removeEventListener('items:refresh', handler);
  }, [fetchItems]);

  const onDelete = async (id) => {
    const ok = confirm('Delete this record?');
    if (!ok) return;
    await fetch(`${API_BASE}/items/${id}`, { method: 'DELETE' });
    fetchItems();
  };

  if (loading) {
    return <div className="text-gray-400">Loading...</div>;
  }

  if (!items.length) {
    return <div className="text-gray-400">No records yet. Add your first record on the left.</div>;
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.id} className="bg-gray-950 border border-gray-800 rounded-lg p-4 flex items-start justify-between">
          <div>
            <div className="font-medium">{item.name} <span className="text-gray-400">• {item.email}</span></div>
            {item.message && <div className="text-gray-300 mt-1 text-sm">{item.message}</div>}
            <div className="text-xs text-gray-500 mt-2">ID: {item.id} • {new Date(item.createdAt).toLocaleString()}</div>
          </div>
          <button
            onClick={() => onDelete(item.id)}
            className="text-red-400 hover:text-red-300 p-2 rounded-md border border-transparent hover:border-red-800/40 transition"
            aria-label="Delete"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </li>
      ))}
    </ul>
  );
}
