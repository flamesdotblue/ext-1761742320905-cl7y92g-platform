import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero3D from './components/Hero3D.jsx';
import DataForm from './components/DataForm.jsx';
import DataList from './components/DataList.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <Navbar />
      <main className="flex-1">
        <section className="relative h-[70vh] sm:h-[80vh] w-full">
          <Hero3D />
        </section>
        <section className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-2">
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 backdrop-blur">
            <h2 className="text-2xl font-semibold mb-4">Add Record</h2>
            <p className="text-gray-400 mb-6">Submit data to your prototype backend. This writes to a JSON file via a lightweight API.</p>
            <DataForm />
          </div>
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 backdrop-blur">
            <h2 className="text-2xl font-semibold mb-4">Records</h2>
            <p className="text-gray-400 mb-6">Fetched live from the backend API.</p>
            <DataList />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
