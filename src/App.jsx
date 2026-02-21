import { useState } from 'react';
import Landing from './components/Landing';
import Quiz from './components/Quiz';
import Result from './components/Result';

import questionsData from './data/questions.json';
import tiersData from './data/tiers.json';

function App() {
  const [step, setStep] = useState('landing'); // 'landing', 'quiz', 'result'
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [currentQuizSet, setCurrentQuizSet] = useState([]);

  // 문제를 무작위로 12개 섞고 뽑아오는 함수
  const getRandomQuestions = (allQuestions, count = 12) => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleStart = () => {
    setScore(0);
    setWrongAnswers([]);
    setCurrentQuizSet(getRandomQuestions(questionsData, 12));
    setStep('quiz');
  };

  const handleComplete = (finalScore, finalWrongAnswers) => {
    setScore(finalScore);
    setWrongAnswers(finalWrongAnswers);
    setStep('result');
  };

  const handleRestart = () => {
    setStep('landing');
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white shadow-2xl relative font-sans sm:border-x border-gray-200">
      {step === 'landing' && <Landing onStart={handleStart} />}
      {step === 'quiz' && <Quiz questions={currentQuizSet} onComplete={handleComplete} />}
      {step === 'result' && (
        <Result 
          score={score} 
          wrongAnswers={wrongAnswers} 
          tiers={tiersData}
          onRestart={handleRestart} 
        />
      )}
    </div>
  );
}

export default App;
