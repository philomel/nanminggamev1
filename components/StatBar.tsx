
import React from 'react';
import { GameStats } from '../types';

interface StatBarProps {
  stats: GameStats;
}

const StatBar: React.FC<StatBarProps> = ({ stats }) => {
  return (
    <div className="bg-stone-800 text-stone-100 p-4 rounded-sm shadow-lg border-b-4 border-red-900 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="flex flex-col">
        <span className="text-stone-400 text-xs uppercase tracking-tighter">朝廷声望</span>
        <span className="text-lg font-bold text-yellow-500">{stats.prestige}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-stone-400 text-xs uppercase tracking-tighter">银两储备</span>
        <span className="text-lg font-bold text-stone-100">{stats.money.toLocaleString()}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-stone-400 text-xs uppercase tracking-tighter">直属军力</span>
        <span className="text-lg font-bold text-red-500">{stats.military.toLocaleString()}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-stone-400 text-xs uppercase tracking-tighter">士大夫忠诚</span>
        <span className="text-lg font-bold text-green-500">{stats.loyalDonglin}</span>
      </div>
    </div>
  );
};

export default StatBar;
