import React from 'react';
import { Rocket } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-gray-950/70 border-b border-gray-800 backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Rocket className="w-5 h-5 text-cyan-400" />
          <span className="font-semibold tracking-tight">DataVibe Prototype</span>
        </div>
        <nav className="text-sm text-gray-300">
          <a href="#" className="hover:text-white transition">Docs</a>
        </nav>
      </div>
    </header>
  );
}
