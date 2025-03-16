import React from 'react';
import { TrendingUp, Flame } from 'lucide-react';
import type { Meme } from '../types';

interface MemeCardProps {
  meme: Meme;
  onBuy: (meme: Meme) => void;
  onSell: (meme: Meme) => void;
}

export function MemeCard({ meme, onBuy, onSell }: MemeCardProps) {
  const isPositiveChange = meme.change24h >= 0;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img
        src={meme.imageUrl}
        alt={meme.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{meme.title}</h3>
          {meme.trending && (
            <Flame className="h-5 w-5 text-orange-500" />
          )}
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">${meme.price.toFixed(2)}</p>
            <p className={`flex items-center ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className={`h-4 w-4 ${isPositiveChange ? '' : 'transform rotate-180'}`} />
              <span className="ml-1">{meme.change24h.toFixed(2)}%</span>
            </p>
          </div>
          
          <div className="space-x-2">
            <button
              onClick={() => onSell(meme)}
              className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
            >
              Sell
            </button>
            <button
              onClick={() => onBuy(meme)}
              className="px-4 py-2 bg-[#00C637] text-white rounded-lg hover:bg-opacity-90"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}