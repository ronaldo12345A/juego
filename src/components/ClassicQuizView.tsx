import React from 'react';
import { Question } from '../data/questions';

interface ClassicQuizViewProps {
  currentQuestion: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
  lives: number;
  infiniteLives: boolean;
  score: number;
  selectedOption: number | null;
  answered: boolean;
  onSelectOption: (index: number) => void;
  onNextQuestion: () => void;
  onShowHint: () => void;
  showHint: boolean;
  isShaking: boolean;
}

export const ClassicQuizView: React.FC<ClassicQuizViewProps> = ({
  currentQuestion,
  questionNumber,
  selectedTopic,
  onTopicChange,
  lives,
  infiniteLives,
  score,
  selectedOption,
  answered,
  onSelectOption,
  onNextQuestion,
  onShowHint,
  showHint,
  isShaking,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8">
      {/* Exact card layout matching user's Image 1, 2, 3 */}
      <div
        className={`w-full max-w-[620px] bg-[#1e2235]/95 border border-[#2d324d] rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-transform duration-300 ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        {/* Title Header with Lock Icon */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-2xl" role="img" aria-label="candado">
            🔒
          </span>
          <h1 className="text-2xl sm:text-[26px] font-extrabold text-[#10b981] tracking-wide">
            Quiz de Ciberseguridad
          </h1>
        </div>

        {/* Filtrar por Tema */}
        <div className="mb-5">
          <label
            htmlFor="classic-topic-select"
            className="block text-sm font-semibold text-slate-200 mb-1.5"
          >
            Filtrar por Tema:
          </label>
          <div className="relative">
            <select
              id="classic-topic-select"
              value={selectedTopic}
              onChange={(e) => onTopicChange(e.target.value)}
              className="w-full bg-[#151928] text-slate-100 text-sm border border-[#373e61] rounded-xl px-4 py-2.5 appearance-none focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-medium cursor-pointer"
            >
              <option value="all">Todos los temas</option>
              <option value="passwords">Contraseñas</option>
              <option value="ataques">Ataques Web</option>
              <option value="malware">Malware & Ransomware</option>
              <option value="redes">Seguridad en Redes</option>
              <option value="social">Ingeniería Social</option>
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Vidas y Puntos Bar */}
        <div className="bg-[#121624] border border-[#2b314d] rounded-xl px-4 py-3 flex items-center justify-between mb-6 shadow-inner font-sans">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <span>Vidas:</span>
            <div className="flex items-center gap-1 text-base tracking-widest">
              {infiniteLives ? (
                <span className="text-emerald-400 text-xs font-mono px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/30">
                  ∞ INFINITAS
                </span>
              ) : (
                [0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`transition-all duration-300 ${
                      i < lives
                        ? 'text-rose-500 filter drop-shadow-[0_0_6px_rgba(244,63,94,0.8)] scale-100'
                        : 'text-slate-600 grayscale opacity-40 scale-90'
                    }`}
                  >
                    {i < lives ? '❤️' : '🖤'}
                  </span>
                ))
              )}
            </div>
          </div>

          <div className="text-sm font-bold text-white flex items-center gap-1.5">
            <span>Puntos:</span>
            <span className="text-emerald-400 font-mono text-base font-extrabold">{score}</span>
          </div>
        </div>

        {/* Pregunta */}
        <div className="mb-5">
          <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
            {questionNumber}. {currentQuestion.question.replace(/^\d+\.\s*/, '')}
          </h2>
        </div>

        {/* Opciones */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQuestion.correct;

            let buttonStyle = 'bg-[#282d44] border-[#384061] text-slate-100 hover:bg-[#323956] hover:border-[#4b5580]';

            if (answered) {
              if (isCorrect) {
                buttonStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-100 glow-border-green';
              } else if (isSelected) {
                buttonStyle = 'bg-rose-950/60 border-rose-500 text-rose-100 glow-border-rose';
              } else {
                buttonStyle = 'bg-[#202538] border-[#2f354f] text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={answered}
                onClick={() => onSelectOption(idx)}
                className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center justify-between shadow-sm cursor-pointer disabled:cursor-default ${buttonStyle}`}
              >
                <span>{option}</span>
                {answered && (
                  <span className="text-base ml-2">
                    {isCorrect ? '✅' : isSelected ? '❌' : ''}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback educativo tras responder */}
        {answered && (
          <div
            className={`p-4 rounded-xl border mb-5 transition-all text-xs sm:text-sm ${
              selectedOption === currentQuestion.correct
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <span className="text-xl">
                {selectedOption === currentQuestion.correct ? '🛡️' : '⚠️'}
              </span>
              <div>
                <p className="font-bold text-sm">
                  {selectedOption === currentQuestion.correct
                    ? '¡Correcto! Respuesta segura'
                    : '¡Cuidado! Vulnerabilidad identificada'}
                </p>
                <p className="mt-1 text-slate-300 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
                <div className="mt-2 text-[11px] font-mono text-emerald-400/90">
                  Protocolo: {currentQuestion.protocol}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pista táctica oculta/mostrada */}
        {showHint && (
          <div className="p-3 bg-cyan-950/50 border border-cyan-800/60 rounded-xl text-xs text-cyan-200 mb-5 font-mono">
            💡 <span className="font-bold">Pista:</span> {currentQuestion.hint}
          </div>
        )}

        {/* Footer controls: Pista and Siguiente */}
        <div className="flex items-center justify-between pt-2">
          {!answered ? (
            <button
              onClick={onShowHint}
              className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 py-1.5 px-2 rounded-lg hover:bg-cyan-500/10 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{showHint ? 'Ocultar Pista' : 'Ver Pista Táctica'}</span>
            </button>
          ) : (
            <div />
          )}

          {answered && (
            <button
              onClick={onNextQuestion}
              className="ml-auto px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/25 transition-all transform active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Siguiente Pregunta</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
