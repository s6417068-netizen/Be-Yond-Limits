
import React, { useState, useEffect } from 'react';
import { Student, Station, AppStep } from './types';
import { INITIAL_STATIONS } from './constants';
import Layout from './components/Layout';
import Registration from './components/Registration';
import ActivityTracker from './components/ActivityTracker';
import Summary from './components/Summary';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('registration');
  const [student, setStudent] = useState<Student | null>(null);
  const [stations, setStations] = useState<Station[]>(INITIAL_STATIONS);

  useEffect(() => {
    const saved = localStorage.getItem('school_activity_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setStudent(parsed.student);
        setStations(parsed.stations);
        setStep(parsed.step);
      } catch (e) {
        console.error("Failed to load state", e);
      }
    }
  }, []);

  useEffect(() => {
    if (student) {
      localStorage.setItem('school_activity_data', JSON.stringify({ student, stations, step }));
    }
  }, [student, stations, step]);

  const handleRegister = (newStudent: Student) => {
    setStudent(newStudent);
    // Deep clone INITIAL_STATIONS to ensure a fresh start
    setStations(JSON.parse(JSON.stringify(INITIAL_STATIONS)));
    setStep('activity');
  };

  const updateScore = (stationId: number, gameId: number, score: number) => {
    setStations(prev => prev.map(station => {
      if (station.id === stationId) {
        return {
          ...station,
          games: station.games.map(game => {
            if (game.gameId === gameId) {
              return { ...game, score, completed: true };
            }
            return game;
          })
        };
      }
      return station;
    }));
  };

  const handleFinish = () => {
    setStep('summary');
  };

  const handleReset = () => {
    // If we are already at summary, don't ask for confirmation as it's the expected next step
    const shouldConfirm = step !== 'summary';
    
    if (!shouldConfirm || confirm('คุณต้องการลงทะเบียนนักเรียนคนใหม่ใช่หรือไม่? คะแนนเดิมจะถูกล้างออก')) {
      setStudent(null);
      setStations(JSON.parse(JSON.stringify(INITIAL_STATIONS)));
      setStep('registration');
      localStorage.removeItem('school_activity_data');
    }
  };

  const getTitle = () => {
    switch(step) {
      case 'registration': return 'ระบบลงทะเบียนกิจกรรม';
      case 'activity': return 'สะสมคะแนนกิจกรรม';
      case 'summary': return 'ผลคะแนนกิจกรรม';
      default: return 'กิจกรรมโรงเรียน';
    }
  };

  return (
    <Layout 
      title={getTitle()} 
      showReset={step !== 'registration'} 
      onReset={handleReset}
    >
      {step === 'registration' && (
        <Registration onRegister={handleRegister} />
      )}
      
      {step === 'activity' && student && (
        <ActivityTracker 
          student={student} 
          stations={stations} 
          onUpdateScore={updateScore}
          onFinish={handleFinish}
        />
      )}

      {step === 'summary' && student && (
        <Summary 
          student={student} 
          stations={stations} 
          onReset={handleReset}
        />
      )}
    </Layout>
  );
};

export default App;
