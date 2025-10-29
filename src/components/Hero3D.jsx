import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero3D() {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-b-2xl">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/Nhk4dWoYLj83rV44/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/20 to-gray-950"></div>
      <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            Technology-first, data-driven prototype backend
          </h1>
          <p className="mt-4 text-gray-300 text-base sm:text-lg">
            A minimal API and JSON database you can deploy fast. Capture, list, and manage structured data powering your hackathon demo.
          </p>
        </div>
      </div>
    </div>
  );
}
