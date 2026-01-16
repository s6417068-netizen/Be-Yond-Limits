
import { Station } from './types';

export const INITIAL_STATIONS: Station[] = [
  {
    id: 1,
    name: 'ฐานที่ 1: วิทย์คณิตแสนสนุก',
    games: [
      { gameId: 1, score: 0, completed: false },
      { gameId: 2, score: 0, completed: false },
      { gameId: 3, score: 0, completed: false },
      { gameId: 4, score: 0, completed: false },
    ]
  },
  {
    id: 2,
    name: 'ฐานที่ 2: อังกฤษสังคมพาเพลิน',
    games: [
      { gameId: 5, score: 0, completed: false },
      { gameId: 6, score: 0, completed: false },
      { gameId: 7, score: 0, completed: false },
      { gameId: 8, score: 0, completed: false },
    ]
  },
  {
    id: 3,
    name: 'ฐานที่ 3: กีฬาฮาเฮ',
    games: [
      { gameId: 9, score: 0, completed: false },
      { gameId: 10, score: 0, completed: false },
      { gameId: 11, score: 0, completed: false },
      { gameId: 12, score: 0, completed: false },
    ]
  },
  {
    id: 4,
    name: 'ฐานที่ 4: ศิลปะสร้างสรรค์',
    games: [
      { gameId: 13, score: 0, completed: false },
      { gameId: 14, score: 0, completed: false },
      { gameId: 15, score: 0, completed: false },
      { gameId: 16, score: 0, completed: false },
    ]
  }
];
