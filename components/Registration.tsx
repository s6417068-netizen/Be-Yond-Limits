
import React, { useState } from 'react';
import { Student } from '../types';

interface RegistrationProps {
  onRegister: (student: Student) => void;
}

const Registration: React.FC<RegistrationProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState<Student>({
    name: '',
    studentId: '',
    class: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.studentId && formData.class) {
      onRegister(formData);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-8 rounded-2xl shadow-xl border-t-8 border-red-600">
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">ลงทะเบียนเข้ากิจกรรม</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">ชื่อ-นามสกุล</label>
            <input
              required
              type="text"
              className="w-full px-4 py-3 rounded-lg border-2 border-red-100 focus:border-red-500 focus:outline-none transition-colors"
              placeholder="นาย สมชาย ใจดี"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">เลขประจำตัวนักเรียน</label>
            <input
              required
              type="text"
              className="w-full px-4 py-3 rounded-lg border-2 border-red-100 focus:border-red-500 focus:outline-none transition-colors"
              placeholder="12345"
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">ชั้นเรียน</label>
            <select
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-red-100 focus:border-red-500 focus:outline-none transition-colors bg-white"
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            >
              <option value="">เลือกชั้นเรียน</option>
              <option value="ม.1">มัธยมศึกษาปีที่ 1</option>
              <option value="ม.2">มัธยมศึกษาปีที่ 2</option>
              <option value="ม.3">มัธยมศึกษาปีที่ 3</option>
              <option value="ม.4">มัธยมศึกษาปีที่ 4</option>
              <option value="ม.5">มัธยมศึกษาปีที่ 5</option>
              <option value="ม.6">มัธยมศึกษาปีที่ 6</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all"
          >
            เริ่มสะสมคะแนน
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
