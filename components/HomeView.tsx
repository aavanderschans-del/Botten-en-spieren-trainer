import React from 'react';
import { AnatomyCharacter } from './AnatomyCharacter';
import { Category } from '../types';
import { Bone, Activity } from 'lucide-react';

interface HomeViewProps {
  onStart: (category: Category) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-slate-50 to-slate-200">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-2">
          Botten en Spieren <span className="text-deltion-red">Trainer</span>
        </h1>
      </header>

      <div className="relative w-full max-w-md flex flex-col items-center">
        {/* Character Illustration */}
        <div className="w-64 h-96 mb-10 drop-shadow-2xl filter hover:scale-105 transition-transform duration-500">
          <AnatomyCharacter className="w-full h-full" />
        </div>

        {/* Action Buttons */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => onStart('bones')}
            className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-white border-2 border-slate-200 shadow-lg hover:border-deltion-orange hover:shadow-xl hover:-translate-y-1 transition-all group"
          >
            <div className="bg-slate-100 p-3 rounded-full group-hover:bg-orange-100 transition-colors">
              <Bone className="w-8 h-8 text-slate-700 group-hover:text-deltion-orange" />
            </div>
            <div className="text-left">
              <span className="block text-xl font-bold text-slate-800">Botten</span>
              <span className="text-sm text-slate-500">13 Termen</span>
            </div>
          </button>

          <button
            onClick={() => onStart('muscles')}
            className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-white border-2 border-red-100 shadow-lg hover:border-deltion-red hover:shadow-xl hover:-translate-y-1 transition-all group"
          >
            <div className="bg-red-50 p-3 rounded-full group-hover:bg-red-100 transition-colors">
              <Activity className="w-8 h-8 text-deltion-red" />
            </div>
            <div className="text-left">
              <span className="block text-xl font-bold text-slate-800">Spieren</span>
              <span className="text-sm text-slate-500">13 Termen</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};