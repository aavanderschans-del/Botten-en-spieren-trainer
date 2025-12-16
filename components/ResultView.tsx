import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Home, RefreshCcw } from 'lucide-react';
import { Category } from '../types';

interface ResultViewProps {
  score: number;
  total: number;
  category: Category;
  onRestart: () => void;
  onHome: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ score, total, category, onRestart, onHome }) => {
  const percentage = Math.round((score / total) * 100);
  
  const data = [
    { name: 'Correct', value: score },
    { name: 'Incorrect', value: total - score },
  ];

  const colorMain = category === 'bones' ? '#4b5563' : '#ef4444'; // Slate-600 vs Red-500
  const colorBg = '#e2e8f0';

  // Nieuwe logica: 8 of hoger is behaald
  const isPassed = score >= 8;
  const message = isPassed ? "Behaald!" : "Helaas, nog even oefenen";
  const messageColorClass = isPassed ? "text-green-600" : "text-red-600";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border border-slate-100">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Resultaat</h2>
        <p className="text-slate-500 mb-8">
            Je hebt de <span className="font-semibold">{category === 'bones' ? 'botten' : 'spieren'}</span> quiz afgerond.
        </p>

        <div className="h-64 w-full mb-6 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                <Cell key="correct" fill={colorMain} />
                <Cell key="incorrect" fill={colorBg} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-4xl font-extrabold text-slate-800">{score}/{total}</span>
            <span className="text-sm text-slate-400 font-medium">punten</span>
          </div>
        </div>

        <div className="mb-8">
            <h3 className={`text-2xl font-bold ${messageColorClass}`}>{message}</h3>
            <p className="text-slate-500 mt-1">Je score is {percentage}%</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onRestart}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 ${
                category === 'bones' ? 'bg-slate-700 hover:bg-slate-800' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            <RefreshCcw className="w-5 h-5" />
            Opnieuw Spelen
          </button>
          
          <button
            onClick={onHome}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Terug naar Home
          </button>
        </div>
      </div>
    </div>
  );
};