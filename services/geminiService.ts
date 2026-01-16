
import { GoogleGenAI } from "@google/genai";

export const getAIFeedback = async (totalScore: number, studentName: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `นักเรียนชื่อ ${studentName} ได้คะแนนรวมทั้งสิ้น ${totalScore} จากคะแนนเต็ม 160 คะแนน (ฐานละ 40 คะแนน) ช่วยเขียนคำชมหรือคำแนะนำที่ให้กำลังใจเป็นภาษาไทยให้หน่อย สั้นๆ 2-3 ประโยค ให้ดูสดใสและเข้ากับบรรยากาศกิจกรรมโรงเรียน โดยใช้สีหน้ายิ้มแย้ม`,
    });
    return response.text;
  } catch (error) {
    console.error("AI Feedback Error:", error);
    return "เก่งมากเลยจ๊ะ! ขอให้สนุกกับกิจกรรมต่อไปนะ";
  }
};
