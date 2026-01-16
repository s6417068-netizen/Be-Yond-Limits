
import React, { useEffect, useState } from 'react';
import { Station, Student } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getAIFeedback } from '../services/geminiService';

interface SummaryProps {
  student: Student;
  stations: Station[];
  onReset: () => void;
}

const Summary: React.FC<SummaryProps> = ({ student, stations, onReset }) => {
  const [aiText, setAiText] = useState<string>("กำลังประมวลผลคำชมจาก AI...");
  const [isLoadingAI, setIsLoadingAI] = useState(true);

  const totalScore = stations.reduce((acc, s) => acc + s.games.reduce((ga, g) => ga + g.score, 0), 0);
  const maxScore = 160;

  const chartData = stations.map(s => ({
    name: s.name.split(':')[0],
    score: s.games.reduce((ga, g) => ga + g.score, 0)
  }));

  useEffect(() => {
    const fetchAI = async () => {
      const feedback = await getAIFeedback(totalScore, student.name);
      setAiText(feedback || "ยอดเยี่ยมมาก!");
      setIsLoadingAI(false);
    };
    fetchAI();
  }, [totalScore, student.name]);

  const COLORS = ['#ef4444', '#dc2626', '#b91c1c', '#991b1b'];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-8 rounded-2xl shadow-2xl border-t-8 border-green-500 text-center relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-50 rounded-full opacity-50"></div>
        
        <div className="mb-4 text-6xl">🏆</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">ยินดีด้วย! {student.name}</h2>
        <p className="text-gray-500 mb-6">บันทึกคะแนนกิจกรรมครบถ้วนแล้ว</p>
        
        <div className="flex justify-center items-baseline space-x-2 mb-8">
          <span className="text-6xl font-black text-red-600">{totalScore}</span>
          <span className="text-2xl text-gray-400">/ {maxScore}</span>
        </div>

        <div className="bg-red-50 p-6 rounded-2xl border border-red-100 relative overflow-hidden text-center">
          <p className="text-red-800 font-medium italic relative z-10 text-lg">
            {aiText}
          </p>
          {isLoadingAI && <div className="mt-4 h-1 bg-red-200 rounded-full animate-pulse w-1/2 mx-auto" />}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          สรุปคะแนนแต่ละฐาน
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fee2e2" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#991b1b', fontSize: 12}} />
              <YAxis domain={[0, 40]} axisLine={false} tickLine={false} tick={{fill: '#991b1b', fontSize: 12}} />
              <Tooltip 
                cursor={{fill: '#fff1f1'}} 
                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
              />
              <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={50}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-2xl shadow-xl transform hover:-translate-y-1 transition-all text-xl"
      >
        ลงทะเบียนนักเรียนคนถัดไป
      </button>
      
      <p className="text-center text-gray-400 text-sm italic">
        * ระบบจะเริ่มล้างคะแนนเดิมเพื่อรับข้อมูลนักเรียนคนใหม่
      </p>
    </div>
  );
};

export default Summary;
