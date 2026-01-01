
import React from 'react';

interface HistoryLogProps {
  history: { eventName: string; choiceName: string; impact: string }[];
}

const HistoryLog: React.FC<HistoryLogProps> = ({ history }) => {
  return (
    <div className="bg-stone-200 border-2 border-stone-300 p-4 h-[650px] flex flex-col shadow-inner">
      <h3 className="font-calligraphy text-2xl text-stone-800 border-b border-stone-400 pb-2 mb-4">
        大政实录
      </h3>
      <div className="flex-grow overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        {history.length === 0 ? (
          <p className="text-stone-400 text-sm italic py-10 text-center">尚无史实记录</p>
        ) : (
          history.map((h, i) => (
            <div key={i} className="bg-white p-3 rounded shadow-sm border border-stone-300 relative">
              <div className="absolute -left-1 top-3 w-2 h-2 bg-stone-400 rotate-45" />
              <h4 className="text-xs font-bold text-red-900 mb-1">{h.eventName}</h4>
              <p className="text-sm text-stone-800 mb-1 font-serif leading-tight">{h.choiceName}</p>
              <p className="text-[10px] text-stone-500 italic">{h.impact}</p>
            </div>
          ))
        )}
      </div>
      <div className="mt-4 pt-2 border-t border-stone-400 text-[10px] text-stone-500 font-serif italic">
        史官记录，字字千钧
      </div>
    </div>
  );
};

export default HistoryLog;
