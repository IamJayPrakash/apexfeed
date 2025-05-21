'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">Something went wrong</h2>
        <p className="text-gray-500 mb-8">We apologize for the inconvenience. Please try again later.</p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <Link 
            href="/"
            className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
} 