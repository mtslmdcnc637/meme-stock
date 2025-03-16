import React from 'react';
import { TrendingUp, Upload, Trophy, User } from 'lucide-react';

interface HeaderProps {
  balance: number;
  username: string;
}

export function Header({ balance, username }: HeaderProps) {
  return (
    <header className="bg-[#2D3192] text-white py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-8 w-8" />
          <span className="text-2xl font-bold">MemeStock</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="flex items-center space-x-2 hover:text-gray-200">
            <TrendingUp className="h-5 w-5" />
            <span>Home</span>
          </a>
          <a href="/leaderboard" className="flex items-center space-x-2 hover:text-gray-200">
            <Trophy className="h-5 w-5" />
            <span>Leaderboard</span>
          </a>
          <button className="flex items-center space-x-2 bg-[#00C637] px-4 py-2 rounded-lg hover:bg-opacity-90">
            <Upload className="h-5 w-5" />
            <span>Upload Meme</span>
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm opacity-80">Balance</p>
            <p className="font-bold">${balance.toLocaleString()}</p>
          </div>
          <div className="flex items-center space-x-2">
            <User className="h-8 w-8 p-1 bg-white/10 rounded-full" />
            <span className="font-medium">{username}</span>
          </div>
        </div>
      </div>
    </header>
  );
}