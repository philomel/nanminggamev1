
import React, { useState, useEffect, useCallback } from 'react';
import { GameStats, GameEvent, GameOption } from './types';
import { EVENTS } from './constants';
import StatBar from './components/StatBar';
import EventPanel from './components/EventPanel';
import HistoryLog from './components/HistoryLog';

const INITIAL_STATS: GameStats = {
  prestige: 50,
  loyalEunuch: 40,
  loyalDonglin: 60,
  military: 20000,
  money: 100000,
  warlordLoyalty: 50,
  shiKefaLoyalty: 70
};

const App: React.FC = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState<number>(0);
  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);
  const [history, setHistory] = useState<{ eventName: string; choiceName: string; impact: string }[]>([]);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(10);
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  const handleChoice = useCallback((option: GameOption, event: GameEvent) => {
    // Apply stats changes
    setStats(prev => {
      const newStats = { ...prev };
      Object.keys(option.statsChange).forEach(key => {
        const k = key as keyof GameStats;
        newStats[k] += option.statsChange[k] || 0;
      });
      return newStats;
    });

    // Add to history
    setHistory(prev => [...prev, {
      eventName: event.name,
      choiceName: option.name,
      impact: option.impact
    }]);

    // Check if more events
    if (currentEventIndex < EVENTS.length - 1) {
      setIsWaiting(true);
      setTimer(10);
    } else {
      setGameEnded(true);
    }
  }, [currentEventIndex]);

  useEffect(() => {
    let interval: any;
    if (isWaiting && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    } else if (isWaiting && timer === 0) {
      setIsWaiting(false);
      setCurrentEventIndex(prev => prev + 1);
    }
    return () => clearInterval(interval);
  }, [isWaiting, timer]);

  if (gameEnded) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-stone-100 border-4 border-stone-800 p-8 shadow-2xl relative">
          <h1 className="text-4xl font-calligraphy text-center mb-6 text-red-900 border-b-2 border-red-900 pb-4">
            历史的终章
          </h1>
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-stone-700 italic">
              在1644年那场动荡的风暴中，您的抉择塑造了这片土地短暂的命运。
              南明弘光一朝的结局已定，而大明的香火能否延续，唯有后世史书评说。
            </p>
            <div className="bg-white p-4 border border-stone-300 rounded shadow-inner">
              <h3 className="font-bold mb-2">最终政局预览：</h3>
              <StatBar stats={stats} />
            </div>
            <h3 className="font-bold text-xl mt-6 border-l-4 border-red-900 pl-2">您的行迹：</h3>
            <div className="space-y-4 overflow-y-auto max-h-60 pr-2">
              {history.map((h, i) => (
                <div key={i} className="border-b border-stone-200 pb-2">
                  <p className="text-stone-500 text-sm">{h.eventName}</p>
                  <p className="font-bold text-stone-800">{h.choiceName}</p>
                </div>
              ))}
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="w-full mt-6 bg-stone-800 text-stone-100 py-3 font-bold hover:bg-stone-700 transition"
            >
              重回甲申年
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4">
      <header className="w-full max-w-4xl text-center mb-8 relative">
        <h1 className="text-5xl font-calligraphy text-red-900 tracking-widest drop-shadow-sm">
          明末风云：弘光纪元
        </h1>
        <p className="text-stone-500 mt-2 font-serif">大明宏图，系于卿之一念</p>
      </header>

      <main className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
        <div className="lg:col-span-3 space-y-6">
          <StatBar stats={stats} />
          
          {isWaiting ? (
            <div className="bg-stone-100 border-2 border-stone-800 h-[500px] flex flex-col items-center justify-center p-8 space-y-4 animate-pulse">
              <div className="text-6xl font-calligraphy text-stone-400">岁月更迭</div>
              <p className="text-stone-500">时局变幻中... 剩余 {timer} 秒</p>
              <div className="w-full bg-stone-200 h-1 max-w-xs">
                <div 
                  className="bg-stone-800 h-full transition-all duration-1000" 
                  style={{ width: `${(timer / 10) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            <EventPanel 
              event={EVENTS[currentEventIndex]} 
              onChoice={handleChoice} 
              currentIndex={currentEventIndex}
              total={EVENTS.length}
            />
          )}
        </div>

        <aside className="lg:col-span-1 hidden lg:block">
          <HistoryLog history={history} />
        </aside>
      </main>

      <footer className="mt-12 text-stone-400 text-sm border-t border-stone-300 pt-4 w-full max-w-4xl text-center">
        &copy; 崇祯十七年 - 弘光元年 历史策略引擎
      </footer>
    </div>
  );
};

export default App;
