export interface Term {
  latin: string;
  dutch: string;
}

export type Category = 'bones' | 'muscles';

export interface QuestionState {
  term: Term;
  options: string[]; // Array of Dutch translations
  correctAnswer: string;
}

export type AppView = 'home' | 'quiz' | 'result';
