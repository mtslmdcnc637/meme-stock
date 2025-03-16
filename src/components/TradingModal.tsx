import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Meme } from '../types';

interface TradingModalProps {
  meme: Meme;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
  type: 'buy' | 'sell';
  maxQuantity?: number;
}

export function TradingModal({ meme, isOpen, onClose, onConfirm, type, maxQuantity }: TradingModalProps) {
  const [quantity, setQuantity] = useState(1);
  const totalCost = quantity * meme.price;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            {type === 'buy' ? 'Buy' : 'Sell'} {meme.title}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              max={maxQuantity}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between">
              <span>Price per unit:</span>
              <span>${meme.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Total:</span>
              <span>${totalCost.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => onConfirm(quantity)}
            className={`w-full py-3 rounded-lg text-white font-medium ${
              type === 'buy' 
                ? 'bg-[#00C637] hover:bg-opacity-90' 
                : 'bg-red-600 hover:bg-opacity-90'
            }`}
          >
            Confirm {type === 'buy' ? 'Purchase' : 'Sale'}
          </button>
        </div>
      </div>
    </div>
  );
}