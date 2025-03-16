import React from 'react';
import { Trophy } from 'lucide-react';
import type { LeaderboardEntry } from '../types';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Trophy className="h-6 w-6 text-[#2D3192]" />
        <h2 className="text-2xl font-bold">Leaderboard</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b-2 border-gray-100">
              <th className="pb-4 font-semibold">Position</th>
              <th className="pb-4 font-semibold">Trader</th>
              <th className="pb-4 font-semibold text-right">Portfolio Value</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr
                key={entry.position}
                className={`border-b border-gray-50 ${
                  entry.position === 1 ? 'bg-yellow-50' : ''
                }`}
              >
                <td className="py-4">
                  <span className={`font-bold ${
                    entry.position === 1 ? 'text-yellow-600' :
                    entry.position === 2 ? 'text-gray-500' :
                    entry.position === 3 ? 'text-orange-600' : ''
                  }`}>
                    #{entry.position}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-2">
                    <span>{entry.username}</span>
                    {entry.badge && (
                      <span title="Whale Trader">{entry.badge}</span>
                    )}
                  </div>
                </td>
                <td className="py-4 text-right font-medium">
                  ${entry.totalValue.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}