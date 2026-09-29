import React, { useState, useEffect, useMemo } from 'react';
import { QUESTIONS_DB, INITIAL_BADGES, Question, Badge } from './data/questions';
import { ClassicQuizView } from './components/ClassicQuizView';
import { TacticalSocView } from './components/TacticalSocView';
import { GameOverScreen } from './components/GameOverScreen';
import { soundEffects, toggleSound, isSoundEnabled } from './utils/sound';
import { Volume2, VolumeX, Shield, RefreshCw, Layout, Eye } from 'lucide-react';

interface AnswerRecord {
  question: Question;
  selectedOption: number;
  isCorrect: boolean;
}

export default function App() {
  const [viewMode, setViewMode] = useState<'tactical' | 'classic'>('tactical');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [infiniteLives, setInfiniteLives] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [soundActive, setSoundActive] = useState<boolean>(true);
  const [badgeToast, setBadgeToast] = useState<{ title: string; icon: string } | null>(null);

  const [gameOver, setGameOver] = useState<boolean>(false);
  const [victory, setVictory] = useState<boolean>(false);
  const [answerHistory, setAnswerHistory] = useState<AnswerRecord[]>([]);

  // Filter and prepare question bank
  const filteredQuestions = useMemo(() => {
    if (selectedTopic === 'all') {
      return [...QUESTIONS_DB];
    }
    return QUESTIONS_DB.filter((q) => q.topic === selectedTopic);
  }, [selectedTopic]);

  const currentQuestion = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Reset or initialize on topic change
  const handleTopicChange = (topic: string) => {
    setSelectedTopic(topic);
    setCurrentIndex(0);
    setScore(0);
    setLives(3);
    setStreak(0);
    setSelectedOption(null);
    setAnswered(false);
    setShowHint(false);
    setGameOver(false);
    setVictory(false);
    setAnswerHistory([]);
    soundEffects.click();
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setLives(3);
    setStreak(0);
    setSelectedOption(null);
    setAnswered(false);
    setShowHint(false);
    setGameOver(false);
    setVictory(false);
    setAnswerHistory([]);
    soundEffects.click();
  };

  // Check and unlock badges
  const checkBadgeUnlocks = (isCorrect: boolean, q: Question, currentStreak: number, remainingLives: number) => {
    setBadges((prev) =>
      prev.map((badge) => {
        if (badge.unlocked) return badge;

        let shouldUnlock = false;

        if (badge.id === 'badge-phishing' && isCorrect && (q.topic === 'ataques' || q.id === 1 || q.id === 8)) {
          shouldUnlock = true;
        } else if (badge.id === 'badge-vault' && isCorrect && (q.topic === 'passwords' || q.id === 2 || q.id === 4)) {
          shouldUnlock = true;
        } else if (badge.id === 'badge-streak' && currentStreak >= 3) {
          shouldUnlock = true;
        } else if (badge.id === 'badge-hunter' && isCorrect && (q.id === 3 || q.id === 9 || q.id === 11)) {
          shouldUnlock = true;
        } else if (badge.id === 'badge-flawless' && currentIndex === filteredQuestions.length - 1 && isCorrect && remainingLives === 3) {
          shouldUnlock = true;
        }

        if (shouldUnlock) {
          soundEffects.badgeUnlock();
          setBadgeToast({ title: badge.title, icon: badge.icon });
          setTimeout(() => setBadgeToast(null), 3500);
          return { ...badge, unlocked: true };
        }
        return badge;
      })
    );
  };

  // Option selection handler
  const handleSelectOption = (index: number) => {
    if (answered || !currentQuestion) return;

    setSelectedOption(index);
    setAnswered(true);

    const isCorrect = index === currentQuestion.correct;
    const newRecord: AnswerRecord = {
      question: currentQuestion,
      selectedOption: index,
      isCorrect,
    };
    setAnswerHistory((prev) => [...prev, newRecord]);

    if (isCorrect) {
      soundEffects.correct();
      const newStreak = streak + 1;
      setStreak(newStreak);
      const points = 100 * (newStreak > 1 ? newStreak : 1);
      setScore((prev) => prev + points);
      checkBadgeUnlocks(true, currentQuestion, newStreak, lives);
    } else {
      soundEffects.wrong();
      soundEffects.shieldLoss();
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 450);
      setStreak(0);

      if (!infiniteLives) {
        const nextLives = lives - 1;
        setLives(nextLives);
        if (nextLives <= 0) {
          setTimeout(() => {
            setVictory(false);
            setGameOver(true);
          }, 850);
          return;
        }
      }
    }
  };

  // Next question handler
  const handleNextQuestion = () => {
    soundEffects.click();
    setShowHint(false);
    setSelectedOption(null);
    setAnswered(false);

    if (currentIndex + 1 >= filteredQuestions.length) {
      soundEffects.victory();
      setVictory(true);
      setGameOver(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const toggleSoundState = () => {
    const state = toggleSound();
    setSoundActive(state);
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 cyber-grid relative selection:bg-emerald-500 selection:text-black">
      {/* Ambient background glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Persistent App Header / Mode Switcher Toolbar */}
      <nav className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              CYBERGUARD // DEFENSE
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#0d1322] border border-slate-700/80 rounded-xl p-1">
              <button
                onClick={() => {
                  soundEffects.click();
                  setViewMode('tactical');
                }}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'tactical'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layout className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Centro Táctico</span>
                <span className="sm:hidden">SOC</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.click();
                  setViewMode('classic');
                }}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'classic'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Modo Clásico</span>
                <span className="sm:hidden">Clásico</span>
              </button>
            </div>

            {/* Practice Mode (Infinite lives) */}
            <button
              onClick={() => {
                soundEffects.click();
                setInfiniteLives(!infiniteLives);
              }}
              title="Alternar modo entrenamiento con escudos infinitos"
              className={`px-2.5 py-1.5 rounded-xl border flex items-center gap-1.5 transition-colors cursor-pointer ${
                infiniteLives
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{infiniteLives ? 'Práctica Activa' : 'Práctica'}</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSoundState}
              title={soundActive ? 'Silenciar sonidos tácticos' : 'Activar efectos de audio'}
              className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              {soundActive ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Quick Restart */}
            <button
              onClick={handleRestart}
              title="Reiniciar cuestionario actual"
              className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {gameOver ? (
          <GameOverScreen
            victory={victory}
            score={score}
            totalQuestions={filteredQuestions.length}
            answerHistory={answerHistory}
            badges={badges}
            onRestart={handleRestart}
            onSelectTopic={handleTopicChange}
          />
        ) : viewMode === 'tactical' ? (
          <TacticalSocView
            currentQuestion={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={filteredQuestions.length}
            selectedTopic={selectedTopic}
            onTopicChange={handleTopicChange}
            lives={lives}
            infiniteLives={infiniteLives}
            score={score}
            streak={streak}
            badges={badges}
            selectedOption={selectedOption}
            answered={answered}
            onSelectOption={handleSelectOption}
            onNextQuestion={handleNextQuestion}
            onShowHint={() => {
              soundEffects.hint();
              setShowHint(!showHint);
            }}
            showHint={showHint}
            isShaking={isShaking}
          />
        ) : (
          <ClassicQuizView
            currentQuestion={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={filteredQuestions.length}
            selectedTopic={selectedTopic}
            onTopicChange={handleTopicChange}
            lives={lives}
            infiniteLives={infiniteLives}
            score={score}
            selectedOption={selectedOption}
            answered={answered}
            onSelectOption={handleSelectOption}
            onNextQuestion={handleNextQuestion}
            onShowHint={() => {
              soundEffects.hint();
              setShowHint(!showHint);
            }}
            showHint={showHint}
            isShaking={isShaking}
          />
        )}

        {/* Footer */}
        <footer className="mt-12 pt-4 pb-6 text-center text-xs font-mono text-slate-600 border-t border-slate-800/50">
          CyberGuard SOC Platform • Aprende seguridad defensiva y buenas prácticas de ciberseguridad
        </footer>
      </div>

      {/* Insignia Desbloqueada Toast Notification */}
      {badgeToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce bg-slate-900 border border-emerald-500/60 rounded-2xl p-4 shadow-2xl glow-border-green flex items-center gap-3">
          <span className="text-3xl">{badgeToast.icon}</span>
          <div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
              ¡Insignia Desbloqueada!
            </span>
            <span className="text-sm font-bold text-white">{badgeToast.title}</span>
          </div>
        </div>
      )}
    </div>
  );
}
