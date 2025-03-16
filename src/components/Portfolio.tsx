import React from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import type { User, Meme } from '../types';

interface PortfolioProps {
  user: User;
  memes: Meme[];
}

export function Portfolio({ user, memes }: PortfolioProps) {
  const calculatePortfolioValue = () => {
    return user.portfolio.reduce((total, holding) => {
      const meme = memes.find(m => m.id === holding.memeId);
      return total + (meme?.price || 0) * holding.quantity;
    }, 0);
  };

  const portfolioValue = calculatePortfolioValue();
  const totalValue = user.balance + portfolioValue;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Wallet className="h-6 w-6 text-[#2D3192]" />
        <h2 className="text-2xl font-bold">My Portfolio</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Available Balance</p>
          <p className="text-2xl font-bold">${user.balance.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Portfolio Value</p>
          <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">My Memes</h3>
        {user.portfolio.map((holding) => {
          const meme = memes.find(m => m.id === holding.memeId);
          if (!meme) return null;

          const value = meme.price * holding.quantity;
          
          return (
            <div key={meme.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={meme.imageUrl}
                  alt={meme.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium">{meme.title}</p>
                  <p className="text-sm text-gray-600">
                    {holding.quantity} units @ ${meme.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${value.toLocaleString()}</p>
                <p className={`text-sm flex items-center justify-end ${
                  meme.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {meme.change24h >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(meme.change24h).toFixed(2)}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}