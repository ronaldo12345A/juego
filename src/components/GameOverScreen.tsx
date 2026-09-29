import React, { useState } from 'react';
import { Question, Badge, getRankByScore } from '../data/questions';

interface AnswerRecord {
  question: Question;
  selectedOption: number;
  isCorrect: boolean;
}

interface GameOverScreenProps {
  victory: boolean;
  score: number;
  totalQuestions: number;
  answerHistory: AnswerRecord[];
  badges: Badge[];
  onRestart: () => void;
  onSelectTopic: (topic: string) => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  victory,
  score,
  totalQuestions,
  answerHistory,
  badges,
  onRestart,
  onSelectTopic,
}) => {
  const [showReview, setShowReview] = useState(false);
  const correctCount = answerHistory.filter((a) => a.isCorrect).length;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const rank = getRankByScore(score);

  return (
    <div className="max-w-2xl mx-auto my-8 px-4">
      <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl text-center space-y-6">
        {/* Icon & Title */}
        <div className="text-6xl mx-auto animate-bounce">
          {victory ? (accuracy >= 80 ? '🏆' : '🛡️') : '💥'}
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            {victory ? '¡Misión Cumplida, Operador!' : 'Sistemas Comprometidos'}
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            {victory
              ? 'Has neutralizado las amenazas cibernéticas con éxito demostrando sólidos principios de ciberdefensa y seguridad de la información.'
              : 'Tus escudos defensivos cayeron a cero. Los atacantes lograron vulnerar el perímetro. Revisa los vectores de ataque y vuelve a intentarlo.'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 font-mono text-center">
          <div className="bg-[#080d1a] p-3.5 rounded-2xl border border-slate-800">
            <p className="text-[11px] text-slate-400 uppercase font-semibold">Score</p>
            <p className="text-2xl font-bold text-emerald-400 mt-0.5">{score}</p>
          </div>
          <div className="bg-[#080d1a] p-3.5 rounded-2xl border border-slate-800">
            <p className="text-[11px] text-slate-400 uppercase font-semibold">Precisión</p>
            <p className="text-2xl font-bold text-cyan-400 mt-0.5">{accuracy}%</p>
          </div>
          <div className="bg-[#080d1a] p-3.5 rounded-2xl border border-slate-800">
            <p className="text-[11px] text-slate-400 uppercase font-semibold">Rango</p>
            <p className={`text-xs font-bold mt-2 truncate ${rank.color}`}>{rank.title}</p>
          </div>
        </div>

        {/* Insignias Obtenidas */}
        <div className="text-left bg-[#080d1a]/80 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-slate-300 uppercase">
              Insignias Desbloqueadas ({badges.filter((b) => b.unlocked).length}/{badges.length})
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {badges.map((b) => (
              <span
                key={b.id}
                className={`text-xs font-mono px-3 py-1.5 rounded-xl border flex items-center gap-1.5 ${
                  b.unlocked
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-800/40 border-slate-700/50 text-slate-500 line-through opacity-60'
                }`}
              >
                <span>{b.icon}</span>
                <span>{b.title}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onRestart}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            Reiniciar Misión
          </button>

          <button
            onClick={() => setShowReview(!showReview)}
            className="w-full sm:w-auto px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-xl border border-slate-700 transition-colors cursor-pointer"
          >
            {showReview ? 'Ocultar Respuestas' : 'Revisar Preguntas'}
          </button>
        </div>

        {/* Desglose de Respuestas para Aprendizaje */}
        {showReview && (
          <div className="text-left space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold text-slate-200 font-mono">
              📋 Análisis de Incidentes Registrados:
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {answerHistory.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                    item.isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span>
                      {item.isCorrect ? '✅ Respuesta Correcta' : '❌ Respuesta Vulnerable'}
                    </span>
                    <span className="text-[10px] font-mono opacity-75">{item.question.protocol}</span>
                  </div>
                  <p className="font-semibold text-slate-100">{item.question.question}</p>
                  <p className="mt-1 text-slate-300">
                    <span className="font-medium text-slate-400">Tu elección: </span>
                    {item.question.options[item.selectedOption]}
                  </p>
                  {!item.isCorrect && (
                    <p className="mt-1 text-emerald-300">
                      <span className="font-medium text-slate-400">Respuesta segura: </span>
                      {item.question.options[item.question.correct]}
                    </p>
                  )}
                  <p className="mt-2 text-slate-400 italic text-[11px]">
                    💡 {item.question.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
