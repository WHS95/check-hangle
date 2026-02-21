import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

function Result({ score, wrongAnswers, tiers, onRestart }) {
  const resultRef = useRef(null);
  
  // 현재 점수에 맞는 티어 찾기
  const currentTier = tiers.find(t => score >= t.minScore && score <= t.maxScore) || tiers[0];

  const handleDownload = async () => {
    if (!resultRef.current) return;
    try {
      const canvas = await html2canvas(resultRef.current, { scale: 2, useCORS: true });
      const link = document.createElement('a');
      link.download = 'my-spelling-tier.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      alert("이미지 저장에 실패했습니다.");
    }
  };

  const handleKakaoShare = () => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `제 맞춤법 티어는 [${currentTier.name}]입니다! (상위 ${currentTier.topPercent}%)`,
          description: `12문제 중 ${score}문제 정답!\n당신의 맞춤법 티어는 무엇인가요?`,
          imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop', // 배포 후 변경 필요
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '나도 테스트해보기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    } else {
      alert("카카오톡 공유가 초기화되지 않았습니다. (index.html에서 카카오 앱 키를 설정해주세요)");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert('링크가 복사되었습니다! 친구들에게 공유해보세요.'))
      .catch(() => alert('링크 복사에 실패했습니다.'));
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50 pb-12 w-full animate-slide-up">
      {/* 캡처될 영역 */}
      <div 
        ref={resultRef} 
        className="bg-white w-full p-8 pt-12 pb-10 flex flex-col items-center border-b border-gray-100 shadow-sm"
      >
        <p className="text-gray-500 font-bold text-sm mb-2">12문제 중 {score}문제 정답!</p>
        <h1 className="text-3xl font-extrabold text-blue-600 mb-2 break-keep text-center">"{currentTier.name}"</h1>
        <p className="text-lg font-bold text-gray-800 mb-8 bg-blue-50 px-4 py-1.5 rounded-full">
          대한민국 상위 {currentTier.topPercent}% 입니다.
        </p>
        
        <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mb-8 text-6xl shadow-inner border-4 border-white">
          {currentTier.name === '환생한 세종대왕' ? '👑' : 
           currentTier.name === '맞춤법 빌런 감별사' ? '👨‍🏫' :
           currentTier.name === '현대인' ? '🧑‍💼' :
           currentTier.name === '외국인' ? '🥲' : '🐵'}
        </div>

        <p className="text-gray-700 text-center leading-relaxed font-medium break-keep">
          {currentTier.description}
        </p>
      </div>

      {/* 액션 버튼 영역 */}
      <div className="p-6 w-full flex flex-col gap-3 mt-2">
        <button 
          onClick={handleKakaoShare}
          className="w-full py-4 bg-[#FEE500] hover:bg-[#FADA0A] text-[#000000] font-bold rounded-xl text-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
             <path d="M12 3c-5.52 0-10 3.82-10 8.52 0 2.99 1.86 5.64 4.72 7.15l-1.18 4.3c-.09.32.25.59.54.43l5.04-3.35c.29.02.58.03.88.03 5.52 0 10-3.82 10-8.52S17.52 3 12 3z"/>
          </svg>
          카카오톡으로 결과 공유
        </button>
        <div className="flex gap-3">
          <button 
            onClick={handleDownload}
            className="flex-1 py-4 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded-xl transition-colors shadow-sm"
          >
            이미지 저장
          </button>
          <button 
            onClick={handleCopyLink}
            className="flex-1 py-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-bold rounded-xl transition-colors shadow-sm"
          >
            링크 복사
          </button>
        </div>
        
        <button 
          onClick={onRestart}
          className="w-full mt-6 py-4 text-gray-400 font-bold hover:text-gray-600 underline underline-offset-4"
        >
          다시 테스트하기
        </button>
      </div>

      {/* 오답 노트 영역 */}
      {wrongAnswers.length > 0 && (
        <div className="w-full px-6 mt-6">
          <h3 className="text-xl font-extrabold text-gray-800 mb-5 flex items-center gap-2">
            📝 오답 노트 <span className="text-sm font-medium text-red-500 bg-red-50 rounded-full px-2 py-0.5">{wrongAnswers.length}개</span>
          </h3>
          <div className="flex flex-col gap-4">
            {wrongAnswers.map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-400"></div>
                <p className="font-bold text-gray-800 mb-3 text-lg leading-snug">{item.question}</p>
                <div className="flex items-center gap-2 mb-3 text-sm flex-wrap">
                  <span className="text-red-500 font-bold line-through px-2 py-1 bg-red-50 rounded">내 선택: {item.userAnswer}</span>
                  <span className="text-blue-600 font-bold px-2 py-1 bg-blue-50 rounded">정답: {item.correctAnswer}</span>
                </div>
                <p className="text-sm text-gray-600 mt-3 pt-3 border-t border-gray-100">
                  <span className="font-bold">💡 해설:</span> {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default Result;
