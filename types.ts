
export interface GameOption {
  id: string;
  name: string;
  description: string;
  impact: string;
  statsChange: Partial<GameStats>;
}

export interface GameEvent {
  id: string;
  year: string;
  month: string;
  name: string;
  type: string;
  background: string;
  options: GameOption[];
}

export interface GameStats {
  prestige: number;        // 朝廷声望
  loyalEunuch: number;     // 阉党忠诚
  loyalDonglin: number;    // 东林党忠诚
  military: number;        // 朝廷直属军力
  money: number;           // 财政 (两)
  warlordLoyalty: number;  // 军阀忠诚
  shiKefaLoyalty: number;  // 史可法忠诚
}
