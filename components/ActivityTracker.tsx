
import React, { useState } from 'react';
import { Station, Student } from '../types';

interface ActivityTrackerProps {
  student: Student;
  stations: Station[];
  onUpdateScore: (stationId: number, gameId: number, score: number) => void;
  onFinish: () => void;
}

const ActivityTracker: React.FC<ActivityTrackerProps> = ({ student, stations, onUpdateScore, onFinish }) => {
  const [activeStationId, setActiveStationId] = useState<number>(1);
  const [tempScores, setTempScores] = useState<Record<number, number>>({});

  const handleScoreChange = (gameId: number, val: string) => {
    const score = Math.min(10, Math.max(0, parseInt(val) || 0));
    setTempScores(prev => ({ ...prev, [gameId]: score }));
  };

  const handleSaveScore = (stationId: number, gameId: number) => {
    const score = tempScores[gameId] || 0;
    onUpdateScore(stationId, gameId, score);
  };

  const activeStation = stations.find(s => s.id === activeStationId);
  const totalCompleted = stations.reduce((acc, s) => acc + s.games.filter(g => g.completed).length, 0);
  const isAllDone = totalCompleted === 16;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Student Info Bar */}
      <div className="bg-red-600 text-white p-4 rounded-xl flex justify-between items-center shadow-md">
        <div>
          <p className="text-sm opacity-80">ผู้เข้าร่วม</p>
          <p className="font-bold text-lg">{student.name} ({student.class})</p>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-80">ความสำเร็จ</p>
          <p className="font-bold text-lg">{totalCompleted} / 16 เกม</p>
        </div>
      </div>

      {/* Station Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2 custom-scrollbar">
        {stations.map(station => (
          <button
            key={station.id}
            onClick={() => setActiveStationId(station.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
              activeStationId === station.id
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white text-red-600 border border-red-200 hover:bg-red-50'
            }`}
          >
            {station.name.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Station Content */}
      {activeStation && (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-red-100 px-6 py-4 border-b border-red-200">
            <h3 className="text-xl font-bold text-red-800">{activeStation.name}</h3>
          </div>
          <div className="p-6 space-y-6">
            {activeStation.games.map((game, idx) => (
              <div key={game.gameId} className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                <div>
                  <h4 className="font-bold text-red-900">เกมที่ {idx + 1}</h4>
                  <p className="text-sm text-gray-500">
                    {game.completed ? `บันทึกคะแนนแล้ว: ${game.score} แต้ม` : 'กรอกคะแนน (0-10)'}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  {!game.completed ? (
                    <>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        className="w-16 px-2 py-2 text-center rounded-lg border-2 border-red-200 focus:border-red-500 focus:outline-none"
                        value={tempScores[game.gameId] ?? ''}
                        onChange={(e) => handleScoreChange(game.gameId, e.target.value)}
                        placeholder="0"
                      />
                      <button
                        onClick={() => handleSaveScore(activeStation.id, game.gameId)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-sm"
                      >
                        บันทึก
                      </button>
                    </>
                  ) : (
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {game.score}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completion Button */}
      {isAllDone && (
        <button
          onClick={onFinish}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5 rounded-2xl shadow-xl transform hover:scale-105 transition-all text-xl mt-8 animate-bounce"
        >
          🎉 สรุปผลคะแนนทั้งหมด
        </button>
      )}
      
      {!isAllDone && (
        <div className="text-center text-gray-400 text-sm mt-4 italic">
          * คุณต้องสะสมคะแนนให้ครบทุกเกมเพื่อดูหน้าสรุปผล
        </div>
      )}
    </div>
  );
};

export default ActivityTracker;
