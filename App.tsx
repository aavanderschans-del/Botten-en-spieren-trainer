import React, { useState } from 'react';
import { HomeView } from './components/HomeView';
import { QuizView } from './components/QuizView';
import { ResultView } from './components/ResultView';
import { AppView, Category } from './types';

function App() {
  const [view, setView] = useState<AppView>('home');
  const [category, setCategory] = useState<Category>('bones');
  const [quizResult, setQuizResult] = useState({ score: 0, total: 0 });

  const startQuiz = (selectedCategory: Category) => {
    setCategory(selectedCategory);
    setView('quiz');
  };

  const finishQuiz = (score: number, total: number) => {
    setQuizResult({ score, total });
    setView('result');
  };

  const goHome = () => {
    setView('home');
  };

  const restartQuiz = () => {
    setView('quiz');
  };

  return (
    <main className="antialiased text-slate-900 bg-slate-50 min-h-screen">
      {view === 'home' && (
        <HomeView onStart={startQuiz} />
      )}
      
      {view === 'quiz' && (
        <QuizView 
          category={category} 
          onFinish={finishQuiz} 
        />
      )}
      
      {view === 'result' && (
        <ResultView 
          score={quizResult.score} 
          total={quizResult.total} 
          category={category}
          onRestart={restartQuiz}
          onHome={goHome}
        />
      )}
    </main>
  );
}

export default App;