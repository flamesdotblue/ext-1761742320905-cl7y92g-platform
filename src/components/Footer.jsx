import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800">
      <div className="container mx-auto px-4 py-6 text-sm text-gray-400 flex items-center justify-between">
        <span>© {new Date().getFullYear()} DataVibe Prototype</span>
        <span>Backend: Express + JSON file store</span>
      </div>
    </footer>
  );
}
