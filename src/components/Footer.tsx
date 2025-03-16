import React from 'react';
import { BarChart2 } from 'lucide-react';

interface FooterProps {
  totalMemes: number;
  dailyVolume: number;
}

export function Footer({ totalMemes, dailyVolume }: FooterProps) {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BarChart2 className="h-5 w-5 text-[#2D3192]" />
              <h3 className="font-semibold">Market Statistics</h3>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Total Memes Listed: {totalMemes}</p>
              <p className="text-gray-600">Volume Today: ${dailyVolume.toLocaleString()}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="/" className="block text-gray-600 hover:text-gray-900">Home</a>
              <a href="/leaderboard" className="block text-gray-600 hover:text-gray-900">Leaderboard</a>
              <a href="/upload" className="block text-gray-600 hover:text-gray-900">Upload Meme</a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <div className="space-y-2">
              <a href="/about" className="block text-gray-600 hover:text-gray-900">About Us</a>
              <a href="/terms" className="block text-gray-600 hover:text-gray-900">Terms of Use</a>
              <a href="/contact" className="block text-gray-600 hover:text-gray-900">Contact</a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} MemeStock. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}