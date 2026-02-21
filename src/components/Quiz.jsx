import React, { useState } from 'react';

function Quiz({ questions, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [animating, setAnimating] = useState(false);

  const currentQ = questions[currentIndex];
  // 진행도는 완료된 문항 수 기준
  const progress = (currentIndex / questions.length) * 100;

  const handleOptionClick = (selectedIndex) => {
    if (animating) return;
    setAnimating(true);

    const isCorrect = selectedIndex === currentQ.answer;
    let newScore = score;
    let newWrong = [...wrongAnswers];

    if (isCorrect) {
      newScore += 1;
    } else {
      newWrong.push({
        question: currentQ.question,
        userAnswer: currentQ.options[selectedIndex],
        correctAnswer: currentQ.options[currentQ.answer],
        explanation: currentQ.explanation
      });
    }

    setScore(newScore);
    setWrongAnswers(newWrong);

    setTimeout(() => {
      setAnimating(false);
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(curr => curr + 1);
      } else {
        onComplete(newScore, newWrong);
      }
    }, 400); // 사용자 피드백을 위한 지연 시간
  };

  return (
    <main className="p-6 pt-12 flex flex-col min-h-screen w-full animate-slide-up">
      {/* 프로그레스 바 */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8 overflow-hidden">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="text-center font-bold text-blue-600 mb-2">
        {currentIndex + 1} / {questions.length}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center mb-12 min-h-[160px]">
        <h2 className="text-2xl font-bold text-gray-800 text-center leading-relaxed break-keep">
          {currentQ.question}
        </h2>
      </div>

      <div className="flex flex-col gap-4 mt-auto pb-8">
        {currentQ.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(idx)}
            className={`w-full py-5 border-2 text-lg font-bold rounded-2xl transition-all ${
              animating ? 'opacity-80 cursor-not-allowed border-gray-200 bg-gray-50 text-gray-500' : 'bg-white border-gray-200 text-gray-800 hover:border-blue-500 hover:bg-blue-50 active:bg-blue-100'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </main>
  );
}

export default Quiz;
