
import React from 'react';
import { GameEvent, GameOption } from '../types';

interface EventPanelProps {
  event: GameEvent;
  onChoice: (option: GameOption, event: GameEvent) => void;
  currentIndex: number;
  total: number;
}

const EventPanel: React.FC<EventPanelProps> = ({ event, onChoice, currentIndex, total }) => {
  return (
    <div className="bg-white border-4 border-stone-800 shadow-[20px_20px_0px_0px_rgba(28,25,23,0.1)] relative overflow-hidden">
      {/* Decorative Stamp */}
      <div className="absolute -top-4 -right-4 w-24 h-24 border-4 border-red-900 opacity-20 rotate-12 flex items-center justify-center text-red-900 font-bold p-2 text-xs">
        大明兵部
      </div>

      <div className="p-8">
        <div className="flex justify-between items-baseline mb-4 border-b border-stone-200 pb-2">
          <span className="text-stone-500 font-serif">{event.year} · {event.month}</span>
          <span className="bg-stone-800 text-stone-100 px-2 py-0.5 text-xs font-bold uppercase">
            {event.type}
          </span>
        </div>

        <h2 className="text-3xl font-calligraphy text-stone-800 mb-6 flex items-center gap-4">
          <span className="text-red-900">第 {event.id} 回</span>
          {event.name}
        </h2>

        <div className="mb-8 prose prose-stone max-w-none">
          <p className="text-stone-700 leading-relaxed first-letter:text-4xl first-letter:font-calligraphy first-letter:float-left first-letter:mr-2 first-letter:text-red-900">
            {event.background}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-stone-400 uppercase text-xs tracking-widest mb-2 italic">—— 决策 ——</h3>
          {event.options.map((option) => (
            <button
              key={option.id}
              onClick={() => onChoice(option, event)}
              className="w-full text-left group bg-stone-50 border border-stone-200 p-4 hover:border-red-900 hover:bg-stone-100 transition-all relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-red-900 transition-all" />
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-stone-300 flex items-center justify-center font-bold text-stone-400 group-hover:text-red-900 group-hover:border-red-900 transition-colors">
                  {option.id}
                </span>
                <div className="flex-grow">
                  <h4 className="font-bold text-stone-800 mb-1 group-hover:text-red-900">{option.name}</h4>
                  <p className="text-sm text-stone-600 mb-2 leading-tight">{option.description}</p>
                  <p className="text-xs text-stone-400 font-serif italic border-t border-stone-200 pt-1 group-hover:text-stone-500">
                    影响：{option.impact}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-stone-800 text-stone-400 px-8 py-2 text-[10px] tracking-widest uppercase flex justify-between items-center">
        <span>历史之轮滚动中...</span>
        <span>进度: {currentIndex + 1} / {total}</span>
      </div>
    </div>
  );
};

export default EventPanel;
