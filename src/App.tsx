import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MemeCard } from './components/MemeCard';
import { TradingModal } from './components/TradingModal';
import { Leaderboard } from './components/Leaderboard';
import { Portfolio } from './components/Portfolio';
import { Footer } from './components/Footer';
import type { Meme, User, LeaderboardEntry } from './types';

// Mock data
const mockMemes: Meme[] = [
  {
    id: 1,
    title: "Doge to the Moon",
    imageUrl: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=300",
    price: 25.40,
    change24h: 12.5,
    volume: 150000,
    trending: true
  },
  {
    id: 2,
    title: "Distracted Boyfriend",
    imageUrl: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=300",
    price: 15.75,
    change24h: -5.2,
    volume: 89000,
    trending: false
  },
  {
    id: 3,
    title: "Stonks Guy",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300",
    price: 42.30,
    change24h: 8.7,
    volume: 230000,
    trending: true
  }
];

const mockUser: User = {
  id: 1,
  name: "MemeTrader",
  avatar: "",
  balance: 10000,
  portfolio: [
    { memeId: 1, quantity: 10 },
    { memeId: 3, quantity: 5 }
  ]
};

const mockLeaderboard: LeaderboardEntry[] = [
  { position: 1, username: "MemeKing", totalValue: 45200, badge: "🐋" },
  { position: 2, username: "CryptoLaughs", totalValue: 38750, badge: "🐋" },
  { position: 3, username: "DankTrader", totalValue: 25400 },
  { position: 4, username: "MemeQueen", totalValue: 22100 },
  { position: 5, username: "LaunchpadMcQuack", totalValue: 18900 }
];

function App() {
  const [memes, setMemes] = useState<Meme[]>(mockMemes);
  const [user, setUser] = useState<User>(mockUser);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [tradingType, setTradingType] = useState<'buy' | 'sell'>('buy');
  const [isTradingModalOpen, setIsTradingModalOpen] = useState(false);

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMemes(currentMemes => 
        currentMemes.map(meme => ({
          ...meme,
          price: meme.price * (1 + (Math.random() * 0.2 - 0.1)),
          change24h: -10 + Math.random() * 20
        }))
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleBuy = (meme: Meme) => {
    setSelectedMeme(meme);
    setTradingType('buy');
    setIsTradingModalOpen(true);
  };

  const handleSell = (meme: Meme) => {
    setSelectedMeme(meme);
    setTradingType('sell');
    setIsTradingModalOpen(true);
  };

  const handleTradingConfirm = (quantity: number) => {
    if (!selectedMeme) return;

    const totalCost = selectedMeme.price * quantity;

    if (tradingType === 'buy') {
      if (totalCost <= user.balance) {
        setUser(currentUser => ({
          ...currentUser,
          balance: currentUser.balance - totalCost,
          portfolio: [
            ...currentUser.portfolio.filter(h => h.memeId !== selectedMeme.id),
            {
              memeId: selectedMeme.id,
              quantity: (currentUser.portfolio.find(h => h.memeId === selectedMeme.id)?.quantity || 0) + quantity
            }
          ]
        }));
      }
    } else {
      const holding = user.portfolio.find(h => h.memeId === selectedMeme.id);
      if (holding && holding.quantity >= quantity) {
        setUser(currentUser => ({
          ...currentUser,
          balance: currentUser.balance + totalCost,
          portfolio: currentUser.portfolio.map(h => 
            h.memeId === selectedMeme.id
              ? { ...h, quantity: h.quantity - quantity }
              : h
          ).filter(h => h.quantity > 0)
        }));
      }
    }

    setIsTradingModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header balance={user.balance} username={user.name} />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-6">Trending Memes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {memes.map(meme => (
                  <MemeCard
                    key={meme.id}
                    meme={meme}
                    onBuy={handleBuy}
                    onSell={handleSell}
                  />
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <Portfolio user={user} memes={memes} />
            <Leaderboard entries={mockLeaderboard} />
          </div>
        </div>
      </main>

      <Footer totalMemes={85} dailyVolume={1200000} />

      {selectedMeme && (
        <TradingModal
          meme={selectedMeme}
          isOpen={isTradingModalOpen}
          onClose={() => setIsTradingModalOpen(false)}
          onConfirm={handleTradingConfirm}
          type={tradingType}
          maxQuantity={tradingType === 'sell' 
            ? user.portfolio.find(h => h.memeId === selectedMeme.id)?.quantity 
            : Math.floor(user.balance / selectedMeme.price)
          }
        />
      )}
    </div>
  );
}

export default App;