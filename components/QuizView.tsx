import React, { useState, useEffect, useCallback } from 'react';
import { Category, Term, QuestionState } from '../types';
import { BONES, MUSCLES } from '../constants';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface QuizViewProps {
  category: Category;
  onFinish: (score: number, total: number) => void;
}

const TOTAL_QUESTIONS = 10;

export const QuizView: React.FC<QuizViewProps> = ({ category, onFinish }) => {
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  // Initialize Quiz
  useEffect(() => {
    const sourceData = category === 'bones' ? BONES : MUSCLES;
    
    // Shuffle all available terms
    const shuffledTerms = [...sourceData].sort(() => 0.5 - Math.random());
    
    // Take only the needed amount (or less if not enough data)
    const selectedTerms = shuffledTerms.slice(0, Math.min(TOTAL_QUESTIONS, sourceData.length));

    // Generate questions
    const generatedQuestions: QuestionState[] = selectedTerms.map((term) => {
      // Create distractors
      const otherTerms = sourceData.filter(t => t.latin !== term.latin);
      const shuffledDistractors = [...otherTerms].sort(() => 0.5 - Math.random());
      const selectedDistractors = shuffledDistractors.slice(0, 3).map(t => t.dutch);
      
      const options = [...selectedDistractors, term.dutch].sort(() => 0.5 - Math.random());

      return {
        term,
        options,
        correctAnswer: term.dutch
      };
    });

    setQuestions(generatedQuestions);
    setScore(0);
    setCurrentIdx(0);
    setIsAnswered(false);
    setSelectedOption(null);
  }, [category]);

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    if (option === questions[currentIdx].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = useCallback(() => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setIsAnswered(false);
      setSelectedOption(null);
    } else {
      onFinish(score, questions.length);
    }
  }, [currentIdx, questions.length, onFinish, score]);

  if (questions.length === 0) return <div className="p-10 text-center">Laden...</div>;

  const currentQuestion = questions[currentIdx];
  const progressPercent = ((currentIdx) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center pt-10 px-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-2.5 mb-6">
          <div 
            className={`h-2.5 rounded-full transition-all duration-300 ${category === 'bones' ? 'bg-slate-600' : 'bg-muscle-500'}`} 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className={`p-8 text-center ${category === 'bones' ? 'bg-slate-800' : 'bg-red-800'}`}>
            <span className="uppercase tracking-widest text-xs font-bold text-white/60 mb-2 block">
              Vraag {currentIdx + 1} van {questions.length}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
              {currentQuestion.term.latin}
            </h2>
            <p className="text-white/80">Wat is de Nederlandse vertaling?</p>
          </div>

          <div className="p-6 grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option, idx) => {
              let btnClass = "w-full p-4 text-left text-lg font-medium rounded-xl border-2 transition-all ";
              
              if (isAnswered) {
                if (option === currentQuestion.correctAnswer) {
                  // Correct answer always green
                  btnClass += "bg-green-50 border-green-500 text-green-800";
                } else if (option === selectedOption && option !== currentQuestion.correctAnswer) {
                  // Wrong selection red
                  btnClass += "bg-red-50 border-red-500 text-red-800";
                } else {
                  // Others grayed out
                  btnClass += "bg-slate-50 border-slate-100 text-slate-400 opacity-50";
                }
              } else {
                // Default state
                btnClass += "bg-white border-slate-200 text-slate-700 hover:border-blue-400 hover:bg-slate-50 cursor-pointer shadow-sm";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  disabled={isAnswered}
                  className={btnClass}
                >
                  <div className="flex justify-between items-center">
                    <span>{option}</span>
                    {isAnswered && option === currentQuestion.correctAnswer && (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    )}
                    {isAnswered && option === selectedOption && option !== currentQuestion.correctAnswer && (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer Action */}
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-all ${
                isAnswered 
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-md translate-y-0' 
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              {currentIdx + 1 === questions.length ? 'Afronden' : 'Volgende'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};