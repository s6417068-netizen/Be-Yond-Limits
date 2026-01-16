
export interface Student {
  name: string;
  studentId: string;
  class: string;
}

export interface GameScore {
  gameId: number;
  score: number;
  completed: boolean;
}

export interface Station {
  id: number;
  name: string;
  games: GameScore[];
}

export type AppStep = 'registration' | 'activity' | 'summary';

export interface AppState {
  student: Student | null;
  stations: Station[];
  step: AppStep;
}
