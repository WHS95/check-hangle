import React from 'react';

function Landing({ onStart }) {
  return (
    <main className="p-8 flex flex-col items-center justify-center min-h-[80vh] animate-slide-up w-full">
      <div className="text-center mb-10 w-full mt-10">
        <h2 className="text-blue-600 font-bold mb-3 tracking-tight text-lg">과연 나는 몇 등급일까?</h2>
        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
          한국인 90%가<br/>틀린다는 맞춤법,<br/><span className="text-blue-600">당신의 티어는?</span>
        </h1>
      </div>
      
      <div className="bg-gray-50 rounded-2xl p-6 w-full text-center mb-12 border border-gray-100 shadow-sm">
        <p className="text-gray-500 text-sm mb-1 font-medium">현재까지 게임 참여자 수</p>
        <p className="text-3xl font-bold text-gray-800 tracking-tight">
          194,203 <span className="text-base font-normal text-gray-500">명</span>
        </p>
      </div>

      <button 
        onClick={onStart}
        className="w-full py-5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 active:scale-[0.98] text-white font-bold rounded-2xl text-xl transition-all shadow-xl shadow-blue-200"
      >
        테스트 시작하기
      </button>
    </main>
  );
}

export default Landing;
