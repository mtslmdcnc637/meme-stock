export interface Meme {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  change24h: number;
  volume: number;
  trending: boolean;
}

export interface User {
  id: number;
  name: string;
  avatar: string;
  balance: number;
  portfolio: {
    memeId: number;
    quantity: number;
  }[];
}

export interface LeaderboardEntry {
  position: number;
  username: string;
  totalValue: number;
  badge?: string;
}